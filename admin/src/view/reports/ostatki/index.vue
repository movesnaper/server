<template>
  <preloader v-if="loading"/>
  <div v-else class="col border">
    <print-btn>
      <template #default="{ print }">    
        <node v-for="(node, i) in schema" :url="url" :key="i" :node="node" :ui="ui" :print-mode="print"/>
      </template>
    </print-btn>
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    url: '/company/reports/month/ostatki'
  })
}
</script>

<style>

</style>
