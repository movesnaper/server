import { moment } from '@/functions'
export default {
  props: ['value'],
  methods: {
    moment,
    addressTostring(address = {}) {
      return ['city', 'region', 'district', 'street', 'home']
        .filter((key) => address[key])
          .map((key) => `${this.$t(`address.${key}`).toLowerCase()} ${address[key]}`)
            .join(', ')
    }
  }
}