import { db } from '@/db'
import { DataTable, FormInput } from '@/widjets'

export default {
    components: { DataTable, FormInput },
    data: () => ({
      data: [],
      loading: false
    }),
    async created () {
      this.update()
    },
    methods: {
      async update (silent) {
        try {
          if (!silent) this.loading = true
          this.data = await db(url).get()
        } catch (e) {
          this.$alert(e)
        } finally {
          this.loading = false
        }
      },
  
      async add (id) {
        try {
          await db(url).post(`/${id}`)
        } catch (e) {
          this.$alert(e)
        } finally {
          this.update(true)
        }
      },
  
      async activate ({_id}) {
        try {
          await db(`${url}/activate`).post(`/${_id}`)
        } catch (e) {
          this.$alert(e)
        } finally {
          this.update(true)
        }
      },
  
      async remove ({ _id, _rev }) {
        const dialog = await this.$confirm({ name: _id })
        try {
          await db(url).remove(`/${_id}`, {_rev})
          this.update(true)
        } catch (e) {
          this.$alert(e)
        } finally {
          dialog.close()
        }
      }
    }
  }