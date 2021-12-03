<template>
  <div class="accordion" role="tablist">
    <b-card v-for="(item, index) in banks" :key="index" no-body>
      <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`program-${index}`">
        <div class="row" style="font-size: 18px">
          <div class="col-1 flex-center">{{ index + 1 }}</div>
          <div class="col-3 flex-center">{{ item.number }}</div>
          <div class="col flex-center">{{ item.bank && item.bank.name }}</div>
          <b-button  variant="outline" :disabled="loading">
            <b-icon icon="trash" @click.stop="remove(index, item)" variant="danger"/>
          </b-button>
        </div>
      </b-card-header>
      <b-collapse v-model="visible[index]" accordion="accordion" role="tabpanel" :id="`program-${index}`" >
        <b-card-body>
          <bank-component :value="item" @save="(value) => save(index, value)"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button variant="outline" @click="save(banks.length, {})" class="relative" :disabled="loading">
      <b-icon icon="plus-circle" variant="success"/>
      <b-spinner v-if="loading" class="absolute-center"/>
    </b-button>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  components: { 
    BankComponent: () => import('./components/index.vue')
  },
  
  data: () => ({
    loading: false,
    banks: [],
    visible: {}
  }),

  created() {
    this.refresh()
  },

  methods: {
    async refresh() {
      try {
        this.banks = await db('/company').get('/banks')
      } catch(e) {
        this.$alert(e)
      } 
    },

    async save(index, value) {
      try {
        const { _id } = await db('/company').post('/banks', value)
        this.banks.splice(index, 1, {...value, _id})
      } catch(e) {
        this.$alert(e)
      }
    },

    async remove(index, { account = {}, _id }) {
      const dialog = await this.$confirm({ name: account.number })
      await db('/company').remove('/banks', { data: { _id }})
      this.banks.splice(index, 1)
      dialog.close()
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
    width: 100%;
  }
</style>