import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DocsLandingPage extends Vue {
  listItems: Record<string, Array<string>> = {
    'Significant Digits': [
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
    ]
  }

  get mainKeys (): Array<string> {
    return Object.keys(this.listItems)
  }

  nestedKeys (key: string): Array<string> {
    return this.listItems[key]
  }
}
