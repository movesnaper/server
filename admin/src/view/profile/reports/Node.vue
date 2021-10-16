<template>
  <div :class="['col', node.col]">
    <component :is="node.is || 'span'" 
    :style="node.style"
    v-on="$parent.$listeners"
    v-bind="{...$parent.$attrs, node: node}">
      {{ node.value }}
    </component>
    <div :class="['row', node.row]" v-if="node.children">
      <node v-for="(v, i) in node.children.filter((v) => v)" :node="v" :key="i"/>
    </div>
  </div>
</template>

<script>
import components from './components'
export default {
  name: 'Node',
  components,
  props: ['node']
}
</script>

<style>

</style>