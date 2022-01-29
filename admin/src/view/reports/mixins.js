import { db } from '@/db'
import Node from './Node.vue'
import Preloader from './components/Skeleton.vue'

export default {
  name: 'Reports',
  components: { 
    Node, 
    Preloader ,
    PrintBtn: () => import('./components/Print.vue'),
  },
  data: () => ({
    schema: [],
    loading: false,
  }),
  watch: {
    '$route': {
      async handler ({query}) {
        const reports = JSON.parse(localStorage.getItem('reports', '{}'))
        if (reports) this.$router.push({ query: { ...reports[this.url], ...query } })
        this.refresh()
      },
      immediate: true
    }
  },

  computed: {
    ui () {
      return this
    }
  },
  methods: {
    async refresh () {
      try {
        this.loading = true
        this.schema = await db().get(this.url, { params: this.$route.query })
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}