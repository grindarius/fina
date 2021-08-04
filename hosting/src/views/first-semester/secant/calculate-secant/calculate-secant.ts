import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

import { expressionToTex, SecantQuerystring, SecantResponse } from '@fina/common'

import { calculateSecant } from '@/api'
import GrapherComponent from '@/components/grapher/grapher.vue'
import { secantTableKeys } from '@/constants'
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
      title: 'Calculate Secant | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class CalculateSecantPage extends Vue {
  answer: SecantResponse = []
  points: Array<Coordinate> = []
  errorMessage = ''
  isFetching = true

  async mounted (): Promise<void> {
    this.answer = await this.getAnswer()
  }

  get tableKeys (): Array<TableKey> {
    return secantTableKeys
  }

  get parsedExpression (): string {
    return expressionToTex(this.getRouteQueries().expression)
  }

  getPoints (answer: SecantResponse): Array<Coordinate> {
    return answer.map(iteration => {
      const coordinate: Coordinate = {
        x: iteration.c,
        y: iteration.fc
      }

      return coordinate
    })
  }

  getRouteQueries (): SecantQuerystring {
    return {
      expression: this.$route.query.expression.toString(),
      start: Number(this.$route.query.start),
      end: Number(this.$route.query.end),
      iteration: Number(this.$route.query.iteration),
      dp: Number(this.$route.query.dp)
    }
  }

  async getAnswer (): Promise<SecantResponse> {
    const { method, url, headers } = calculateSecant

    try {
      const response = await axios.request<SecantResponse>({
        method, url, headers, params: this.getRouteQueries()
      })

      this.points = this.getPoints(response.data)

      this.isFetching = false
      return response.data
    } catch (error) {
      this.errorMessage = (error.response.data.error as string) + ': ' + (error.response.data.message as string)
      return []
    }
  }
}
