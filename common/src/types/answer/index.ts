/**
 * An object of raw answer coming out of any root-finding algorithm function
 */
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
 * An answer object that gets sent back from the API
 */
export type Answer = Partial<BaseAnswerObject>
