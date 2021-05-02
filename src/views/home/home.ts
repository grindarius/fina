import Grapher from '@/components/grapher/grapher.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    'grapher': Grapher
  }
})
export default class Home extends Vue {}
