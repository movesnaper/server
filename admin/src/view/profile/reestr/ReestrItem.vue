<template>
  <div class="col reestr-item" :style="{'max-height': $attrs['max-height'] }">
    <table class="table ">
      <thead :class="['relative', $attrs['max-height'] && 'sticky']">
        <tr class="px-2 ">
          <th v-for="({ key, width }) in fields" :key="key"
          :width="width">{{ $t(`reestr.${key}`) }}</th>
          <th width="5px" v-if="editMode"></th>
        </tr>
        <div class="action">
          <slot name="action"></slot>
        </div>
      </thead>
      <draggable v-model="values" tag="tbody"  handle=".handle" 
      ghost-class="ghost"
      :group="{ name: 'remove', pull: true, put: false }">
        <tr v-for="(item, index) in !editMode ? values : [...values, {}]" :key="index">
          <td class="px-1" v-for="({ is, type, key, options, change = () => {} }, i) in fields" :key="i">
            <component
            v-if="editMode"
            :is="is" 
            :type="type" 
            :options="accounts[options]"
            :value="item[key]" 
            @change="(v) => setValue(index, {...item, [key]: v }).then(change(v))"/>
            <div v-else class="col">{{ item[key] }}</div>
          </td>
          <td v-show="index < values.length" style="vertical-align: middle;" class="px-0" v-if="editMode">
            <b-button size="sm" variant="outlined" class="handle">
              <b-icon icon="arrows-fullscreen" aria-hidden="true"></b-icon>
            </b-button>
          </td>
        </tr>
      </draggable>
    </table>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import { mapGetters } from 'vuex'

export default {
  props: ['value', 'loading'],
  components: { Draggable },
  data: () => {
    return {
      fields: [
        { key: 'dt', width: '10%', is: 'b-select', options: 'dt' },
        { key: 'ct', width: '10%', is: 'b-select', options: 'ct' },
        { key: 'description', is: 'b-input', change: (v) => console.log(v) },
        { key: 'document', width: '10%',is: 'b-input' },
        { key: 'count', width: '8%', is: 'b-input' },
        { key: 'summ', width: '15%', is: 'b-input', action: 'edit' },
      ]
  }
  },
  computed: {
    ...mapGetters({
      company: 'company',
    }),
    editMode() {
      return this.$attrs['edit-mode'] !== undefined
    },
    action() {
      return this.editMode ? 'remove' : 'edit'
    },
    values: {
      get() {
        return this.value.map((v) => {
          const key = v.dt && v.ct && `accounts.dt${v.dt}-ct${v.ct}`
          const description = key && this.$te(key) ? this.$t(key) : ''
          return {...v, description}
        })     
      },
      set(values) {
        this.$emit('input', values)
      }
    },
    accounts() {
      const {settings} = this.company || {}
      const account = (v) => v.key.split('/')[0]
      const dt = [...new Set((settings.dt || []).map(account))]
      const ct = [...new Set((settings.ct || []).map(account))]
      return { dt, ct }
    }
  },
  methods: {
    async setValue(index, value) {
      this.values[index] = value
      this.$emit('input', this.values)
    }
  }
}
</script>

<style scoped>
.plus-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -10px;
}
.plus-icon.rotate {
    -webkit-animation:spin 2s linear infinite;
    -moz-animation:spin 2s linear infinite;
    animation:spin 2s linear infinite;
}
.table {
  margin-bottom: 0;
}
.table th {
  padding-bottom: 0px;
  border-bottom: initial;
  font-weight: 600;
}
.action {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2001;
}
.sticky {
    background-color: white;
    position: sticky;
    top: -3px;
    z-index: 2000;
    /* border-bottom: none; */  
}
.reestr-item {
  overflow-y: auto;
}

</style>