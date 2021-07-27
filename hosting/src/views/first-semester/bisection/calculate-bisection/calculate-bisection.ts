import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { BisectionQuerystring, BisectionResponse } from '@fina/common'

import { calculateBisection } from '@/api'
import GrapherComponent from '@/components/grapher/grapher.vue'
import { bisectionTableKeys } from '@/constants/tableKeys'
import { Coordinate, TableKey } from '@/types'

@Component({
  beforeRouteEnter (from, _, next) {
    console.log(from.query)
    if (Object.keys(from.query).length === 0) {
      next({
        path: '/docs/missing-querystring'
      })
    } else {
      next()
    }
  },
  components: {
    grapher: GrapherComponent
  },
  metaInfo () {
    return {
      title: 'Calculate Bisection | FINA'
    }
  }
})
export default class CalculateBisectionPage extends Vue {
  answer: BisectionResponse = []
  points: Array<Coordinate> = []
  isFetching = true

  async mounted (): Promise<void> {
    this.answer = await this.getAnswer()
  }

  get tableKeys (): Array<TableKey> {
    return bisectionTableKeys
  }

  getRouteQueries (): BisectionQuerystring {
    return {
      expression: this.$route.query.expression.toString(),
      start: Number(this.$route.query.start),
      end: Number(this.$route.query.end),
      iteration: Number(this.$route.query.iteration),
      dp: Number(this.$route.query.dp)
    }
  }

  mapResponseToPoints (resp: BisectionResponse): Array<Coordinate> {
    return resp.map(iteration => {
      const coordinate: Coordinate = {
        x: iteration.c,
        y: iteration.fc
      }

      return coordinate
    })
  }

  async getAnswer (): Promise<BisectionResponse> {
    const { method, url } = calculateBisection

    try {
      const response = await axios.request<BisectionResponse>({
        method, url, params: this.getRouteQueries()
      })

      this.points = this.mapResponseToPoints(response.data)

      this.isFetching = false
      return response.data
    } catch (error) {
      console.error(error)
      this.isFetching = false
      return []
    }
  }
}
