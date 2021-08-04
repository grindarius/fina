import debounce from 'debounce'
import { Component, Vue } from 'vue-property-decorator'

import { DEBOUNCE_TIME, validateNumberRegExp } from '@fina/common'

@Component({
  metaInfo () {
    return {
      title: 'Decimal Points | FINA'
    }
  }
})
export default class DecimalPointsPage extends Vue {
  numberToFindDPAmount = {
    input: 334.556,
    dp: 2
  }

  numberToFindDPAmountAnswer = '334.56'

  findDPAmount = debounce(this.onFindDPAmount, DEBOUNCE_TIME)

  onFindDPAmount (): void {
    if (this.numberToFindDPAmount.input.toString().match(validateNumberRegExp) == null) {
      this.numberToFindDPAmountAnswer = 'Invalid input: That\'s not a number???'
      return
    }

    if (this.numberToFindDPAmount.dp < 1 || this.numberToFindDPAmount.dp > 20) {
      this.numberToFindDPAmountAnswer = 'Invalid input: Decimal points must be between 1 to 20'
      return
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const inputToCalculate = Number(this.numberToFindDPAmount.input || 334.556)

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const dpToCalculate = Number(this.numberToFindDPAmount.dp || 2)

    this.numberToFindDPAmountAnswer = inputToCalculate.toFixed(dpToCalculate)
  }
}
