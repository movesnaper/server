<template>
  <draggable 
    v-model="model"
    tag="tbody" 
    handle=".handle"
    @end="end"
    ghost-class="ghost"
    :group="{ name: 'remove', pull: true, put: false }">
    <tr v-for="(item, i) in [...values, {}]" :key="i" :index="i">
      <td class="px-1" v-for="({ key }) in fields" :key="key">
        <b-input :value="item[key]" @change="(v) => setValue(i, {...item, [key]: v })"/>
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
import { debounce } from 'vue-debounce';

export default {
  props: ['fields', 'settings' ],
  components: { Draggable },
  data: (vm) => ({
    values: [],
    selected: '',
    changeSync: debounce((v) => vm.$emit('change', v), 3000)
  }),
  watch: {
    settings(v) {
      this.values = v
    }
  },
  computed: {
    model: {
      get() {
        return this.values
      },
      set(v) {
        this.values = v
        this.changeSync(v)
      }
    }
  },
  methods: {
    end({ newIndex, to }) {
      this.selected = !to.className.includes('remove') ? newIndex : ''
    },
    setValue(i, v) {
      this.selected = i
      this.values[i] = v
      this.changeSync(this.values)
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
</style>