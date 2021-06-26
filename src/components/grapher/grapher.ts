import { Vue, Component, Prop } from 'vue-property-decorator'
import * as d3 from 'd3'
import { Coordinate } from '@/types'
import * as helper from '@/services'

const margins = { top: 40, right: 40, bottom: 40, left: 40 }

@Component
export default class Grapher extends Vue {
  /**
   * An expression for the graph to draw Default is `x squared`.
   */
  @Prop({ default: 'x^2' })
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
  width: number

  /**
   * Height of the graph, should use same as the width so the graph comes in 1:1 ratio.
   */
  @Prop({ default: 700 })
  height: number

  data: Array<Coordinate> = []
  timeFactor = 100

  svg: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  line: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  dots: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  x: d3.ScaleLinear<number, number, never>
  y: d3.ScaleLinear<number, number, never>
  xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>

  mounted (): void {
    this.width = this.width - margins.left - margins.right
    this.height = this.height - margins.top - margins.bottom
    this.data = this.calculateData(-5, 5)
    this.generateChart()
  }

  /**
   * A function that generates the chart for the first time.
   */
  generateChart (): void {
    this.svg = d3.select('#graph')
      .append('svg')
      .attr('width', this.width + margins.left + margins.right)
      .attr('height', this.height + margins.top + margins.bottom)
      .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`)

    this.x = d3.scaleLinear([-5, 5], [0, this.width])
    this.y = d3.scaleLinear([-5, 5], [this.height, 0])

    this.xAxis = this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .attr('class', 'x-axis')

    this.yAxis = this.svg.append('g')
      .attr('class', 'y-axis')

    this.xAxis.call(d3.axisBottom(this.x))
    this.yAxis.call(d3.axisLeft(this.y))

    this.svg.append('defs').append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('x', 0)
      .attr('y', 0)

    this.line = this.svg.append('g')
      .attr('clip-path', 'url(#clip)')

    this.drawLine(this.x, this.y)
    this.drawZeroLine()

    if (this.start != null && this.end != null) {
      this.drawStartEndLine(this.x, this.y)
    }

    if (this.points !== []) {
      this.dots = this.svg.append('g')
        .attr('clip-path', 'url(#clip)')

      this.drawDots()
    }

    const zoom = d3.zoom<SVGRectElement, unknown>()
      .scaleExtent([1, 200])
      .extent([[0, 0], [this.width, this.height]])
      .on('zoom', this.zoomed)
      .on('end', this.zoomEnded)

    this.svg.append('rect')
      .classed('pointer-receiver', true)
      .attr('width', this.width)
      .attr('height', this.height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom)
  }

  /**
   * A function that draws start and end line to cap the range of the method used.
   *
   * @param xScale an x scale
   * @param yScale a y scale
   */
  drawStartEndLine (xScale: d3.ScaleLinear<number, number, never>, yScale: d3.ScaleLinear<number, number, never>): void {
    this.line.append('line')
      .classed('start-range-line', true)
      .attr('x1', xScale(this.start ?? 0))
      .attr('x2', xScale(this.start ?? 0))
      .attr('y1', yScale(yScale.domain()[1]))
      .attr('y2', yScale(yScale.domain()[0]))
      .style('stroke', '#ff3860')
      .style('shape-rendering', 'crispEdges')
      .style('stroke-opacity', 0.5)

    this.line.append('line')
      .classed('end-range-line', true)
      .attr('x1', xScale(this.end ?? 0))
      .attr('x2', xScale(this.end ?? 0))
      .attr('y1', yScale(yScale.domain()[1]))
      .attr('y2', yScale(yScale.domain()[0]))
      .style('stroke', '#ff3860')
      .style('shape-rendering', 'crispEdges')
      .style('stroke-opacity', 0.5)
  }

  /**
   * A function that draw points (dots) for each iteration of the method.
   */
  drawDots (): void {
    this.dots
      .selectAll()
      .data(this.points)
      .enter()
      .append('circle')
      .classed('point', true)
      .attr('cx', (d) => this.x(d.x))
      .attr('cy', (d) => this.y(d.y))
      .attr('r', 3)
      .style('fill', '#240743')
  }

  /**
   * A function that draws line at `x = 0` and `y = 0`
   */
  drawZeroLine (): void {
    d3.selectAll('g.x-axis g.tick')
      .filter(d => d === 0)
      .append('line')
      .classed('gridline', true)
      .attr('stroke', '#0A0A0A')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -this.height)
      .attr('y2', 0)
      .style('shape-rendering', 'crispEdges')
      .style('stroke-opacity', 0.5)

    d3.selectAll('g.y-axis g.tick')
      .filter(d => d === 0)
      .append('line')
      .classed('gridline', true)
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
    this.line
      .append('path')
      .datum(this.data)
      .classed('data-line', true)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<Coordinate>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
      )
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  zoomed (event: any): void {
    d3.selectAll('.gridline').remove()
    d3.select('.start-range-line').remove()
    d3.select('.end-range-line').remove()

    const newX = event.transform.rescaleX(this.x)
    const newY = event.transform.rescaleY(this.y)

    this.xAxis.call(d3.axisBottom(newX))
    this.yAxis.call(d3.axisLeft(newY))

    if (this.start != null && this.end != null) {
      this.drawStartEndLine(newX, newY)
    }
    this.drawZeroLine()

    const redrawline: d3.Selection<d3.BaseType, Array<Coordinate>, SVGGElement, unknown> = this.line.selectAll('.data-line')
    redrawline.attr('d', d3.line<Coordinate>()
      .x(d => newX(d.x))
      .y(d => newY(d.y))
    )

    if (this.points.length !== 0) {
      const redrawDots: d3.Selection<d3.BaseType, Array<Coordinate>, SVGGElement, unknown> = this.dots.selectAll('.point')
      redrawDots.data(this.points)
        .attr('cx', (d) => newX(d.x))
        .attr('cy', (d) => newY(d.y))
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  zoomEnded (event: any): void {
    d3.select('.data-line').remove()

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
    else if (delta < 1) this.timeFactor = 10000

    const multipliedLeft = helper.round(left, 5) * this.timeFactor
    const multipliedRight = helper.round(right, 5) * this.timeFactor

    const dummyArray = Array.from<number, number>({ length: (multipliedRight - multipliedLeft + 1) }, (_, i) => multipliedLeft + i)

    return dummyArray.map((element) => {
      const x = element / this.timeFactor

      const coordinate: Coordinate = {
        x: x,
        y: helper.evaluateFunction(this.expression, x)
      }

      return coordinate
    })
  }
}
