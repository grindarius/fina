import { TranslateResult } from 'vue-i18n'

export interface Coordinate {
  x: number
  y: number
}

export interface PageComponent {
  name: string | TranslateResult
  path: string | TranslateResult
}

export interface Page extends PageComponent {
  components: Array<PageComponent>
}
