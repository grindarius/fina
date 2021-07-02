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

export interface BaseAnswerObject {
  i: number
  a: number
  b: number
  c: number
  fa: number
  fpa: number
  fb: number
  fc: number
  error: number
}

/**
 * A raw answer object interface to store all the data that each iteration gives in, raw.
 * We need to have this because the system dumps all the information in, then later gets
 * mapped with the `TableDisplay` object to create a 2d array for rendering out as a table.
 */
export type Answer = Partial<BaseAnswerObject>
