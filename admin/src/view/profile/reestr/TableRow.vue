<template>
  <div>
    <tr v-for="(item, i) in [...values, {}]" :key="i" :index="i">
      <td class="px-1" v-for="({ key }) in fields" :key="key">
        <b-input :value="item[key]" :disabled="loading && selected === i"
        @change="(v) => setValue(i, {...item, [key]: v })"/>
      </td>
      <td class="center px-0">
        <b-button variant="outline" >
          <b-icon icon="trash" @click.stop="remove(i)" variant="danger"/>
        </b-button>
      </td>
    </tr>
  </div>
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
    // end({ newIndex, to }) {
    //   this.selected = !to.className.includes('remove') ? newIndex : ''
    // },
    remove() {},
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