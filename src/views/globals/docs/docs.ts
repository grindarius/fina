import { Component, Vue } from 'vue-property-decorator'

import FooterComponent from '@/components/footer/footer.vue'
import { firstSemesterPages, miscellaneousPages, secondSemesterPages } from '@/constants'
import { getFirstLevelPage } from '@/services'
import { Page, PageComponent } from '@/types'

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class DocsLandingPage extends Vue {
  get allSidebarItems (): Array<Page> {
    return [...firstSemesterPages, ...secondSemesterPages, ...miscellaneousPages]
  }

  get mainKeys (): Array<PageComponent> {
    return getFirstLevelPage(this.allSidebarItems)
  }

  getNestedKeys (index: number): Array<PageComponent> {
    return this.allSidebarItems[index].components
  }
}
