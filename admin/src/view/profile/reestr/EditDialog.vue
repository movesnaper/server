<template>
  <b-modal v-model="modal" size="xl">
    <template #default="{ }">
      <div class="row mx-0 px-3">
        <div v-for="({is, key, type, className, label, format = (v) => v }, i) in fields" :key="i"
        :class="[className, 'px-1']">
        <div v-if="label" class="col-form-label">{{ $t(`accounts.${label}`) }}</div>
        <component
        rows="3"
        :is="is"
        :type="type"
        @change="(v) => (data = {...data, [key]: v})"
        :value="format(data[key])"
        :options="options"
        :placeholder="!label ? $t(`accounts.${key}`) : ''"
        />
        </div>
      </div>
      <reestr-item
      max-height="400px"
      edit-mode
      class="mt-3" 
      v-model="data.values">
        <template #action>
          <draggable :group="{ name: 'remove', put: true, pull: false }" 
                  ghostClass="display-none" class="flex-center remove">
          <b-button  variant="outline" :id="`remove`">
            <b-icon icon="trash" @click.stop="remove" variant="danger"/>
          </b-button>
          <b-tooltip :target="`remove`" variant="danger">
            {{ $t('btn.remove')}}
          </b-tooltip>
          </draggable>
        </template>
      </reestr-item>
    </template>
    <template #modal-footer="{ cancel }">
      <b-button  @click="cancel()">
        {{ $t(`btn.cancel`) }}
      </b-button>
      <b-button variant="success" @click="save" class="relative" :disabled="loading">
        {{ $t(`btn.save`) }}
        <b-spinner v-if="loading" class="absolute-center"/>
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import Draggable from "vuedraggable";
import ReestrItem from './ReestrItem.vue'
import { moment } from '@/functions'
import { mapGetters } from 'vuex'
const format = 'YYYY-MM-DD'
export default {
  components: { ReestrItem, Draggable },
  props: ['loading'],
  data: () => ({
    modal: false,
    resolve: null,
    data: {},
    fields: [
      { key: 'date', type: 'date', className: 'col-3', is: 'b-input', label: 'date', format: (v) => moment(v).format(format) },
      { key: 'lombard', className: 'col-2', is: 'b-select', label: 'lombard' },
      { key: 'description', className: 'col', is: 'b-textarea' }
    ],
  }),
  computed: {
    ...mapGetters({
      lombards: 'lombard/lombards'
    }),
    options() {
      return this.lombards.map(v => v.name) || []
    }
  },
  methods: {
    show(value) {
      this.data = value || { date: moment().format(format), values: [] }
      this.modal = true
      return new Promise(resolve => this.resolve = resolve)
    },
    hide() {
      this.modal = false
    },
    save() {
      if(!this.data.values.length) return this.remove()
      const date = moment(this.date).toISOString()
      this.resolve({...this.data, date})
    },
    remove() {
      if(!this.data._id) return this.hide()
      this.$emit('remove', this.data)
    }
  }
}
</script>

<style>

</style>