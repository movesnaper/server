<template>
  <div>
    <div v-for="({ name, type, teg }, i) in fields" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ name }}</label>
      <component :is="teg" :type="type" class="col form-control" :value="program[name]"
      @change="({ target }) => onChange(name, target.value)">{{ program[name] }}</component>
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    program({ lombard }){
        return {...lombard.program }
    },
    fields() {
      return ['version', 'date', { name: 'description', teg: 'textarea'}, 'link']
        .map(v => ({ name: v.name || v, type: v.type || 'text', teg: v.teg || 'input' }))
    }
  },
  methods: {
      onChange(name, value) {
        const program = {...this.program, [name]: value }
        this.save({...this.lombard, program })
      }
  }
}
</script>

<style>

</style>