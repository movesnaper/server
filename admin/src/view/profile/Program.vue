<template>
  <div>
    <div class="form-group row m-0 mt-2">
      <div class="col-sm-4"></div>
      <b-dropdown ref="dropdown"
        :text="current.version"
        block
        split
        split-variant="outline"
        class="col p-0 simple"
      >
        <b-dropdown-item v-for="({ version, index }) in programs" :key="index"
        @click="() => selected = index">
        <div class="flex-between">
          <span>{{ version}}</span>
          <b-icon
          @click.stop="remove(index)"
          icon="trash"></b-icon>
        </div>
        </b-dropdown-item>
        <b-dropdown-item @click.stop="addProgram">
          <b-icon
          icon="plus"></b-icon>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-if="selectedIndex >= 0">
    <div  v-for="({ name, is, type }, i) in fields" :key="i" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ name }}</label>
      <component
      rows="3"
      class="col"
      :is="is"
      :type="type"
      :value="current[name]"
      @change="(value) => onChange(name, value)"
      />
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { moment } from '../../functions'
export default {
  data: () => ({
    selected: -1,
    fields: [
      'version',
      { name: 'date', type: 'date' },
      { name: 'description', is: 'b-form-textarea' },
      'link'
    ].map(v => {
      return {name: v.name || v, type: v.type || 'text', is: v.is || 'b-input'}
    })
  }),

  computed: {
    ...mapGetters({
      company: 'company'
    }),
    programs({ company }) {
      return (company.programs || []).map((v, index) => ({...v, index}))
    },
    selectedIndex({ programs, selected }) {
      const { length } = programs
      return selected >= 0 ? selected : length - 1
    },
    current({ selectedIndex, programs }) {
      return programs[selectedIndex] || {}
    }
  },
  methods: {
    ...mapActions({
      save: 'save'
    }),
    async addProgram() {
      const programs = this.programs.map(v => parseFloat(v.version)).filter(v => isFinite(v) )
      const max = Math.max.apply(null, programs)
      const value = isFinite(max) ? (max + 0.01) : 0.01
      const version = value.toFixed(2) + ''
      const date = moment().format('YYYY-MM-DD')
      await this.save({...this.company, programs: [...this.programs, { version, date }] })
      this.selected = this.programs.length
    },
    onChange(name, value) {
      const data = {...this.current, [name]: value }
      this.programs.splice(this.selected, 1, data)
      this.save({...this.company, programs: this.programs })
    },
    async remove(v) {
      this.programs.splice(v, 1)
      await this.save({...this.company, programs: this.programs })
      this.$refs['dropdown'].hide()
      if(this.selected === v) this.selected = v - 1 
    }
  }
}
</script>

<style scoped>
  .simple >>>  .btn {
    text-align: left;
    border: 1px solid black;
    box-shadow: none;
  }
  .simple >>>  .dropdown-menu {
    /* margin-left: 15px; */
    width: 100%;
  }
</style>