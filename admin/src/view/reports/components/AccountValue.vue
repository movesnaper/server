<template>
  <div class="modal-content">
    <div class="modal-header title">
      <span>{{ header.text }}</span>
      <span>{{ account.value }}</span>
      <button type="button" class="close" @click="$emit('close')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h1>test</h1>
    </div>
    <div class="modal-footer">
    </div>
  </div>    
</template>

<script>
import { db } from '@/db'

export default {
  props: ['header', 'value'],
  data() {
    return { }
  },
  async created() {
    const params = { value: this.account.value }
    const res = await db('/report').get('/balance/reestr/account', {params} )
    console.log(res);
  },
  computed: {
    account() {
      return this.value[this.header.key]
    }
   },
  methods: { }
}
</script>

<style >

</style>
