
export default {
  props: ['value', 'change'],
  computed: {
    items({ fields = [] }) {
      return fields
        .map(v => ({name: v.name || v, type: v.type || 'text', is: v.is || 'b-input'}))
    }
  },
  // methods: {
  //   onChange(key, value) {
  //     this.save({...this.company, [key]: value })
  //   }
  // }
}