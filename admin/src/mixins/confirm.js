import Confirm from '@/widjets/Confirm.vue'

export default function ({ name, header = 'Подтвердите удаление' } = {}, title) {
  const html = name && `<p> Для подтверждения введите
        <strong style='color: red;'>${name}</strong>
      </p>`
  const validate = (v) => !name || v === name
  const value = { header, title, html }
  return new Promise((resolve) => {
    this.$modal.show(Confirm, { value, action: resolve, validate })
  })
}
