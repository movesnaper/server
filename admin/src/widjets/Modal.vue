<template>
  <b-modal class="modal" 
    v-model="active" :title="title" :ok-disabled="disabled" @ok="resolve(value)">
    <div v-if="value" class="p-3">
      <div  v-for="({ key, is, type, info, classStyle = 'mb-3' }, i) in fields" :key="i">
        <div :class="['row', classStyle]">
          <component :is="is" :type="type" class='mr-2 col form-control' :placeholder="key" 
          :value="value[key]" @input="({ target }) => setValue(target, key)"/>
          <div v-if="info" class="col-8 mt-1" v-html="info"></div>
        </div>
    </div>
    </div>
  </b-modal>    
</template>

<script>
import CheckBox from '@/widjets/CheckBox.vue'
export default {
components: { CheckBox },
props: [ 'value', 'fields', 'title', 'disabled' ],
data () {
  return {
    origin: {},
    active: false,
    resolve: () => {}
  }
},

methods: {
  show(data = {}){
    this.origin = { ...data }
    this.active = true
    return new Promise((resolve) => {
      this.resolve = resolve
    })
  },
  setValue({ value }, key) {
    this.$emit('input', {...this.value, [key]: value })
  }
},

}
</script>

<style>

</style>
