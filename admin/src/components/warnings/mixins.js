
export default {
  methods: {
    getVariant(type) {
      switch(type) {
        case 'deleted': return 'danger'
        default: return 'warning'
      }
    }    
  }
}