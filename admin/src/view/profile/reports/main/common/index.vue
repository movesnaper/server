<template>
  <div class="">
    <div class="text-center">
      <h6>
        1. Общие сведения о некредитной финансовой организации,
        осуществляющей деятельность ломбардов
      </h6>
    </div>
    <company-props class="mt-3" :value="company"/>
    <bank-details class="mt-3" :value="company"/>
    <insurance-organizftions class="mt-3" :value="company"/>
  </div>
</template>

<script>
import BankDetails from './BankDetails.vue'
import CompanyProps from './CompanyProps.vue'
import InsuranceOrganizftions from './InsuranceOrganizftions.vue'
export default {
  components: { 
    CompanyProps, 
    BankDetails, 
    InsuranceOrganizftions },
  props: ['values'],
  computed: {
    company() {
      const company = this.values && this.values.company
      return company || {}
    }
  }
}
</script>

<style>

</style>