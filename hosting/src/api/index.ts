type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const apiRootUrl: string = process.env.VUE_APP_FINA_API_LOCAL

interface Endpoint {
  method: RequestMethod
  url: string
  headers: Record<string, string>
}

const headers: Record<string, string> = {
  'Content-Type': 'application/json'
}

export const calculateSignificantDigits: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/significant-digits`,
  headers
}

export const calculateBisection: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/bisection`,
  headers
}

export const calculateFalsePosition: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/false-position`,
  headers
}

export const calculateFixedPointIteration: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/fixed-point-iteration`,
  headers
}

export const calculateNewton: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/newton`,
  headers
}

export const calculateSecant: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/secant`,
  headers
}
