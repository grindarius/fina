import { Component, Vue } from 'vue-property-decorator'

import GrapherComponent from '@/components/grapher/grapher.vue'

@Component({
  metaInfo () {
    return {
      title: 'Bisection | FINA'
    }
  },
  components: {
    grapher: GrapherComponent
  }
})
export default class BisectionPage extends Vue {}
