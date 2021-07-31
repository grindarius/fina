import * as d3 from 'd3'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

import { evaluateFunction, round } from '@fina/common'

import { Coordinate } from '@/types'

const margins = { top: 40, right: 40, bottom: 40, left: 40 }

/**
 * A component to generate a d3 graph.
 * Criteria:
 * - Generates a line graph with points for you to put in as an array of coordinate.
 * - Currently support only contiuous graph.
 * - For any points that are `null`, `undefined`, `NaN`, `Infinity` or `-Infinity`, will not be rendered.
 * The point will just disappear.
 * - For the line, if there is those values inside, those values will be changed to 0.
 * (I am working on a system to chop the values to support multiple graph types.)
 * - This component uses `math.evaluate()` to calculate its expression.
 * (looking forward to switch to `math.parse().evaluate()`)
 */
@Component
export default class Grapher extends Vue {
  /**
   * An ID for a div to render. MUST BE PROVIDED OR ELSE WILL RESULT IN RENDER FAILURE.
   */
  @Prop({ default: 'graph' })
  id: string

  /**
   * An expression for the graph to draw Default is `x squared`.
   */
  @Prop({ default: 'x' })
  expression: string

  /**
   * Array of points to plot into the graph. Default is empty array.
   */
  @Prop({ default: () => [] })
  points: Array<Coordinate>

  /**
   * Start range number. This will draw a straight line to cap as the range
   * of the data used. won't draw anything if not specified.
   */
  @Prop()
  start: number | undefined

  /**
   * Start range number. This will draw a straight line to cap as the range
   * of the data used. won't draw anything if not specified.
   */
  @Prop()
  end: number | undefined

  /**
   * Width of the graph, no height prop because the system uses the same for height.
   */
  @Prop({ default: 700 })
  propWidth: number

  /**
   * Height of the graph, should use same as the width so the graph comes in 1:1 ratio.
   */
  @Prop({ default: 700 })
  propHeight: number

  data: Array<Coordinate> = []
  timeFactor = 100

  width: number = 0
  height: number = 0

  @Ref('container') readonly container!: HTMLDivElement
  @Ref('tooltip-ref') readonly tooltip!: HTMLDivElement

  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>
  g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  line: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  dots: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  x: d3.ScaleLinear<number, number, never>
  y: d3.ScaleLinear<number, number, never>
  xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  legend: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>

  mounted (): void {
    this.width = this.propWidth - margins.left - margins.right
    this.height = this.propHeight - margins.top - margins.bottom
    this.data = this.calculateData(-5, 5)
    this.generateChart()
  }

  /**
   * A function that generates the chart for the first time.
   */
  generateChart (): void {
    this.svg = d3.select(`#${this.id}`)
      .append('svg')
      .attr('width', this.width + margins.left + margins.right)
      .attr('height', this.height + margins.top + margins.bottom)

    this.g = this.svg
      .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`)

    this.x = d3.scaleLinear([-5, 5], [0, this.width])
    this.y = d3.scaleLinear([-5, 5], [this.height, 0])

    this.xAxis = this.g.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', `x-axis-${this.id}`)

    this.yAxis = this.g.append('g')
      .attr('class', `y-axis-${this.id}`)

    this.xAxis.call(d3.axisBottom(this.x))
    this.yAxis.call(d3.axisLeft(this.y))

    this.g.append('defs').append('svg:clipPath')
      .attr('id', `clip-${this.id}`)
      .append('svg:rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('x', 0)
      .attr('y', 0)

    this.line = this.g.append('g')
      .classed(`${this.id}-line-clip-path`, true)
      .attr('clip-path', `url(#clip-${this.id})`)

    this.drawLine(this.x, this.y)
    this.drawZeroLine()

    this.drawStartEndLine(this.x, this.y)

    const zoom = d3.zoom<SVGRectElement, unknown>()
      .scaleExtent([1, 10_000])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', this.zoomed)
      .on('end', this.zoomEnded)

    this.g.append('rect')
      .classed(`pointer-receiver-${this.id}`, true)
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom)

    this.dots = this.g.append('g')
      .classed(`${this.id}-points-clip-path`, true)
      .attr('clip-path', `url(#clip-${this.id})`)

    this.drawDots()

    this.legend = this.g
      .append('svg')
      .classed(`${this.id}-legend`, true)
      .attr('width', '100%')
      .attr('height', 80)
      .attr('x', 0.8 * this.width)
      .attr('y', 0.05 * this.height)
      .style('visibility', 'hidden')
      .style('fill', 'white')
  }

  /**
   * A function that draws start and end line to cap the range of the method used.
   *
   * @param xScale an x scale
   * @param yScale a y scale
   */
  drawStartEndLine (xScale: d3.ScaleLinear<number, number, never>, yScale: d3.ScaleLinear<number, number, never>): void {
    if (this.start != null) {
      this.line.append('line')
        .classed(`start-range-line-${this.id}`, true)
        .attr('x1', xScale(this.isNumberReal(this.start)))
        .attr('x2', xScale(this.isNumberReal(this.start)))
        .attr('y1', yScale(yScale.domain()[1]))
        .attr('y2', yScale(yScale.domain()[0]))
        .style('stroke', '#ff3860')
        .style('shape-rendering', 'crispEdges')
        .style('stroke-opacity', 0.5)
    }

    if (this.end != null) {
      this.line.append('line')
        .classed(`end-range-line-${this.id}`, true)
        .attr('x1', xScale(this.isNumberReal(this.end)))
        .attr('x2', xScale(this.isNumberReal(this.end)))
        .attr('y1', yScale(yScale.domain()[1]))
        .attr('y2', yScale(yScale.domain()[0]))
        .style('stroke', '#ff3860')
        .style('shape-rendering', 'crispEdges')
        .style('stroke-opacity', 0.5)
    }
  }

  /**
   * A function that draw points (dots) for each iteration of the method.
   */
  drawDots (): void {
    this.dots.selectAll(`point-${this.id}`)
      .data(this.points)
      .join('circle')
      .classed(`point-${this.id}`, true)
      .attr('cx', (d) => this.x(this.isNumberReal(d.x)))
      .attr('cy', (d) => this.y(this.isNumberReal(d.y)))
      .attr('r', 3)
      .style('fill', '#240743')
      .on('mouseover', (event) => {
        d3.select(event.currentTarget)
          .style('stroke', 'red')
          .style('stroke-opacity', 1)

        this.legend.style('visibility', 'visible')
      })
      .on('mousemove', (_, d) => {
        this.legend.html(`
          <g>
            <text x="10" y="20" fill="black">X: ${d.x} </text>
            <text x="10" y="40" fill="black">Y: ${d.y} </text>
          </g>
        `)
      })
      .on('mouseleave', (event) => {
        d3.select(event.currentTarget)
          .style('stroke', 'none')

        this.legend.style('visibility', 'hidden')
      })
  }

  /**
   * A function that draws line at `x = 0` and `y = 0`
   */
  drawZeroLine (): void {
    d3.selectAll(`g.x-axis-${this.id} g.tick`)
      .filter(d => d === 0)
      .append('line')
      .classed(`gridline-${this.id}`, true)
      .attr('stroke', '#0A0A0A')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -this.height)
      .attr('y2', 0)
      .style('shape-rendering', 'crispEdges')
      .style('stroke-opacity', 0.5)

    d3.selectAll(`g.y-axis-${this.id} g.tick`)
      .filter(d => d === 0)
      .append('line')
      .classed(`gridline-${this.id}`, true)
      .attr('stroke', '#0A0A0A')
      .attr('x1', 0)
      .attr('x2', this.width)
      .attr('y1', 0)
      .attr('y2', 0)
      .style('shape-rendering', 'crispEdges')
      .style('stroke-opacity', 0.5)
  }

  /**
   * A function that draws the data line (the line that represents the function).
   *
   * @param xScale an x scale
   * @param yScale a y scale
   */
  drawLine (xScale: d3.ScaleLinear<number, number, never>, yScale: d3.ScaleLinear<number, number, never>): void {
    this.line.selectAll(`path.data-line-${this.id}`)
      .data([this.data])
      .join('path')
      .classed(`data-line-${this.id}`, true)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<Coordinate>()
        .x(d => xScale(this.isNumberReal(d.x)))
        .y(d => yScale(this.isNumberReal(d.y)))
      )
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  zoomed (event: any): void {
    d3.select(`line.start-range-line-${this.id}`).remove()
    d3.select(`line.end-range-line-${this.id}`).remove()

    const newX = event.transform.rescaleX(this.x)
    const newY = event.transform.rescaleY(this.y)

    this.xAxis.call(d3.axisBottom(newX))
    this.yAxis.call(d3.axisLeft(newY))

    this.drawStartEndLine(newX, newY)
    this.drawZeroLine()

    const redrawline: d3.Selection<d3.BaseType, Array<Coordinate>, SVGGElement, unknown> = this.line.selectAll(`path.data-line-${this.id}`)
    redrawline.attr('d', d3.line<Coordinate>()
      .x(d => newX((this.isNumberReal(d.x))))
      .y(d => newY((this.isNumberReal(d.y))))
    )

    const redrawDots: d3.Selection<d3.BaseType, Array<Coordinate>, SVGGElement, unknown> = this.dots.selectAll(`circle.point-${this.id}`)
    redrawDots.data(this.points)
      .attr('cx', (d) => newX(this.isNumberReal(d.x)))
      .attr('cy', (d) => newY(this.isNumberReal(d.y)))
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  zoomEnded (event: any): void {
    d3.select(`.data-line-${this.id}`).remove()

    const newX = event.transform.rescaleX(this.x)
    const newY = event.transform.rescaleY(this.y)

    const [start, end] = newX.domain()

    this.data = this.calculateData(start, end)

    this.drawLine(newX, newY)
  }

  /**
   * A function to generate data between 2 ranges. the function will automatically
   * adjust the thickness of the data to the zoom range.
   *
   * @param left left range
   * @param right right range
   * @returns An array of coordinates made from those 2 ranges
   */
  calculateData (left: number, right: number): Array<Coordinate> {
    if (left > right) throw new Error('Error: left is greater than right')

    const delta = right - left

    if (delta >= 10) this.timeFactor = 100
    else if (delta >= 5 && delta < 10) this.timeFactor = 500
    else if (delta >= 1 && delta < 5) this.timeFactor = 1000
    else if (delta >= 0.5 && delta < 1) this.timeFactor = 5000
    else if (delta >= 0.075 && delta < 0.5) this.timeFactor = 10_000
    else if (delta >= 0.025 && delta < 0.075) this.timeFactor = 50_000
    else if (delta >= 0.01 && delta < 0.025) this.timeFactor = 100_000
    else if (delta >= 0.002 && delta < 0.01) this.timeFactor = 500_000
    else if (delta < 0.002) this.timeFactor = 1_000_000

    const multipliedLeft = round(left, 5) * this.timeFactor
    const multipliedRight = round(right, 5) * this.timeFactor

    const dummyArray = Array.from<number, number>({ length: (multipliedRight - multipliedLeft + 1) }, (_, i) => multipliedLeft + i)

    return dummyArray.map((element) => {
      const x = element / this.timeFactor

      const coordinate: Coordinate = {
        x: x,
        y: evaluateFunction(this.expression, { x })
      }

      return coordinate
    })
  }

  /**
   * A function to evaluate the value, this funciton will only let true number pass.
   * If the number is either `null`, `undefined`, `NaN`, `Infinity` or `-Infinity`, will return 0
   *
   * @param input a value that you want to test for faultiness.
   * @returns 0 if the `input` is either `null`, `undefined`, `NaN`, `Infinity` or `-Infinity`.
   * Otherwise return 0
   */
  isNumberReal (input: number): number {
    if (input != null && isFinite(input)) {
      return input
    } else {
      return 0
    }
  }
}
