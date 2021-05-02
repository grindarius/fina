import { Vue, Component, Prop } from 'vue-property-decorator'
import * as d3 from 'd3'
import { Coordinate } from '@/types'
import * as helper from '@/services'

const margins = { top: 40, right: 40, bottom: 40, left: 40 }
const width = 700 - margins.left - margins.right
const height = 700 - margins.top - margins.bottom

@Component
export default class IndexGraph extends Vue {
  @Prop({ default: 'x^2' })
  private expression: string

  @Prop({ default: [] })
  private points: Array<Coordinate>

  private data: Array<Coordinate> = []
  private timeFactor = 100

  private svg: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  private line: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  private x: d3.ScaleLinear<number, number, never>
  private y: d3.ScaleLinear<number, number, never>
  private xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
  private yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>

  private mounted () {
    this.data = this.calculateData(-5, 5)
    this.generateChart()
  }

  private generateChart () {
    this.svg = d3.select('#graph')
      .append('svg')
      .attr('width', width + margins.left + margins.right)
      .attr('height', height + margins.top + margins.bottom)
      .append('g')
      .attr('transform', `translate(${margins.left}, ${margins.top})`)

    this.x = d3.scaleLinear([-5, 5], [0, width])
    this.y = d3.scaleLinear([-5, 5], [height, 0])

    this.xAxis = this.svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'x-axis')

    this.yAxis = this.svg.append('g')
      .attr('class', 'y-axis')

    this.xAxis.call(d3.axisBottom(this.x))
    this.yAxis.call(d3.axisLeft(this.y))

    this.svg.append('defs').append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', 0)
      .attr('y', 0)

    this.line = this.svg.append('g')
      .attr('clip-path', 'url(#clip)')

    this.line.append('path')
      .datum(this.data)
      .classed('data-line', true)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<Coordinate>()
        .x(d => this.x(d.x))
        .y(d => this.y(d.y))
      )

    const zoom = d3.zoom<SVGRectElement, unknown>()
      .scaleExtent([1, 100])
      .extent([[0, 0], [width, height]])
      .on('zoom', this.zoomed)
      .on('end', this.zoomEnded)

    this.svg.append('rect')
      .classed('pointer-receiver', true)
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom)
  }

  private zoomed (event: any) {
    const newX = event.transform.rescaleX(this.x)
    const newY = event.transform.rescaleY(this.y)

    this.xAxis.call(d3.axisBottom(newX))
    this.yAxis.call(d3.axisLeft(newY))

    const redrawLine: d3.Selection<d3.BaseType, Array<Coordinate>, SVGGElement, unknown> = this.line.selectAll('.data-line')
    redrawLine.attr('d', d3.line<Coordinate>()
      .x(d => newX(d.x))
      .y(d => newY(d.y))
    )
  }

  private zoomEnded (event: any) {
    d3.select('.data-line').remove()
    const newX = event.transform.rescaleX(this.x)
    const newY = event.transform.rescaleY(this.y)

    const [start, end] = newX.domain()

    this.data = this.calculateData(start, end)

    this.line.append('path')
      .datum(this.data)
      .classed('data-line', true)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line<Coordinate>()
        .x(d => newX(d.x))
        .y(d => newY(d.y))
      )
  }

  private calculateData (left: number, right: number) {
    if (left > right) throw new Error('Error: left is greater than right')

    const delta = right - left

    if (delta >= 10) this.timeFactor = 100
    else if (5 <= delta && delta < 10) this.timeFactor = 500
    else if (1 <= delta && delta < 5) this.timeFactor = 1000
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
