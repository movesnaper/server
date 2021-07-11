<template>
  <div class="company-accounts">
    <div class="row ma-0">
      <div class="col-1"></div>
      <div class="flex-center center px-2"  >{{ $t(`accounts.date`) }}</div>
      <b-input class="col-2" type="date" :value="settings.date" 
        @change="(date) => onChange({...settings, date })"/>
    </div>
    <b-tabs pills class="tab mt-3 " vertical>
      <b-tab :title="$t(`accounts.menu.${tab}`)" v-for="(tab, i) in tabs" :key="i">
        <div class="row ml-0 ">
          <table class="table sticky-header">
            <thead >
              <tr>
                <th v-for="({ key, width }) in fields" :key="key"
                :width="width">{{ $t(`accounts.${key}`) }}</th>
                <th width="10px">
                <draggable :group="{ name: 'remove', put: true, pull: false }" 
                  ghostClass="display-none" class="flex-center remove">
                  <b-button variant="outline" >
                    <b-icon icon="trash" @click.stop="remove(i)" variant="danger"/>
                  </b-button>
                </draggable>
                </th>
              </tr>
            </thead>
            <table-row 
            :fields="fields"
            :value="settings[tab] || []" 
            :loading="loading"
            @change="(v) => onChange({...settings, [tab]: v })"/>
          </table>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import mixins from '../mixins'
import TableRow from './TableRow.vue'

export default {
  mixins: [mixins],
  components: { Draggable, TableRow },
  data: () => ({
    tabs: ['dt', 'ct'],
    fields: [
      { key: 'key', width: '20%' },
      { key: 'description' },
      { key: 'count', width: '10%' },
      { key: 'summ', width: '20%' },
    ],
    loading: false
  }),
  computed: {
    settings() {
      return this.company.settings || {}
    },
  },
  methods: {
    async onChange(settings) {
      this.loading = true
      await this.save({...this.company, settings })
      this.loading = false
      this.update()
    }
  }
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
  .company-accounts >>> .tabs .col-auto ul {
    background-color: white;
    position: sticky;
    top: 120px;
    z-index: 2000;
    border-bottom: none;    
  }

</style>