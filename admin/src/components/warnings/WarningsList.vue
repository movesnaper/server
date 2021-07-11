<template>
  <b-collapse
    :id="`info-${index}`" 
    @input="(v) => $emit('input', v)">
    <div class="row m-0 flex-center p-2">
      <div class="col">
        <b-form-checkbox 
        :checked="checked"
        @change="toggleAll">
          {{ $t(`btn.select_all`) }}
        </b-form-checkbox>
      </div>
      <input-search class="col" v-model="search"/>
      <b-button class="relative"
      variant="outline-danger"
      :disabled="disabled"
      @click="onRemove">
      {{ $t('btn.remove') }}
      <b-badge variant="light">{{ selected.filter((v) => v).length }}</b-badge>
      <b-spinner v-if="loading" class="absolute-center"/>
      </b-button>
    </div>
    <b-list-group>
      <b-list-group-item v-for="(item, i) in values" :key="i">
        <div class="row m-0 flex-center">
          <b-form-checkbox :checked="!!selected.find((v) => v === item._id)"
          @input="(v) => selected.splice(i, 1, v && item._id)"/>
          <div class="col">
            <div class="row m-0 flex-center">
              <div class="col-2">{{ item.date }}</div>
              <div class="col">{{ item.klient }}</div>
              <div class="mr-2">{{ item.number }}</div>
              <i class="mr-2">{{ item.account }}</i>
              <div>{{ item.summ }}</div>
              <b-button variant="outline" :id="`warnings-${i + 1}`">
                <b-icon icon="info-circle-fill"
                :variant="getVariant(item.type)"
                @click="showModal(item)"/>
              </b-button>
              <b-tooltip 
              :target="`warnings-${i + 1}`"
              :variant="getVariant(item.type)">
                {{ item.warning }}
              </b-tooltip>
            </div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </b-collapse>
</template>

<script>
import { InputSearch } from '@/widjets'
import { toSearchString, firstChar, moment } from '@/functions'
import mixins from './mixins'

export default {
  mixins: [mixins],
  components: { InputSearch },
  props: ['value', 'items', 'index', 'remove' ],
  data: (vm) => ({
    selected: [],
    search: '',
    loading: false
  }),
  computed: {
    values({ items }) {
      const str = toSearchString(this.search)
      return items.map((v) => {
        const date = moment(v.date).format('L')
        const klient = this.shortName(v.klient)
        const { account, summ } = this.getAccount(v.values)
        return {...v, date, klient, account, summ }
      }).filter(({ date, klient, number, account, summ }) => 
          toSearchString(date, klient, number, account, summ).includes(str))
    },
    checked({ items, selected }) {
      const {length} = selected.filter((v) => v)
      return items.length === length
    },
    disabled({ loading, selected }) {
      return loading || !selected.some(v => v)
    }
  },
  methods: {
    showModal(v) {
      this.$alert({ variant: 'info', message: 'test'})
    },
    toggleAll(checked) {
      this.selected = checked ? this.items.map((v) => v._id) : []
    },
    async onRemove() {
      this.loading = true
      try {
        await this.remove(this.selected.filter((v) => v))
      } catch({ message }) {
        this.$alert({ message })
      } finally {
        this.loading = false
      }
    },
    shortName({ family = '', name = '', sername = '' }) {
      return `${family} ${firstChar(name)}. ${firstChar(sername)}.`
    },
    getAccount([{ dt, ct, summ }]) {
      const acc = dt !== '301' ? `dt.${dt}` : `ct.${ct}`
      return { account: this.$t(`accounts.${acc}`), summ }
    }
  }

}
</script>

<style>

</style>