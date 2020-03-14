import { mapGetters, mapActions } from 'vuex'
export default {
    // mixins: [ mix ],
    computed: {
      ...mapGetters({
        map: 'user/map'
      }),
      user({ map }) {
        const id = this.$route.params.id
        return {...map[id]}
      },
      settings({ user }) {
        return {...user.settings}
      }
    },
    methods: {
      ...mapActions({
        save: 'user/save',
        // updateUser: 'user/updateUser'
      }),
      onChange(name, value) {
        return this.save({...this.user, [name]: value })
      }
    }
  }