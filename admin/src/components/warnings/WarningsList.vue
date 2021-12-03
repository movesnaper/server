<template>
  <div>
    <div class="row m-0 flex-center p-1 warning-list-row">
      <div class="col">
        <b-form-checkbox 
        :checked="checked"
        @change="toggleAll">
          Выбрать все
        </b-form-checkbox>
      </div>
      <slot name="remove-btn" :selected="selected"></slot>
    </div>
    <b-list-group>
      <b-list-group-item v-for="(item, i) in values" :key="i" class="py-0">
        <div class="row m-0 flex-center">
          <b-form-checkbox :checked="selected.includes(item._id)"
          @input="(v) => selected.splice(i, 1, v && item._id)"/>
          <div class="col">
            <div class="row m-0 flex-center">
              <div class="col-1 p-0">{{ item.date }}</div>
              <div class="col-4">
                  {{ item.number }}
                  <i class="mr-2">{{ item.account }}</i>
                  <span>{{ item.summ }}</span>
              </div>
              <div class="col">
                <b-button variant="outline">
                  <b-icon icon="info-circle-fill"
                  :variant="variants[getVariant(item)]"/>
                </b-button>
                <span :class="variants[getVariant(item)]">{{item.deleted || item.warning}}</span>        
              </div>              
            </div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { InputSearch } from '@/widjets'
import { moment } from '@/functions'
import mixins from './mixins'

export default {
  mixins: [mixins],
  components: { InputSearch },
  props: ['warnings'],
  data: () => ({
    selected: [],
    loading: false
  }),
  computed: {
    values() {
      return this.warnings.map((v) => {
        const date = moment(v.date).format('L')
        const { account, summ } = this.getAccount(v.values)
        return {...v, date, account, summ }
      })
    },
    checked() {
      const {length} = this.selected.filter((v) => v)
      return this.warnings.length === length
    },
    disabled({ loading, selected }) {
      return loading || !selected.some(v => v)
    }
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.warnings.map((v) => v._id) : []
    },
    getAccount([{ dt, ct, summ }]) {
      const acc = dt !== '301' ? `dt.${dt}` : `ct.${ct}`
      return { account: this.$t(`accounts.dt${dt}-ct${ct}`), summ }
    }
  }

}
</script>

<style scoped>
  .warning-list-row {
    height: 40px;
  }
</style>