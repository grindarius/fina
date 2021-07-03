export interface Coordinate {
  x: number
  y: number
}

export interface PageComponent {
  name: string
  path: string
}

export interface Page extends PageComponent {
  components: Array<PageComponent>
}
