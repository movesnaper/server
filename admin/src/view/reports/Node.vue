<template>
  <div :class="[node.col || 'col']">
    <component :is="node.is || 'span'" 
    :style="node.style"
    v-on="$parent.$listeners"
    v-bind="{...$parent.$attrs, node }">
      {{ value }}
    </component>
    <div :class="['row', node.row]" v-if="node.children">
      <node v-for="(v, i) in node.children.filter((v) => v)" :node="v" :key="i"/>
    </div>
  </div>
</template>

<script>
import components from './components/index'
import { get } from 'lodash'

export default {
  name: 'Node',
  components,
  props: ['node'],
  computed: {
    value() {
      const {value = {}} = this.node
      const getValue = (v) => typeof v === 'string' ? get(this, v) : v
      return value.get ? value.get.map(getValue)
        .reduce((cur, v) => get(cur , v, cur)) : this.node.value
    }
  }
}
</script>

<style>

</style>