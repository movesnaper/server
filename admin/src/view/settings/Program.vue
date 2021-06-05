<template>
  <div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" ></label>
        <b-form-select
          :value="program.index"
          @input="onSelect"
          :options="programs"
          class="col"
          text-field="version"
          value-field="index"
        ></b-form-select>      
    </div>
    <div v-for="({ name, type = 'text', is = 'input' }, i) in fields" :key="i" 
    class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ name }}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      rows="5"
      :value="program[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
  </div>
</template>

<script>
import mix from './mix'
import { mapGetters } from 'vuex'
export default {
  mixins: [ mix ],
  computed: {
    ...mapGetters({
      company: 'company'
    }),
    programs({ company }) {
      return (company.programs || []).map((v, index) => ({...v, index}))
    },
    program({ lombard }){
        return {...lombard.program }
    },
    fields() {
      return [
        'version',
        { name: 'date', type: 'date' },
        { name: 'description', is: 'b-form-textarea'},
        'link',
        'remote',
        'local',
        ].map(v => {
          return {name: v.name || v, type: v.type || 'text', is: v.is || 'b-input'}
        })
    }
  },
  methods: {
    onChange(name, value) {
      const program = {...this.program, [name]: value }
      this.save({...this.lombard, program })
    },
    onSelect(index) {
      const { remote, local } = this.company
      const program = {...this.programs[index], remote, local}
      this.save({...this.lombard, program })
    }
  }
}
</script>

<style>

</style>