import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { expressionToTex, FixedPointIterationQuerystring, FixedPointIterationResponse } from '@fina/common'

import { calculateFixedPointIteration } from '@/api'
import GrapherComponent from '@/components/grapher/grapher.vue'
import { fixedPointIterationTableKeys } from '@/constants'
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
      title: 'Calculate Fixed Point Iteration | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class CalculateFixedPointIterationPage extends Vue {
  answer: FixedPointIterationResponse = []
  points: Array<Coordinate> = []
  errorMessage = ''
  isFetching = true

  async mounted (): Promise<void> {
    this.answer = await this.getAnswer()
  }

  get tableKeys (): Array<TableKey> {
    return fixedPointIterationTableKeys
  }

  get parsedExpression (): string {
    return expressionToTex(this.routeQueries.expression)
  }

  getPoints (answer: FixedPointIterationResponse): Array<Coordinate> {
    return answer.map(answer => {
      const coordinate: Coordinate = {
        x: answer.c,
        y: answer.fc
      }

      return coordinate
    })
  }

  get routeQueries (): FixedPointIterationQuerystring {
    return {
      expression: this.$route.query.expression.toString(),
      fixedExpression: this.$route.query.fixedExpression.toString(),
      respect: this.$route.query.respect.toString(),
      start: Number(this.$route.query.start),
      checkConvergence: this.$route.query.checkConvergence.toString(),
      iteration: Number(this.$route.query.iteration),
      dp: Number(this.$route.query.dp)
    }
  }

  async getAnswer (): Promise<FixedPointIterationResponse> {
    const { method, url, headers } = calculateFixedPointIteration

    try {
      const response = await axios.request<FixedPointIterationResponse>({
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
