import IndexGraph from '@/components/index-graph/index-graph.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    'index-graph': IndexGraph
  }
})
export default class Home extends Vue {}
