
import MbaTable from '@/widjets/Mba-Table'
import { confirm } from '@/widjets/mixins'

export default {
components: { MbaTable },
mixins: [confirm],
data: () => ({
  loading: false,
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

}
}
