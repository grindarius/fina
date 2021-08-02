import { TableKey } from '@/types'

/**
 * Keys of bisection answer to construct table
 */
export const bisectionTableKeys: Array<TableKey> = [
  {
    field: 'i',
    label: 'i'
  },
  {
    field: 'a',
    label: 'a'
  },
  {
    field: 'b',
    label: 'b'
  },
  {
    field: 'f(a)',
    label: 'fa'
  },
  {
    field: 'f(b)',
    label: 'fb'
  },
  {
    field: 'c',
    label: 'c'
  },
  {
    field: 'f(c)',
    label: 'fc'
  },
  {
    field: 'Error',
    label: 'error'
  }
]

/**
 * Keys of false position answer to construct table
 */
export const falsePositionTableKeys: Array<TableKey> = [
  {
    field: 'i',
    label: 'i'
  },
  {
    field: 'a',
    label: 'a'
  },
  {
    field: 'b',
    label: 'b'
  },
  {
    field: 'f(a)',
    label: 'fa'
  },
  {
    field: 'f(b)',
    label: 'fb'
  },
  {
    field: 'c',
    label: 'c'
  },
  {
    field: 'f(c)',
    label: 'fc'
  },
  {
    field: 'Error',
    label: 'error'
  }
]

export const fixedPointIterationTableKeys: Array<TableKey> = [
  {
    field: 'i',
    label: 'i'
  },
  {
    field: 'x_n',
    label: 'a'
  },
  {
    field: 'f(x_n)',
    label: 'fa'
  },
  {
    field: 'x_{n + 1}',
    label: 'c'
  },
  {
    field: 'f(x_{n + 1})',
    label: 'fc'
  },
  {
    field: 'Error',
    label: 'error'
  }
]

export const newtonTableKeys: Array<TableKey> = [
  {
    field: 'i',
    label: 'i'
  },
  {
    field: 'x_n',
    label: 'a'
  },
  {
    field: 'f(x_n)',
    label: 'fa'
  },
  {
    field: 'f\'(x_n)',
    label: 'fpa'
  },
  {
    field: 'x_{n + 1}',
    label: 'c'
  },
  {
    field: 'f(x_{n + 1})',
    label: 'fc'
  },
  {
    field: 'Error',
    label: 'error'
  }
]
