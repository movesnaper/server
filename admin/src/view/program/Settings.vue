<template>
      <div class="row ml-0">
        <table class="table ">
          <thead >
            <tr>
              <th scope="col"></th>
              <th scope="col">{{ $t('program.settings.key')}}</th>
              <th scope="col">{{ $t('program.settings.description')}}</th>
              <th scope="col">{{ $t('program.settings.value')}}</th>
              <th scope="col"></th>
            </tr>
          </thead>
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
                <b-input v-show="!!item.key" :value="item.description"
                @change="(description) => setValue(i, {...item, description })"/>
              </td>
              <td class="px-1">
                <b-input v-show="!!item.key" :value="item.value"
                @change="(value) => setValue(i, {...item, value })"/>
              </td>
              <td class="px-0" >
                <b-button v-show="i < values.length"  variant="outline" :id="`remove-${i}`">
                  <b-icon icon="trash" @click.stop="remove(i)" variant="danger"/>
                </b-button>
                <b-tooltip :target="`remove-${i}`" variant="danger">
                  {{ $t('btn.remove')}}
                </b-tooltip>
              </td>
            </tr>
          </draggable>
        </table>
      </div>
</template>

<script>
import Draggable from "vuedraggable";
import mixins from '../../company/mixins'
import { debounce } from 'vue-debounce';

export default {
  mixins: [mixins],
  components: { Draggable },
  data(vm) {
    return {
      values: null,
      changeSync: debounce((value) => vm.onChange(value), 3000),
      loading: false
    };
  },
  watch: {
    values(settings, old) {
      if(!!old) {
        const program = {...this.program, settings }
        this.changeSync(program)
      }
    }
  },
  computed: {
    program() {
      return this.company.program || {}
    }
  },
  created() {
    this.values = this.program.settings || []
  },
  methods: {
    setValue(i, v) {
      this.values.splice(i, 1, v)
    },
    async remove(i) {
      const dialog = await this.$confirm()
      this.values.splice(i, 1)
      dialog && dialog.close()
    },
    async onChange(program) {
      this.loading = true
      await this.save({...this.company, program })
      this.loading = false
      this.update()
    }
  },

};
</script>
<style scoped>

</style>