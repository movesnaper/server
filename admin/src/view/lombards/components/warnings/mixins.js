
export default {
  computed: {
    variants () {
      return {
        deleted: 'danger',
        warning: 'warning'
      }
    }
  },
  methods: {
    getVariant ({ deleted }) {
      return deleted ? 'deleted' : 'warning'
    }
  }
}
