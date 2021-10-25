<template>
  <draggable v-model="values" tag="tbody"  handle=".handle">
    <tr v-for="(item, i) in [...values, {}]" :key="i">
      <td class="center px-0">
        <b-button v-show="i < values.length" size="sm" variant="outlined" class="handle">
          <b-icon icon="arrows-fullscreen" aria-hidden="true"></b-icon>
        </b-button>
      </td>
      <td  class="px-1">
        <b-input :value="item.key"
        @change="(key) => setValue(i, {...item, key })"/>
      </td>
      <td class="px-1">
        <b-input :value="item.value"
        @change="(value) => setValue(i, {...item, value })"/>
      </td>
      <td class="px-0" >
        <b-button variant="outline" :id="`remove-${i}`">
          <b-icon icon="trash" @click.stop="remove(i)" variant="danger"/>
        </b-button>
        <b-tooltip :target="`remove-${i}`" variant="danger">
          {{ $t('btn.remove')}}
        </b-tooltip>
      </td>
    </tr>
  </draggable>
</template>

<script>
import Draggable from "vuedraggable";
import { debounce } from 'vue-debounce';

export default {
  components: { Draggable },
  props: ['value'],
  data(vm) {
    return {
      values: null,
      changeSync: debounce((value) => vm.$emit('change', value), 3000)
    };
  },
  watch: {
    values(value, old) {
      if(!!old) {
        this.changeSync(value)
      }
    }
  },
  created() {
    this.values = this.value || []
  },
  methods: {
    setValue(i, v) {
      this.values.splice(i, 1, v)
    },
    async remove(i) {
      const dialog = await this.$confirm()
      this.values.splice(i, 1)
      dialog && dialog.close()
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
</style>