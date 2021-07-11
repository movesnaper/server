<template>
  <div>
    <b-button variant="outline" v-for="(type, i) in types" :key="i">
      <b-badge :variant="getVariant(type)" :id="`warnings-${i}`">
        {{ items.filter((v) => v.type === type).length }}
      </b-badge>
      <b-tooltip :target="`warnings-${i}`" :variant="getVariant(type)">
        {{ $t(`warnings.${type}`)}}
      </b-tooltip>
    </b-button>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  props: ['index', 'items'],
  computed: {
    types({ items }) {
      return [...new Set(items.map(v => v.type))]
    }
  }
}
</script>

<style>

</style>