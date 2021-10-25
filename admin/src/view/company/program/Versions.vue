<template>
  <!-- <div> -->
    <div class="accordion" role="tablist">
        <b-card v-for="(item, index) in programs" :key="index" no-body>
          <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`program-${index}`">
            <div class="row">
              <div class="col flex-center" style="font-size: 18px">
                <strong>{{ item.version }}</strong>
                <div style="font-size: 14px; padding-top: 2px">
                  <i class="px-2">{{ moment(item.date).format('DD.MM.YYYY') }}</i>
                </div>
              </div>
              <div>
                <b-button  variant="outline" :id="`remove-${index}`">
                  <b-icon icon="trash" @click.stop="remove(item, index)" variant="danger"/>
                </b-button>
                <b-tooltip :target="`remove-${index}`" variant="danger">
                  {{ $t('btn.remove')}}
                </b-tooltip>
              </div>
            </div>
          </b-card-header>
          <b-collapse
          v-model="visible[index]"
          :id="`program-${index}`" 
          :ref="`program-${index}`" 
          accordion="accordion" 
          role="tabpanel">
            <b-card-body>
              <div v-for="({ name, is, type }, i) in items" :key="i" class="form-group row m-0 mt-2">
                <label class="col-sm-4 col-form-label" >{{ $t(`program.${name}`) }}</label>
                <component rows="3" class="col" :is="is" :type="type"
                :value="item[name]" @change="(v) => edit(index, {...item, [name]: v })"/>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-button variant="outline" @click="add" class="relative" :disabled="loading">
          <b-icon icon="plus-circle" variant="success"/>
          <b-spinner v-if="loading" class="absolute-center"/>
        </b-button>
    </div>
  <!-- </div> -->
</template>

<script>
import { moment } from '@/functions'
import mixins from '../../company/mixins'

export default {
  mixins: [mixins],
  data: () => ({
    loading: false,
    visible: {},
    fields: [
      'version',
      { name: 'date', type: 'date' },
      { name: 'description', is: 'b-form-textarea' },
      'link'
    ]
  }),
  computed: {
    programs() {
      const { versions } = this.company.program || {}
      return versions || []
    }
  },
  methods: {
    moment,
    async add() {
      const list = this.programs.map(v => parseFloat(v.version)).filter(v => isFinite(v) )
      const max = Math.max.apply(null, list)
      const value = isFinite(max) ? (max + 0.01) : 0.01
      const version = value.toFixed(2) + ''
      const date = moment().format('YYYY-MM-DD')
      this.loading = true
      const versions = [...this.programs, { version, date }]
      await this.savePrograms(versions)
      this.loading = false
      this.visible[programs.length - 1] = true
    },
    edit(index, item) {
      this.programs[index] = item
      this.savePrograms(this.programs)
    },
    async remove({ version }, index) {
      const dialog = await this.$confirm({ name: version }) 
      const versions = this.programs.filter((_, i) => index !== i)
      await this.savePrograms(versions)
      dialog.close()
    },
    savePrograms(versions) {
      const program = {...this.company.program, versions }
      return this.save({...this.company, program })
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