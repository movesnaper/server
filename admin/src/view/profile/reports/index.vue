<template>
  <div class="reports accordion">
    <b-card no-body v-for="({ tabs, key }, i) in menu" :key="i">
      <b-card-header v-b-toggle="key">
        {{ $t(`reports.periods.${key}`) }}
      </b-card-header>
      <b-collapse :id="key" accordion="reports">
        <b-card-body>
          <b-tabs pills class="tab" vertical>
            <b-tab :title="$t(`reports.${tab}.name`)" v-for="(tab, i) in tabs" :key="i">
              <component class="m-3" :is="`report-${tab}`" :tab="tab"/>
            </b-tab>
          </b-tabs>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import ReportMain from './main/index.vue'
import ReportKassa from './Kassa'
import ReportOstatki from './Ostatki'

export default {
  components: {
    ReportMain,
    ReportKassa,
    ReportOstatki
  },
  data: () => ({
    menu: [
      { key: 'month', tabs: [ 'kassa', 'ostatki' ] },
      { key: 'quarter', tabs: [ 'main' ]}
    ],
    
  })
}
</script>

<style scoped>
  .reports >>> .card-header {
    background: initial;
    padding: 10px 15px;
  }
  .reports >>> .card-body {
    padding: 0;
  }
  .tabs >>> .col-auto {
    border-right: 1px solid rgba(0, 0, 0, 0.13);
  }
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>