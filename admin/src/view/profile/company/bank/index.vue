<template>
  <div>
 <div class="accordion" role="tablist">
    <b-card v-for="(item, i) in items" :key="i" no-body>
      <b-card-header class="py-0 pointer" role="tab" v-b-toggle="`program-${i}`">
        <div class="row" style="font-size: 18px">
          <div class="col-1 flex-center">
            {{ i + 1 }}
          </div>
          <div class="col-3 flex-center">
            {{ item.number }}
          </div>
          <div class="col flex-center" >
            {{ item.bank && item.bank.name }}
          </div>
          <div>
            <b-button  variant="outline" :id="`remove-${i}`" :disabled="loading || disabled">
              <b-icon icon="trash" @click.stop="remove(item, i)" variant="danger"/>
            </b-button>
            <b-tooltip :target="`remove-${i}`" variant="danger">
              {{ $t('btn.remove')}}
            </b-tooltip>
          </div>
        </div>
      </b-card-header>
      <b-collapse
       v-model="visible[i]"
      :id="`program-${i}`" 
      :ref="`program-${i}`" 
      accordion="accordion" 
      role="tabpanel">
        <b-card-body>
          <bank-component :value="item" @change="(v) =>onChange(v, i)"/>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button variant="outline" @click="add" class="relative" 
    :disabled="loading || disabled">
      <b-icon icon="plus-circle" variant="success"/>
      <b-spinner v-if="loading" class="absolute-center"/>
    </b-button>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BankComponent from './components'

export default {
  components: { BankComponent },
  data: () => ({
    loading: false,
    visible: {},
  }),

  computed: {
    ...mapGetters({
      company: 'company'
    }),
    items({ company }) {
      return company.bank || []
    },
    disabled({ company }) {
      const bank = company.bank || []
      return !bank.length
    }
  },
  methods: {
    ...mapActions({ 
      save: 'save',
      update: 'update' 
    }),
    async onChange(value, index) {
      this.items.splice(index, 1, value)
      await this.save({...this.company, bank: this.items })
      this.update()
    },
    async add() {
      this.loading = true
      const items = [...this.items, {}]
      await this.save({...this.company, bank: items })
      this.loading = false
      this.visible[this.items.length - 1] = true
    },
    async remove({ number }, index) {
      const dialog = await this.$confirm({ name: number })
      const items = this.items.filter((_, i) => i !== index)
      await this.save({...this.company, bank: items })
      dialog && dialog.close()
      this.update()
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