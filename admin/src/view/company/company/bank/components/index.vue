<template>
  <div>
    <b-card no-body class="company">
      <b-tabs v-model="active" small>
        <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`company.menu.${item}`)">
          <component class="p-3" 
          :is="`component-${item}`" 
          :value="value" 
          :change="onChange"/>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>  
</template>

<script>
import ComponentAccount from './Account'
import ComponentBank from './Bank'
import ComponentAddress from './Address'

export default {
  components: {ComponentAccount, ComponentBank, ComponentAddress},
  props: ['value'],
  data: () => ({
    active: 0,
    tabs: ['account', 'bank', 'address']
  }),
  methods: {
    onChange(name, value) {
      this.$emit('change', {...this.value, [name]: value })
    }
  }
}
</script>

<style scoped>
  .company >>> .nav-tabs {
    padding: 10px 10px 0;
  }
</style>