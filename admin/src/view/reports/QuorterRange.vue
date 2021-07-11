<template>
<div class="range">
<ul  class="list-group list-group-horizontal-sm">
  <li v-for="item in items" :key="item"
  :class="['list-group-item', { active: value == item }]"
  @click="selectMonth(item)"
  >{{ item }} квартал</li>
</ul>
</div>
</template>

<script>

export default {
    props: { value: String, range: Array },
    computed: {
      items({ range, value }) {
        return range.filter(v => v.format)
          .map(v => v.format('Q') )
      }
    },
    methods: {
      selectMonth(v) {        
        this.$emit('input', v)
      }
    }
}
</script>

<style scoped>
  .range li {
    cursor: pointer;
  }
  .range li:hover {
    background: #80808014;
  }
</style>