<template>
  <div class="reestr">
    <div class="accordion" role="tablist">
      <infinite-loading direction="top" :identifier="infiniteId" @infinite="infiniteHandler"/>
        <b-card v-for="(item, index) in reestr" :key="index" no-body>
          <b-card-header class="pointer" role="tab" v-b-toggle="`reestr-${index}`">
            <div class="row">
              <div class="col-1 flex-center">
                {{ moment(item.date).format('DD.MM.YYYY') }}
              </div>
              <div class="col-1 flex-center">
                {{ item.lombard }}
              </div>
              <div class="col flex-center">
                {{ description(item) }}
              </div>
              <div>
              </div>
            </div>
          </b-card-header>
          <b-collapse
          v-model="visible[index]"
          :id="`reestr-${index}`" 
          :ref="`reestr-${index}`" 
          accordion="accordion" 
          role="tabpanel">
            <reestr-item :value="item.values">
              <template #action>
                <b-button  variant="outline" :id="`edit-${index}`">
                  <b-icon icon="pencil-square" variant="secondary" @click.stop="edit(item)"/>
                </b-button>
                <b-tooltip :target="`edit-${index}`" variant="secondary">
                  {{ $t('btn.edit')}}
                </b-tooltip>
              </template>              
            </reestr-item>
          </b-collapse>
        </b-card>
    </div>
    <b-button variant="outline" @click="edit()" class="my-1">
      <b-icon icon="plus-circle" variant="success"/>
    </b-button>
    <edit-dialog ref="edit-dialog" :loading="loading" @remove="remove"/>
  </div>
</template>

<script>
import mixins from '../mixins'
import { moment } from '@/functions'
import ReestrItem from './ReestrItem.vue'
import EditDialog from './EditDialog.vue'
import { db } from '@/db'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  mixins: [mixins],
  props: ['active'],
  components: { ReestrItem, EditDialog, InfiniteLoading },
  data: () => ({
    visible: {},
    reestr: [],
    loading: false,
    page: 0,
    infiniteId: +new Date()
  }),
  watch: {
    active(v) {
      if(v === 'reestr' ) {
        this.refresh()
      }
    }
  },

  methods: {
    moment,
    async infiniteHandler($state) {
      const params = { page: this.page, limit: 10 }
      const { docs } = await db('/reestr').get('/values', { params })
      if (docs.length) {
        this.page += 1
        this.reestr.unshift(...docs.reverse())
        $state.loaded()
      } else $state.complete()
    },
    refresh() {
      this.page = 0;
      this.reestr = [];
      this.infiniteId += 1;
      this.visible = {}
    },
    async edit(value) {
      const { show, hide } = this.$refs['edit-dialog']
      this.visible = {}
      const data = await show(value)
      try {
        this.loading = true
        await db('/reestr').post('/', data)
        this.refresh()
        hide()
      } catch(e) {
        console.error(e);
      } finally {
        this.loading = false
      }
    },
    async remove(value) {
      const { hide } = this.$refs['edit-dialog']
      try {
        this.loading = true
        await db('/reestr').post('/remove', value)
        this.refresh()
        hide()
      } catch(e) {
        console.error(e);
      } finally {
        this.loading = false
      }
    },
    description({ description, values = [], number }) {
      const [v] = values
      const value = v && this.$t(`accounts.dt${v.dt}-ct${v.ct}`)
      return description || `${value} ${number}`
    }
  }
}
</script>

<style scoped>
.reestr {
  border: 1px solid rgba(0, 0, 0, 0.315);
}
.accordion {
  height: 70vh;
  overflow-y: scroll;
  border-bottom: 1px solid rgba(0, 0, 0, 0.315);
}

</style>