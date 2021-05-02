import Grapher from '@/components/grapher/grapher.vue'
import { Coordinate } from '@/types'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    'grapher': Grapher
  }
})
export default class Home extends Vue {
  private points: Array<Coordinate> = [
    {
      x: 2,
      y: 4
    },
    {
      x: 10,
      y: 3
    }
  ]
}
