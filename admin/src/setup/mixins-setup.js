
import $toTitleCase from '@/mixins/toTitleCase'
import $numberFormat from '@/mixins/numberFormat'
import $isNumber from '@/mixins/isNumber'
import $alert from '@/mixins/alert'
import $confirm from '@/mixins/confirm'

export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        $toTitleCase,
        $numberFormat,
        $isNumber,
        $alert,
        $confirm
      }
    })
  }
}
