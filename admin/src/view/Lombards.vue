<template>
  <div class="lombards p-5">
    <data-table v-if="!loading" class="lombards-table" :items="lombards"
      :fields="{
        index: {name: '#', width: '10px'},
        name: {name: $t('lombards.name')},
        program: {name: $t('lombards.program'), width: '15%'},
        active: {width: '30px'},
        token: {name: $t('lombards.token'), width: '20%'},
        remove: {width: '10px'}
      }">
      <template #index="{index}">{{index + 1}}</template> 
      <template #name="{item, index}">
        <warnings-header :item="item">
          <b-button variant="outlined" v-b-toggle="`info-${item._id}`">
            <b-icon icon="chevron-down" :rotate="visible[index] ? 180 : 0"></b-icon>
          </b-button>          
        </warnings-header>
      </template> 
      <template #program="{item}">
        <div class="px-2">
          <b-form-select
          :value="item.program"
          @input="(program) => save({...item, program})"
          :options="programs.map((v) => v.version)"/>
        </div>
      </template> 
      <template #token="{item, index}" >
        <div class="row m-0 px-2">
          <b-input class="col mr-2" type="text" :disabled="!item.active" :value="item.token" readonly/>
            <b-button variant="outline" :id="`copy-${index}`" @click="copy(item).then(showTooltip)">
              <b-icon icon="stickies"/>
            </b-button>
            <b-tooltip 
            :disabled="true" 
            :ref="`copy-${index}`"
            :delay="50"
            :target="`copy-${index}`" variant="light">{{ $t('lombards.copy_token')}}</b-tooltip>
        </div>
      </template> 
      <template #active="{item}">
        <div class="center">
          <input type="checkbox" :checked="item['active']"
          @change="save({...item, active: !item.active})">
        </div>               
      </template> 
      <template #remove="{item}">
        <b-button  variant="link" >
          <b-icon icon="trash" @click="onRemove(item)" variant="danger"/>
        </b-button>
      </template> 
      <template #footer_index>
        <div class="center">
          <b-icon icon="plus-circle" variant="success"/>
        </div>
      </template> 
      <template #footer_name>
        <form-input :action="addNew"/>
      </template> 
    </data-table>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"/>
    </div>
  </div>
</template>

<script>
import { db } from '@/db'
import { WarningsHeader } from '@/components/warnings'
import { DataTable, FormInput } from '@/widjets'
import { confirm } from '@/widjets/mixins'

export default {
  components: { WarningsHeader, DataTable, FormInput },
  mixins: [confirm],
  data: () => ({
    visible: [],
    lombards: [],
    programs: [],
    loading: false
  }),
  created() {
    this.refresh()
  },  
  methods: {
    async refresh() {
      try {
        this.lombards = await db('/lombards').get('/values')
        this.programs = await db('/program').get('/values')
      } catch(e) {
        this.$alert(e)
      }
    },
    async save(value) {
      try {
        await db('/lombards').post('/values', value)
        this.refresh()
      } catch(e) {
        this.$alert(e)
      }
    },
    async copy({ token, index }) {
      const textArea = document.createElement("textarea")
      textArea.value = token
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy');
        return index
      } catch (err) {
        console.error(err);
      } finally {
        document.body.removeChild(textArea);
      }
    },
    showTooltip(index) {
      const el = this.$refs[`copy-${index}`]
      el.$emit('open')
      setTimeout(() => {
        el.$emit('close')
      }, 1000)
    },
    addNew(name) {
      // const values = this.items.filter(v => v.index).map(v => v.index)
      // const index = Math.max(...values) + 1
      // return this.save({ name, index })
    }
  }
}
</script>

<style scoped>
  .lombards >>> .list-group-item {
    border-left: initial;
    border-right: initial;
  }
</style>
