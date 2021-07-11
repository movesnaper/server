<template>
  <div v-if="!loading">
    <div class="text-center">
      <h6>
        2. Основные показатели деятельности некредитной финансовой организации,
         осуществляющей деятельность ломбардов
      </h6>
    </div>
    <div class="text-center">
      <h6> 1. Сведения о займах </h6>
    </div>
    <credits-info class="mt-3" :value="value.credits || {}"/>
    <procents class="mt-3" :value="value.procents"/>
    <credits-payed class="mt-3" :value="value.payed"/>
    <dogovor-info class="mt-3" :value="value.dogovor || {}"/>
    <other-dogovor-info class="mt-3"/>
    <div class="text-center mt-3">
      <h6> 
        2. Сведения о денежных средствах физических лиц-участников (учредителей)
         некредитной финансовой организации,
         осуществляющей деятельность ломбардов,
         предоставленных некредитной финансовой организации,
         осуществляющей деятельность ломбардов
      </h6>
    </div>
    <money-info/>
    <div class="text-center mt-3">
      <h6> 
        3. Информация о страховании рисков некредитной финансовой организации,
         осуществляющей деятельность ломбардов, связанных с вещами, принятыми в залог
      </h6>
    </div>
    <insurance-info class="mt-3"/>
  </div>
  <div v-else>
    <b-skeleton-table 
    :rows="5"
    :columns="4"
    :table-props="{ bordered: true, striped: true }"
    ></b-skeleton-table>
  </div>
</template>

<script>
import { db } from '@/db'
import CreditsInfo from './CreditsInfo.vue'
import Procents from './Procents.vue'
import CreditsPayed from './CreditsPayed.vue'
import DogovorInfo from './DogovorInfo.vue'
import OtherDogovorInfo from './OtherDogovorInfo.vue'
import InsuranceInfo from './InsuranceInfo.vue'
import MoneyInfo from './MoneyInfo.vue'
export default {
  components: { 
    CreditsInfo, 
    Procents,
    CreditsPayed,
    DogovorInfo,
    OtherDogovorInfo,
    InsuranceInfo,
    MoneyInfo
  },
  props: ['period'],
  data: () => ({
    loading: false,
    value: {}
  }),
  created() {
    this.refresh()
  },
  methods: {
    async refresh() {
      this.loading = true
      try {
        this.value = await db('/report').get(`/main`, { 
          params: this.period
        })
      } catch({ message }) {
        this.$alert({ message, title: 'report-main-results'})
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>