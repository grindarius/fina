import { Component, Vue } from 'vue-property-decorator'

interface DocsSidebarNestedLink {
  name: string
  link: string
}

interface DocsSidebarData {
  name: string
  link: string
  components: Array<DocsSidebarNestedLink>
}

@Component
export default class DocsLandingPage extends Vue {
  listItemsWithRoute: Array<DocsSidebarData> = [
    {
      name: 'Significant Digits',
      link: '/docs/significant-digits',
      components: [
        {
          name: 'Significant Digits',
          link: '/docs/significant-digits#significant-digits'
        },
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
      components: [
        {
          name: 'Decimal Points',
          link: '/docs/decimal-points#decimal-points'
        }
      ]
    },
    {
      name: 'Bisection',
      link: '/docs/bisection',
      components: [
        {
          name: 'Bisection',
          link: '/docs/bisection#bisection'
        },
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

  listItems: Record<string, Array<string>> = {
    'Significant Digits': [
      'Significant Digits',
      'Description',
      'Input Constraints',
      'Steps to Reproduce',
      'Example'
    ],
    'Significant ddd': [
      'Significant Digits',
      'Description',
      'Input Constraints',
      'Steps to Reproduce',
      'Example'
    ],
    'Decimal Points': [
      'Decimal Points'
    ],
    'Bisection': [
      'Bisection',
      'Description'
    ],
    'lmao': [
      'Bisection',
      'Description'
    ],
    'lmao2': [
      'Bisection',
      'Description'
    ],
    'dijikstra': [
      'Bisection',
      'Description'
    ],
    'ddd': [
      'Bisection',
      'Description'
    ]
  }

  get mainKeys (): Array<DocsSidebarNestedLink> {
    return this.listItemsWithRoute.map(item => { return { name: item.name, link: item.link } })
  }

  getNestedKeys (index: number): Array<DocsSidebarNestedLink> {
    return this.listItemsWithRoute[index].components
  }
}
