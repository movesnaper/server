import Confirm from '../Confirm.vue'

export default {
  methods: {
    confirm(v, title) {
      const t = (v) => this.$t(`confirm.${v}`)
      const header = t('to_confirm')
      const html = `<p>${t('enter')} <strong style='color: red;'>${v.name}</strong></p>`
      const validate = (name) => v.name === name
      const value = { header, title, html }
      return new Promise((resolve) => {
        this.$modal.show(Confirm, { value, action: resolve, validate })
      })
    }
  }
}