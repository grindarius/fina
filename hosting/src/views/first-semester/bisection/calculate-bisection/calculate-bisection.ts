import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { BisectionQuerystring, BisectionResponse, expressionToTex } from '@fina/common'

import { calculateBisection } from '@/api'
import GrapherComponent from '@/components/grapher/grapher.vue'
import { bisectionTableKeys } from '@/constants'
import { Coordinate, TableKey } from '@/types'

@Component({
  beforeRouteEnter (from, _, next) {
    if (Object.keys(from.query).length === 0) {
      next({
        path: 'missing-querystring'
      })
    } else {
      next()
    }
  },
  metaInfo () {
    return {
      title: 'Calculate Bisection | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class CalculateBisectionPage extends Vue {
  answer: BisectionResponse = []
  points: Array<Coordinate> = []
  errorMessage = ''
  isFetching = true

  async mounted (): Promise<void> {
    this.answer = await this.getAnswer()
  }

  get tableKeys (): Array<TableKey> {
    return bisectionTableKeys
  }

  get parsedExpression (): string {
    return expressionToTex(this.routeQueries.expression)
  }

  getPoints (answer: BisectionResponse): Array<Coordinate> {
    return answer.map(iteration => {
      const coordinate: Coordinate = {
        x: iteration.c,
        y: iteration.fc
      }

      return coordinate
    })
  }

  get routeQueries (): BisectionQuerystring {
    return {
      expression: this.$route.query.expression.toString(),
      start: Number(this.$route.query.start),
      end: Number(this.$route.query.end),
      iteration: Number(this.$route.query.iteration),
      dp: Number(this.$route.query.dp)
    }
  }

  async getAnswer (): Promise<BisectionResponse> {
    const { method, url, headers } = calculateBisection

    try {
      const response = await axios.request<BisectionResponse>({
        method, url, headers, params: this.routeQueries
      })

      this.points = this.getPoints(response.data)

      this.isFetching = false
      return response.data
    } catch (error) {
      this.errorMessage = JSON.stringify(error.response.data)
      return []
    }
  }
}
