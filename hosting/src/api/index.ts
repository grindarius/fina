type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const apiRootUrl: string = process.env.VUE_APP_FINA_API_LOCAL

interface Endpoint {
  method: RequestMethod
  url: string
}

export const calculateSignificantDigits: Endpoint = {
  method: 'GET',
  url: `${apiRootUrl}/significant-digits/amount`
}
