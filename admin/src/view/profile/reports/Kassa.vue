<template>
  <month-period
    class="kassa"
    :title="$t('reports.kassa.name')"
    @change="refresh">
    <template #default="{headers}">
      <table v-if="!loading" class="table-striped table-sm mt-2">
        <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="i" scope="col">
              {{ $t(`reports.kassa.header.${header}`) }}
            </th>
            <th scope="col">{{ toDouble(ok) }}</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(v, i) in values" :key="i">
            <th scope="row">{{ moment(v.date).format('DD.MM.YYYY') }}</th>
            <td>{{ toDouble(v.prixod) }}</td>
            <td>{{ toDouble(v.ct377) }}</td>
            <td>{{ toDouble(v.ct703) }}</td>
            <td>{{ toDouble(v.ct704) }}</td>
            <th>{{ toDouble(v.totalDt) }}</th>
            <td>{{ toDouble(v.dt377) }}</td>
            <td>{{ toDouble(v.dt703) }}</td>
            <td>{{ toDouble(v.rasxod) }}</td>
            <th>{{ toDouble(v.totalCt) }}</th>
            <th>{{ toDouble(v.ok) }}</th>
          </tr>
          <tr>
            <th scope="row">{{ $t('reports.kassa.header.total') }}</th>
            <td>{{ total('proxod') }}</td>
            <td>{{ total('ct377') }}</td>
            <td>{{ total('ct703') }}</td>
            <td>{{ total('ct704') }}</td>
            <th>{{ total('totalDt') }}</th>
            <td>{{ total('dt377') }}</td>
            <td>{{ total('dt703') }}</td>
            <td>{{ total('rasxod') }}</td>
            <th>{{ total('totalCt') }}</th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <b-skeleton-table v-else :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }"/>  
    </template>
  </month-period>
</template>

<script>
import { db } from '@/db'
import { toDouble, moment } from '@/functions'
import MonthPeriod from './components/MonthPeriod.vue'
export default {
  components: { MonthPeriod },
  data: () => ({
    ok: '',
    values: [],
    loading: true
  }),
  methods: {
    moment,
    toDouble,
    async refresh({ lombard, period }) {
      console.log(lombard, period);
      try {
        this.loading = true
        const params = { lombard, month: period }
        const { values, ok } = await db('/report').get(`/kassa`, { params })
        this.ok = ok
        this.values = values
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    total(key) {
      const total = this.values.reduce((cur, v) => cur + v[key], 0)
      return toDouble(total)
    }
  }
}
</script>

<style scoped>
  .kassa >>> table {
    width: 100%;
  }
</style>