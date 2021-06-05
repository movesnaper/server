<template>
  <div>
    <div v-for="({ name, is, type }, i) in fields" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ name }}</label>
      <component 
      class="col"
      :is="is"
      :type="type"
      :value="company[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    selected: 0,
    fields: [
      'remote',
      'local'
    ].map(v => {
      return {name: v.name || v, type: v.type || 'text', is: v.is || 'b-input'}
    })
  }),

  computed: {
    ...mapGetters({
      company: 'company'
    })
  },
  methods: {
    ...mapActions({
      save: 'save'
    }),

    onChange(key, value) {
      this.save({...this.company, [key]: value })
    }
  }
}
</script>

<style>

</style>