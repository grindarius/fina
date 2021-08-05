import { Component, Ref, Vue } from 'vue-property-decorator'

import FooterComponent from '@/components/footer/footer.vue'
import { firstSemesterPages } from '@/constants'
import { getFirstLevelPage } from '@/services'
import { Page, PageComponent } from '@/types'

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class DocsLandingPage extends Vue {
  @Ref('documentation-sidebar') docsSidebar!: HTMLDivElement

  get allSidebarItems (): Array<Page> {
    return [...firstSemesterPages]
  }

  get mainKeys (): Array<PageComponent> {
    return getFirstLevelPage(this.allSidebarItems)
  }

  getNestedKeys (index: number): Array<PageComponent> {
    return this.allSidebarItems[index].components
  }

  getHash (link: string): string {
    const match = link.match(/#(.+)$/) ?? []
    return match[0]
  }

  scrollToTopPage (): void {
    this.docsSidebar.scrollTo(0, 0)
    window.scrollTo(0, 0)
  }
}
