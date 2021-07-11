import Confirm from '@/widjets/Confirm.vue'

export default function({ name } = {}, title) {
      const header = name && this.$t('confirm.to_confirm')
      const html = name && `<p>${this.$t('confirm.enter')} 
        <strong style='color: red;'>${name}</strong>
      </p>`
      const validate = (v) => !name || v === name
      const value = { header, title, html }
      return new Promise((resolve) => {
        this.$modal.show(Confirm, { value, action: resolve, validate })

      })
}