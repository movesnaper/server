<template>
  <div>
    <div class="row mb-2">
      <div class="col"><strong>{{ title || text }}</strong></div>
      <div class="col"><strong>{{ minfin }}</strong></div>
    </div>
    <div class="row mb-2" >
        <div class="col" style="text-align: center;">
          <h5>{{ period.title }}</h5>
        </div>
    </div>
    <div v-if="company" class="p-3" style="font-size: 18px;">
      <div v-for="({ label, key }, i) in company.schema" :key="i" class="row border">
        <div class="col border-right">{{ label }}</div>
        <div class="col">{{ company[key] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['company', 'title', 'minfin', 'append', 'text', 'period']
}
</script>

<style>

</style>