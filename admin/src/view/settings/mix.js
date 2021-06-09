import { mapGetters, mapActions } from 'vuex'
import {FieldsInputs} from '@/widjets'

export default {
  components: {FieldsInputs},
  computed: {
    ...mapGetters({
      map: 'lombard/map',
      company: 'company'
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