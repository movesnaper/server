<template>
  <div :class="[node.col || 'col']" :style="node.style">
    <component :is="node.is || 'span'"
    :style="node.style"
    v-on="$listeners"
    v-bind="{...$parent.$attrs, ...$attrs, node }">
      {{ value }}
    </component>
    <div :class="className" v-if="node.children">
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
    className () {
      const { row, col } = this.node
      return col ? ['col', col] : ['row', row]
    },
    value () {
      const { value = {} } = this.node
      const getValue = (v) => typeof v === 'string' ? get(this, v) : v
      return value.get ? value.get.map(getValue)
        .reduce((cur, v) => get(cur, v, cur)) : this.node.value
    }
  }
}
</script>

<style>

</style>
