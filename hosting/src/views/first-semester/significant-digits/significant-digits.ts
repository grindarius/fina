import axios from 'axios'
import debounce from 'debounce'
import { Component, Vue } from 'vue-property-decorator'

import { RoundToSignificantDigitsQuerystring, RoundToSignificantDigitsResponse, SignificantDigitsAmountResponse } from '@fina/common'

import { calculateSignificantDigits, roundToSignificantDigits } from '@/api'

/** Debounce time in milliseconds */
const DEBOUNCE_TIME = 500

/** A RegExp pattern that checks for any positive and negative floats and integers. */
const validateNumberRegExp: RegExp = /^-?(0|[1-9]\d*)(\.\d+)?$/

interface SignificantDigitsCardData {
  fullNumber: string
  answer: [string, string, string]
  answerDescription: string
  show: boolean
}

@Component({
  metaInfo () {
    return {
      title: 'Significant Digits | FINA'
    }
  }
})
export default class SignificantDigitsPage extends Vue {
  numberToFindSDAmount = '4920'
  numberToFindSDAmountAnswer: SignificantDigitsAmountResponse = '492'

  roundToSD: RoundToSignificantDigitsQuerystring = {
    input: 0.0006149515874854588,
    sd: 5
  }

  roundToSDAnswer = '0.00061494'

  cardDescription: Array<SignificantDigitsCardData> = [
    {
      fullNumber: '3650',
      answer: ['', '365', '0'],
      answerDescription: `Trailing zeros are not being counted in this case since it's an integer,
        so we're left with 3 significant digits, 3, 6, and 5.`,
      show: false
    },
    {
      fullNumber: '1030',
      answer: ['', '103', '0'],
      answerDescription: `Zeros between non-zero numbers are being counted and
        trailing zeros are not being counted, so we're left
        with 3 significant digits, 1, 0, and 3.`,
      show: false
    },
    {
      fullNumber: '20300.',
      answer: ['', '20300', '.'],
      answerDescription: `Zeros between non-zero numbers are being counted and
        trailing zeros are being counted in this case since it's a float,
        so we're left with 5 significant digits, 2, 0 (on thousands place),
        3, 0 (on tens place), and 0 (on ones place).`,
      show: false
    },
    {
      fullNumber: '0.00423',
      answer: ['0.00', '423', ''],
      answerDescription: `We do not count leading zeros in any case, so we're left with 3 significant digits,
        4, 2, and 3.`,
      show: false
    },
    {
      fullNumber: '0.03030',
      answer: ['0.0', '3030', ''],
      answerDescription: `Zeros in between non-zero numbers are being counted. Leading zeros are
        not being counted. Trailing zeros are being counted in this case since
        it's a float. So we're left with 4 significant digits, 3 (on hundredths place),
        0 (on thousandths place), 3 (on tenth thousandths place),
        and 0 (on hundred thousandths place).`,
      show: false
    },
    {
      fullNumber: '1050.0',
      answer: ['', '1050.0', ''],
      answerDescription: `Zeros in between non-zero numbers are being counted. Trailing zeros are
        being counted in this case since it's a float, and all zeros surrounding the dot
        will be counted. So we're left with 5 significant digits, 1, 0, 5, 0 (on ones place),
        and 0 (on tenth place).`,
      show: false
    },
    {
      fullNumber: '1590.00403020',
      answer: ['', '1590.00403020', ''],
      answerDescription: `Zeros in between non-zero numbers are being counted. Trailing zeros are
        being counted in this case since it's a float, and all zeros surrounding the dot
        will be counted. So we're left with the same number because all of it is significant!`,
      show: false
    }
  ]

  findSDAmount = debounce(this.onNumberToFindSDAmountChange, DEBOUNCE_TIME)
  roundNumberToSD = debounce(this.onRoundToSignificantDigitsChange, DEBOUNCE_TIME)

  async onNumberToFindSDAmountChange (): Promise<void> {
    if (this.numberToFindSDAmount.match(validateNumberRegExp) == null) {
      this.numberToFindSDAmountAnswer = 'Invalid number'
      return
    }

    try {
      const response = await axios.request<SignificantDigitsAmountResponse>({
        method: calculateSignificantDigits.method,
        url: calculateSignificantDigits.url,
        params: {
          input: this.numberToFindSDAmount
        }
      })
      this.numberToFindSDAmountAnswer = response.data
    } catch (error) {
      this.numberToFindSDAmountAnswer = error.message as string
    }
  }

  async onRoundToSignificantDigitsChange (): Promise<void> {
    if (this.roundToSD.input.toString().match(validateNumberRegExp) == null) {
      this.roundToSDAnswer = 'Invalid number'
      return
    }

    if (this.roundToSD.sd < 0 || this.roundToSD.sd >= 15) {
      this.roundToSDAnswer = 'Invalid input: Significant digits must be between 0 and 15'
      return
    }

    try {
      const response = await axios.request<RoundToSignificantDigitsResponse>({
        method: roundToSignificantDigits.method,
        url: roundToSignificantDigits.url,
        params: this.roundToSD
      })
      this.roundToSDAnswer = response.data
    } catch (error) {
      this.roundToSDAnswer = error.message as string
    }
  }

  toggleCard (cardNumber: number): void {
    this.cardDescription[cardNumber].show = !this.cardDescription[cardNumber].show
  }
}
