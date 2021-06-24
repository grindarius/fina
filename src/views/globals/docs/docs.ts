import { Component, Vue } from 'vue-property-decorator'
import FooterComponent from '@/components/footer/footer.vue'

interface DocsSidebarLink {
  name: string
  link: string
}

interface DocsSidebarPage {
  name: string
  link: string
  components: Array<DocsSidebarLink>
}

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class DocsLandingPage extends Vue {
  listItemsWithRoute: Array<DocsSidebarPage> = [
    {
      name: 'Getting Started',
      link: '/docs',
      components: [
        {
          name: 'What is FINA',
          link: '/docs#what-is-fina'
        },
        {
          name: 'Features',
          link: '/docs#features'
        }
      ]
    },
    {
      name: 'Significant Digits',
      link: '/docs/significant-digits',
      components: [
        {
          name: 'Description',
          link: '/docs/significant-digits#description'
        },
        {
          name: 'Rules',
          link: '/docs/significant-digits#rules'
        },
        {
          name: 'Examples',
          link: '/docs/significant-digits#examples'
        }
      ]
    },
    {
      name: 'Decimal Points',
      link: '/docs/decimal-points',
      components: []
    },
    {
      name: 'Bisection',
      link: '/docs/bisection',
      components: [
        {
          name: 'Description',
          link: '/docs/bisection#description'
        },
        {
          name: 'Input Constraints',
          link: '/docs/bisection#constraints'
        },
        {
          name: 'Steps to Reproduce',
          link: '/docs/bisection#steps'
        },
        {
          name: 'Examples',
          link: '/docs/bisection#examples'
        }
      ]
    }
  ]

  get mainKeys (): Array<DocsSidebarLink> {
    return this.listItemsWithRoute.map(item => { return { name: item.name, link: item.link } })
  }

  getNestedKeys (index: number): Array<DocsSidebarLink> {
    return this.listItemsWithRoute[index].components
  }
}
