<template>
  <b-modal ref="modal" hide-footer title="Login">
    <div v-if="!loading">
      <div v-for="({ key, is, type, info, classStyle = 'mb-3' }, i) in fields" :key="i">
        <div :class="['row', classStyle]">
          <component :is="is" :type="type" class='mr-2 col form-control' :placeholder="key" 
            :value="value[key]" @input="({ target }) => setValue(target, key)"/>
          <div v-if="info" class="col-8 mt-1" v-html="info"></div>
        </div>
      </div>
    </div>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" 
        :disabled="!value.name" 
        @click="onCopy(value)">Save</button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import CheckBox from '@/widjets/CheckBox.vue'
import { db } from '@/db'
const { get, post } = db()

export default {
  components: { CheckBox },
  data: () => ({
    value: {},
    info: {},
    loading: false
  }),
  computed: {
    fields() {
      const fields = [
        { key: 'users'},
        { key: 'klients'},
        { key: 'lombards'},
        { key: 'pendings'},
      ].map(v => {
        const info = `<ul><li>${this.info[v.key]}</li></ul>`
        return {...v, is: 'check-box', info }
      })
      return [ { key: 'name', is: 'input' }, ...fields ]
    }
  },
  methods: {
    ...mapActions(['updateDbs']),
    show(name) {
      this.value = { name }
      this.$refs['modal'].show()
      this.refresh()
    },
    async onCopy(value) {
      await post('/replicate', value)
      this.$refs['modal'].hide()
      this.updateDbs(true)
    },
    async refresh() {
      this.loading = true
      try {
        this.info = await get('/report')
      } catch(e) {
        console.error(e);
      } finally {
        this.loading = false
      }
    },
    setValue({ value }, key) {
      this.value = {...this.value, [key]: value }
    }
  }
}
</script>

<style>

</style>