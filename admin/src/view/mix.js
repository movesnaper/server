import { DataTable, FormInput } from '@/widjets'
import { confirm } from '@/widjets/mixins'

export default {
components: { DataTable, FormInput },
mixins: [confirm],
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
  async onRemove({ _id }) {
    const dialog = await this.confirm(v)
    await this.remove([_id])
    dialog.close()
  },
  addNew(name) {
    const values = this.items.filter(v => v.index).map(v => v.index)
    const index = Math.max(...values) + 1
    return this.save({ name, index })
  }
}
}
