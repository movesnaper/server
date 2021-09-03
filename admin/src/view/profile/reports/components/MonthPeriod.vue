<template>
  <div class="month-period">
   <div class="row p-0">
      <label-select class="col-4 mr-2"
        v-model="selected.lombard"
        :no-selected="$t(`common.all_lombards`)"
        :options="schema.lombards"
        value-field="value"
        text-field="text"/>
      <label-select class="col-4"
        :label="$t(`common.period`)"
        v-model="selected.pepiod"
        :options="schema.periods.filter(docs).map(textField)"
        value-field="value"
        text-field="text"/>      
        <div class="col"></div>
        <b-button class="mr-3" 
          variant="outline-primary" 
          :disabled="!selected.period" 
          @click="print('printMe')">
          {{ $t('btn.print') }}
        </b-button>
    </div>
    <div id="printMe" v-if="selected.period">
      <h5 class="my-3">{{ `${title} ${period}` }}</h5>
      <slot :schema="schema"></slot>
    </div>
    <div v-else class="border center flex-center grey mt-3" style="height: 40vh">
      {{ $t(`reports.periods.no_period`)}}
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import LabelSelect from '@/components/LabelSelect'

export default {
  name: 'MonthPeriod',
  components: { LabelSelect },
  props: ['title'],
  data: () => ({
    schema: {
      periods: [],
      lombards: []
    },
    selected: {
      lombard: null
    }
  }),
  watch: {
    selected: {
      handler({ period }) {
        period && this.$emit('change', this.selected)
      },
      deep: true
    }
  },
  async created() {
    try {
      this.schema = await db('/report').get(`/kassa/schema`)
    } catch(e) {
      console.error(e)
    }
  },
  computed: {
    period({ schema, selected }) {
      const { title: lombard = '' } = selected.period && schema.lombards
        .find(({value}) => value === selected.lombard) || {}
      const { text: period } = this.textField(schema.periods
        .find(({ value }) => value === selected.period))
      return `${lombard} ${period} ${this.year} г.`
    }
  },
  methods: {
    docs({ docs }) {
      return !!docs
    },
    textField(period) {
      return {...period, text: this.$t(`month.${period.value}`)}
    }
  }
}
</script>

<style>

</style>