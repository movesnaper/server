
import MbaTable from '@/widjets/Mba-Table'
import { Confirm } from '@/widjets'

export default {
components: { MbaTable },
data: () => ({
  loading: false
}),
async created() {
  this.loading = true
  await this.update()
  this.loading = false
},
computed: {
  model({ items }) {
    return items.sort((a, b) => a.index - b.index)
  }
},
methods: {
  go(name, { _id }) {
      this.$router.push(`/${name}/${_id}`)       
  },
  onRemove(v) {
      const t = v => v
      const html = `<p>${t('enter')} <strong style='color: red;'>${v.name}</strong> ${t('to confirm')}</p>`
      const action = () => this.remove(v)
      const validate = (name) => v.name === name
      const value = { title: 'remove', html }
      this.$modal.show(Confirm, { value, action, validate })
  }
}
}
