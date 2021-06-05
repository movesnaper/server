import { mapGetters, mapActions } from 'vuex'
export default {
    // mixins: [ mix ],
    computed: {
      ...mapGetters({
        map: 'lombard/map'
      }),
      lombard({ map }) {
        const id = this.$route.params.id
        return {...map[id]}
      },
      settings({ lombard }) {
        return {...lombard.settings}
      }
    },
    methods: {
      ...mapActions({
        save: 'lombard/save'
      }),
      onChange(name, value) {
        this.save({...this.lombard, [name]: value })        
      }
    }
  }