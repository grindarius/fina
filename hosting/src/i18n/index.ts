import en from './en.json'
import { Locales } from './locales'
import th from './th.json'

export const messages = {
  [Locales.EN]: en,
  [Locales.TH]: th
}

export const defaultLocale = Locales.EN
