import { Component, Vue } from 'vue-property-decorator'

@Component({
  metaInfo () {
    return {
      title: 'Sources | FINA'
    }
  }
})
export default class SourcesPage extends Vue {}
