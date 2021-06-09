<template>
    <b-card v-if="!loading" no-body class="lombard">
      <b-tabs v-model="active" small card class="lombard_tabs">
        <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`company.menu.${item}`)">
          <component class="p-3" :is="`component-${item}`"/>
        </b-tab>
      </b-tabs>
    </b-card>
  <!-- <div>
    <div v-for="(item, i) in fields" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ $t(`settings.main.${item}`) }}</label>
      <input type="text" class="col form-control" :value="lombard[item]"
      @change="({ target }) => onChange(item, target.value)">
    </div>
  </div> -->
</template>

<script>
import mix from './mix'
import ComponentLombard from './Lombard'
import ComponentAddress from './Address'

export default {
  mixins: [ mix ],
  components: { ComponentLombard, ComponentAddress },
  data() {
    return {
      active: 0,
      loading: false,
      tabs: ['lombard', 'address']
    }
  },

}
</script>

<style>

</style>