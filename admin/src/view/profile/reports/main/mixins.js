import { db } from '@/db'

export default {
  props: ['period'],
  data: () => ({
    loading: false,
    value: {}
  }),
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.loading = true
      try {
        this.value = await db('/report').get(`/${this.report}`, { 
          params: this.period
        })
      } catch({ message }) {
        this.$alert({ message, title: `report-${this.report}`})
      } finally {
        this.loading = false
      }
    }
  }
}