<template>
  <div class="modal-content">
    <div class="modal-header title">
      <button type="button" class="close" @click="close">
        <span aria-hidden="true">&times;</span>
      </button>

    </div>
    <div class="modal-body">

      <b-row class="my-2">
        <label class="col-3" for="key">Тип счёта</label>
        <b-form-checkbox class="col"
          v-model="account.active"
          :value="true"
          :unchecked-value="false">
          Активный
        </b-form-checkbox>
        <b-form-checkbox class="col"
          v-model="account.passive"
          :value="true"
          :unchecked-value="false">
          Пасивный
        </b-form-checkbox>
      </b-row>         
      <b-row class="my-2">
        <label class="col-3" >Счёт/субсчёт</label>
        <b-form-input class="col" 
        v-model="account.key"
        placeholder="Например 301/sub-account"/>
      </b-row>      
      <b-row class="my-2">
        <label class="col-3" for="key">Описание</label>
        <b-form-input class="col"
        v-model="account.description"
        placeholder="Описание счёта"/>
      </b-row>
      <b-row class="my-2">
        <label class="col-3">Документ</label>
        <b-form-input class="col mr-1"
          v-model="document.dt"
          placeholder="Дт например order.dt"/>
        <b-form-input class="col ml-1"
          v-model="document.ct"
          placeholder="Кт например order.ct"/>
      </b-row>      
      <b-row class="my-2">
        <label class="col-3">
          <b-form-checkbox
            v-model="account.count"
            :value="true"
            :unchecked-value="false">
            Количество
          </b-form-checkbox>
        </label>
        <b-form-input class="col mr-1"
          v-model="account.count_dt"
          :disabled="!account.count || !account.active" 
          placeholder="Дт"/>
        <b-form-input class="col ml-1"
          v-model="account.count_ct"
          :disabled="!account.count || !account.passive" 
          placeholder="Кт"/>
      </b-row>      
      <b-row class="my-2">
        <label class="col-3">
          <b-form-checkbox
            v-model="account.summ"
            :value="true"
            :unchecked-value="false">
            Сумма
          </b-form-checkbox>
        </label>
        <b-form-input class="col mr-1"
        v-model="account.summ_dt"
        :disabled="!account.summ || !account.active" 
        placeholder="Дт начальный остаток"/>
        <b-form-input class="col ml-1"
        v-model="account.summ_ct"
        :disabled="!account.summ || !account.passive" 
        placeholder="Кт начальный остаток"/>
      </b-row>      
    </div>
    <div class="modal-footer">
      <!-- <div class="row"> -->
        <div class="col">
          <b-button variant="outline" >
            <b-icon icon="trash" @click.stop="remove" variant="danger"/>
          </b-button>
        </div>
        <div class="col"></div>
        <!-- <div class="col"> -->
          <button type="button" class="btn btn-primary relative"
          :disabled="loading || saving"  @click="save">
          <b-spinner v-if="saving"  small class="absolute-center"></b-spinner>
          <span>Сохранить</span>
          </button>
        <!-- </div>     -->
      </div>
    </div>
  <!-- </div>     -->
</template>

<script>
import { db } from '@/db'
export default {
  props: ['header', 'value', 'ui'],
  components: {  },
  data() {
    return {
      loading: false,
      saving: false,
      account: {},
      document: {}
     }
  },
  async created() {
    if(typeof this.key !== 'string') return
    try {
      this.loading = true
      const params = { key: this.key }
      const [value] = await db('/report').get('/balance/reestr/account', {params} )
      this.account = value || {}
      this.document = this.account.document || {}
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = false
    }
  },
  computed: {
    key() {
      return this.value[this.header.key].value
    }
  },
  methods: {
    async remove() {
      await this.$confirm({ name: this.account.key }) 
      await db('/report').post('/balance/reestr/account', {...this.account, _deleted: true } )
      await this.ui.refresh(true)
      this.close()
    },
    close() {
      this.$emit('close')
    },
    async save() {
      try {
        this.saving = true
        const payload = {...this.account, document: this.document}
        await db('/report').post('/balance/reestr/account', payload )
        await this.ui.refresh(true)
        this.close()
      } catch(e) {
        console.error(e);
      } finally {
        this.saving = false
      }      
    }
  }
}
</script>

<style >

</style>
