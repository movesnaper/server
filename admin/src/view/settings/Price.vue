<template>
  <div class="row">
    <div class="col">
      <div class="row" >
        <div class="col-4">gold</div>
        <div class="col">price</div>
      </div>
      <div v-for="({ proba, price, add }, i) in [...gold, { add: true }]" :key="i"
      :class="['form-group row m-0 mt-2', { add }]">
        <input type="text" class="col-4 form-control mr-2" :value="proba"
        @change="({ target }) => onChange('gold', { proba: target.value }, i)">
        <input type="text" class="col form-control" :value="price" 
        @change="({ target }) => onChange('gold', { price: target.value }, i)">
      </div>
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    price({ lombard }) {
      return {...lombard.price }
    },
    gold({ price }) {
      return price.gold || []
    }
  },
  methods: {
      onChange(type, v, i) {
        this[type][i] = {...this[type][i], ...v }
        const price = {...this.price, [type]: this[type].filter(({ proba }) => !!proba)}
        this.save({...this.lombard, price })
      }
  }
}
</script>

<style>

</style>