import Grapher from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    grapher: Grapher
  }
})
export default class Home extends Vue {
  private readonly expression = 'x^3 - x - 1'
  private readonly points: Array<Coordinate> = [
    {
      x: 1.5,
      y: 0.875
    },
    {
      x: 1.25,
      y: -0.29688
    },
    {
      x: 1.375,
      y: 0.22461
    },
    {
      x: 1.3125,
      y: -0.05151
    },
    {
      x: 1.34375,
      y: 0.08261
    },
    {
      x: 1.32812,
      y: 0.01458
    },
    {
      x: 1.32031,
      y: -0.01871
    },
    {
      x: 1.32422,
      y: -0.00621
    }
  ]
}
