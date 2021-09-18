<template>
    <b-tabs v-model="active" small card class="company_tabs">
      <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`reports.company.menu.${item}`)">
        <component  class="p-3" :is="item" :values="values"/>
      </b-tab>
    </b-tabs>
</template>

<script>
import components from './index'

export default {
  components,
  props: ['headers', 'values'],
  data: () => ({

    loading: false,
    active: 0,
    tabs: [
      'common-info',
      'common-results',
      'average-values',
      'money-operations',
      'balance-info',
      'gold-guaranty'
    ],
  })
}
</script>

<style scoped>
#print {
  display: none;
}
.company_tabs >>> a {
  color: black  !important;
}
</style>