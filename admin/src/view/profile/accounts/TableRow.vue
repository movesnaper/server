<template>
  <draggable v-model="values" tag="tbody"  handle=".handle" @end="end"
  ghost-class="ghost"
  :group="{ name: 'remove', pull: true, put: false }">
    <tr 
    v-for="(item, i) in [...values, {}]" :key="i" :index="i">
      <td class="px-1" v-for="({ key }) in fields" :key="key">
        <b-input :value="item[key]" :disabled="loading && selected === i"
        @change="(v) => setValue(i, {...item, [key]: v })"/>
      </td>
      <td class="center px-0">
        <b-button v-show="i < values.length" size="sm" variant="outlined" class="handle">
          <b-icon icon="arrows-fullscreen" aria-hidden="true"></b-icon>
        </b-button>
      </td>
    </tr>
  </draggable>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  props: ['fields', 'value', 'loading'],
  components: { Draggable },
  data() {
    return {
      selected: '',
      values: []
    };
  },
  watch: {
    values(v) {
      this.$emit('change', v)
    }
  },
  created() {
    this.values = this.value
  },
  methods: {
    end({ newIndex, to }) {
      this.selected = !to.className.includes('remove') ? newIndex : ''
    },
    setValue(i, v) {
      this.selected = i
      this.values.splice(i, 1, v)
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
</style>