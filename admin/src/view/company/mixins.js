import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      company: 'company'
    }),
    items({ fields = [] }) {
      return fields
        .map(v => ({name: v.name || v, type: v.type || 'text', is: v.is || 'b-input'}))
    }
  },
  methods: {
    ...mapActions({
      save: 'save',
      update: 'update'
    }),
    onChange(key, value) {
      this.save({...this.company, [key]: value })
    }
  }
}