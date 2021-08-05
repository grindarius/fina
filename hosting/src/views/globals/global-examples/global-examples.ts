import { Component, Vue } from 'vue-property-decorator'

@Component({
  metaInfo () {
    return {
      title: 'Examples | FINA'
    }
  }
})
export default class GlobalExamplesPage extends Vue {}
