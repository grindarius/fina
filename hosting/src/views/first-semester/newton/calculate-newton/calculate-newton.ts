import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { expressionToTex, NewtonQuerystring, NewtonResponse } from '@fina/common'

import { calculateNewton } from '@/api'
import GrapherComponent from '@/components/grapher/grapher.vue'
import { newtonTableKeys } from '@/constants'
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
      title: 'Calculate Newton | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class CalculateNewtonPage extends Vue {
  answer: NewtonResponse = []
  points: Array<Coordinate> = []
  errorMessage = ''
  isFetching = true

  async mounted (): Promise<void> {
    this.answer = await this.getAnswer()
  }

  get tableKeys (): Array<TableKey> {
    return newtonTableKeys
  }

  get parsedExpression (): string {
    return expressionToTex(this.routeQueries.expression)
  }

  getPoints (answer: NewtonResponse): Array<Coordinate> {
    return answer.map(iteration => {
      return {
        x: iteration.c,
        y: iteration.fc
      }
    })
  }

  get routeQueries (): NewtonQuerystring {
    return {
      expression: this.$route.query.expression.toString(),
      diffedExpression: this.$route.query.diffedExpression === '' ? undefined : this.$route.query.diffedExpression.toString(),
      respect: this.$route.query.respect.toString(),
      start: Number(this.$route.query.start),
      iteration: Number(this.$route.query.iteration),
      dp: Number(this.$route.query.dp)
    }
  }

  async getAnswer (): Promise<NewtonResponse> {
    const { method, url, headers } = calculateNewton

    try {
      const response = await axios.request<NewtonResponse>({
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
