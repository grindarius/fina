import axios from 'axios'
import debounce from 'debounce'
import { Component, Vue } from 'vue-property-decorator'

import { SignificantDigitsAmountResponse } from '@fina/common'

import { calculateSignificantDigits } from '@/api'

/** Debounce time in milliseconds */
const DEBOUNCE_TIME = 500

/** A RegExp pattern that checks for any positive and negative floats and integers. */
const validateNumberRegExp: RegExp = /^-?(0|[1-9]\d*)(\.\d+)?$/

interface SignificantDigitsCardData {
  fullNumber: string
  answer: Array<string>
  answerDescription: string
  show: boolean
}

interface RoundToSDInput {
  input: number
  sd: number
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

  roundToSD: RoundToSDInput = {
    input: 305.459,
    sd: 5
  }

  roundToSDAnswer = '305.46'

  findSDCardDescription: Array<SignificantDigitsCardData> =
  [
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

  roundSDCardDescription: Array<SignificantDigitsCardData> =
  [
    {
      fullNumber: '0.004312',
      answer: ['', '0.00431', '2'],
      answerDescription: `Keep sliding from left side of the input until you find the number 4. Because we don't count
        zeros in front and behind the dot. Since we're aiming for 3 significant digits. Count first 3 significant digits,
        then, check the last digit after 1. Since it's less than 5 (2). We drop it, left with 0.00431.`,
      show: false
    },
    {
      fullNumber: '35',
      answer: ['', '35.0', ''],
      answerDescription: `For this one. Since the amount of significant digits is less than the number initially have.
        So we have to add one more significant digit to the back of it to make it 3 SD. You can do that by adding a decimal point and a zero
        at the back.`,
      show: false
    },
    {
      fullNumber: '59584',
      answer: ['', '5.96e+4', ''],
      answerDescription: `Since the amount of significant digits we wanted is less than the number initially have.
        We would reduce it by converting it to a Scientific Notation, so we can handle the amount of significant digits
        in N part, then handle the 10^x part so that it gives the same value as the initial value.`,
      show: false
    },
    {
      fullNumber: '0.000011233344',
      answer: ['', '0.0000112', '33344'],
      answerDescription: `This one is pretty close to the first one that we keep going from left side until we find
        the significant, then count 3 of it, check if the next SD is less than 5 or not, in this case it's not, so we
        drop them off.`,
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

  onRoundToSignificantDigitsChange (): void {
    if (this.roundToSD.input.toString().match(validateNumberRegExp) == null) {
      this.roundToSDAnswer = 'Invalid number'
      return
    }

    if (this.roundToSD.sd < 0 || this.roundToSD.sd >= 15) {
      this.roundToSDAnswer = 'Invalid input: Significant digits must be between 0 and 15'
      return
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const inputToCalculate = this.roundToSD.input || 305.459

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const sdToCalculate = this.roundToSD.sd || 5

    this.roundToSDAnswer = Number(inputToCalculate).toPrecision(sdToCalculate)
  }

  toggleFindSDCard (cardNumber: number): void {
    this.findSDCardDescription[cardNumber].show = !this.findSDCardDescription[cardNumber].show
  }

  toggleRoundSDCard (cardNumber: number): void {
    this.roundSDCardDescription[cardNumber].show = !this.roundSDCardDescription[cardNumber].show
  }
}
