<template>
  <div>
    <div v-for="item in fields" :key="item" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ item }}</label>
      <input type="text" class="col form-control" :value="lombard[item]"
      @change="({ target }) => onChange(item, target.value)">
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col col-form-label" >procent</label>
      <div v-for="item in procent" :key="item" class="col-2">
        <div style="text-align: center;">{{ item }}</div>
        <input type="text" class="col form-control" :value="{...lombard.procent }[item]"
        @change="({ target }) => onChange('procent', {...lombard.procent, [item]: target.value})">
      </div>
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >penalty</label>
      <div v-for="item in penalty" :key="item" class="col-2">
        <div style="text-align: center;">{{ item }}</div>
        <input type="text" class="col form-control" :value="{...lombard.penalty }[item]"
        @change="({ target }) => onChange('penalty', {...lombard.penalty, [item]: target.value})">
      </div>
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    fields() {
      return ['logo', 'kod', 'idn', 'director', 'bookkeeper', 'phone']
    },
    procent() {
      return ['gold', 'silver', 'things', 'min']
    },
    penalty() {
      return ['gold', 'silver', 'things']
    },
    days() {
      return ['min', 'max']
    }
  },
  methods: {}
}
</script>

<style>

</style>