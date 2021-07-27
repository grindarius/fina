/**
 * Coordiate of the points from the calculation, used to
 * plot each dot in the grapher component.
 */
export interface Coordinate {
  x: number
  y: number
}

/**
 * Repersents each nested pages for the documentation sidebar.
 */
export interface PageComponent {
  name: string
  path: string
}

/**
 * Represents first level heading for the documentation sidebar.
 */
export interface Page extends PageComponent {
  components: Array<PageComponent>
}

/**
 * Stores keys and label to render as katex for each type of table.
 */
export interface TableKey {
  /**
   * The key to convert to TeX
   */
  field: string
  /**
   * The key to refer to the data
   */
  label: string
}
