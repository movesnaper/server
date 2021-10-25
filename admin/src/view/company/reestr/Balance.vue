<template>
  <div>
    <b-table
    hover
    :items="items"
    class="table"
    :fields="fields"
    foot-clone
    >
      <template #head(start)>
        <div class="row m-2">
          <label class="col-4" for="date_start">start</label>
          <b-input class="col"  id="date_start" type="date" v-model="dateStart" />
        </div>
      </template>
     <template #head(dt)>
        <div class="col center">dt</div>
      </template>
     <template #head(ct)>
        <div class="col center">ct</div>
      </template>
      <template #cell(start)="{ item }">
        <div class="row m-0 account">
          <td class="col account__title">{{item.key}}</td>
          <td class="col account__total">{{ summ(item.dt)  }}</td>
          <td class="col account__total">{{ summ(item.ct) }}</td>
        </div>
      </template>   
      <template #cell(end)="{ item }">
        <div class="row mx-0 account">
          <td class="col account__total" >{{ summ(item.total.diff > 0 && item.total.diff ) }}</td>
          <td class="col account__total" style="border-right: 0">{{ summ(item.total.diff < 0 && item.total.diff * -1 ) }}</td>
        </div>
      </template>
      <template #cell(dt)="{ item }">
          <div class="row mx-0" @click="() => test(item)">
            <td class="col center" >{{ item.summ.dt }}</td>
          </div>
      </template>
      <template #cell(ct)="{ item }">
          <div class="row mx-0 ">
            <td class="col center">{{ item.summ.ct }}</td>
          </div>
      </template>
      <template #head(end)>
        <div class="row m-2">
          <label class="col-4" for="date_end">end</label>
          <b-input class="col"  id="date_end" type="date" v-model="dateEnd"/>
        </div>
      </template>      
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: ['start', 'end'].includes(field.key) && '30%' }"
          style="border-bottom: 1px solid #dee2e6;"
        >
      </template>
      <template #row-details="{ item }">
        <balance-details :values="item.values"/>
      </template>
      <template #foot(start)>
        <div class="row m-0">
          <td class="col account__title">Итого</td>
          <td class="col account__total">{{ summ(...items.map(v => v.dt)) }}</td>
          <td class="col account__total" style="border-right: 0">{{ summ(...items.map(v => v.ct)) }}</td>
        </div>
      </template>
      <template #foot(dt)>
          <div class="row mx-0 ">
            <td class="col center account__total">{{ summ(...items.map(({ summ }) => summ.dt)) }}</td>
          </div>
      </template>
      <template #foot(ct)>
          <div class="row mx-0 ">
            <td class="col center account__total">{{ summ(...items.map(({ summ }) => summ.ct)) }}</td>
          </div>
      </template>
      <template #foot(end)>
        <div class="row m-0">
          <td class="col account__total">{{ summ(...items.filter(({total}) => total.diff > 0).map(({total}) => total.diff)) }}</td>
          <td class="col account__total" style="border-right: 0">{{ summ(...items.filter(({total}) => total.diff < 0).map(({total}) => total.diff * -1)) }}</td>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { db } from '@/db'
import { summ, toNumber } from '@/functions'
import BalanceDetails from './BalanceDetails.vue'

export default {
  props: ['active'],
  components: { BalanceDetails },
  data(vm) {
    return {
      fields: [ 'start', 'dt', 'ct', 'end' ],
      items: [],
      dateStart:  '',
      dateEnd: ''
    }
  },
  watch: {
    active(v) {
      if(v === 'balance' && !this.items.length) {
        this.refresh()
      }
    }
  },
  created() {
    // this.dateStart = this.company.settings.date
  },
  computed: {
    ...mapGetters({
      company: 'company'
    })
  },

  methods: {
    summ,
    test(v) {
      console.log('test', v);
    },
    async refresh() {
      const params = { start: this.dateStart }
      this.items = (await db('/reestr').get('/balance', { params })).map(v => {
        const dt = toNumber(summ(v.dt, v.summ.dt))
        const ct = toNumber(summ(v.ct, v.summ.ct))
        const diff = dt - ct
        return {...v, total: { dt, ct, diff }}
      })
      console.log(this.items);
    }
  }
}
</script>

<style scoped>
  .table {
    border: 1px solid #dee2e6;
  }
  .table >>> tbody > tr {
    cursor: pointer;
    border-bottom: 1px solid #dee2e6;
  }
  .table >>> td {
    border-top: none;
    padding: 0;
  }
  .table >>> th {
    border-top: none;
    padding: 0;
  }
  .table .col {
    display: flex;
    height: 40px;
    align-items: center;
  }
  .table >>> th {
    border-right: 1px solid #dee2e6;
  }
  .table tr  td {
    border-right: 1px solid #dee2e6;
    padding-left: 10px;
  }
  .table >>> thead th {
      border-bottom: 1px solid #dee2e6;
  }
  .account__title {
    background-color: rgba(0, 0, 0, 0.089);
    font-weight: 600;
  }
  .account__total {
    background-color: rgba(0, 0, 0, 0.034);
    font-weight: 500;
  }
</style>