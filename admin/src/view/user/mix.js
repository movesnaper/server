import { mapActions } from 'vuex'
import {FieldsInputs} from '@/widjets'

export default {
  components: {FieldsInputs},
  props: ['user'],
  methods: {
    ...mapActions({
      save: 'user/save',
    }),
    onChange(name, value) {
      return this.save({...this.user, [name]: value })
    }
  }
  }