<template>
  <div>
    <div class="text-center">
      <h6>
        2. Основные показатели деятельности некредитной финансовой организации,
         осуществляющей деятельность ломбардов
      </h6>
    </div>
    <div class="text-center">
      <h6> 1. Сведения о займах </h6>
    </div>
    <credits-info class="mt-3" :values="values"/>
    <procents class="mt-3" :values="values"/>
    <credits-payed class="mt-3" :values="values"/>
    <dogovor-info class="mt-3" :values="values"/>
    <other-dogovor-info class="mt-3" :values="values"/>
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
</template>

<script>
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
  props: ['values']
}
</script>

<style>

</style>