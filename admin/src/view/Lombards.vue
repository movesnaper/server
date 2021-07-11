<template>
  <div class="lombards p-5">
    <data-table v-if="!loading" class="lombards-table" :items="model"
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
        <div class="row m-0 flex-center">
          <div class="col">
            <a href="#" @click="go('lombard',item)">{{ item.name }}</a>
          </div>
          <warnings-header :index="index" :items="warnings[item.name] || []"/>
          <b-button variant="outlined"
          v-b-toggle="`info-${index}`" 
          :disabled="!(warnings[item.name] || []).length">
            <b-icon icon="chevron-down"  :rotate="visible[index] ? 180 : 0"></b-icon>
          </b-button>
        </div>
        <warnings-list
        :index="index"
        :value="visible[index]"
        :items="warnings[item.name] || []" 
        @input="(v) => visible.splice(index, 1, v)"
        :remove="(v) => remove(v).then(refresh)"/>
      </template> 
      <template #program="{item}">
        <div class="px-2">
          <b-form-select
          :value="(item.program || {}).index"
          @input="(index)=> onSelect(item, index)"
          :options="programs"
          text-field="version"
          value-field="index"/>
        </div>
      </template> 
      <template #token="{item, index}" >
        <div class="row m-0 px-2">
          <b-input class="col mr-2" type="text" :disabled="!item.active" :value="item.token" readonly/>
            <b-button variant="outline" :id="`copy-${index}`" 
            @click="copy(item).then(showTooltip)">
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
      <template #remove="{item, index}">
        <b-button  variant="outline" :id="`remove-${index}`">
          <b-icon icon="trash" @click="onRemove(item)" variant="danger"/>
        </b-button>
        <b-tooltip :target="`remove-${index}`" variant="danger">
          {{ $t('lombards.remove')}}
        </b-tooltip>
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
const { get } = db('/lombard')
import { mapGetters, mapActions } from 'vuex'
import { WarningsHeader, WarningsList } from '@/components/warnings'
import mix from './mix'

export default {
  mixins: [mix],
  components: { WarningsList, WarningsHeader },
  data: () => ({
    visible: [],
    warnings: {}
  }),
  created() {
    this.refresh()
  },  
  computed: {
    ...mapGetters({
      items: 'lombard/lombards',
      company: 'company'
    }),
    programs({ company }) {
      return (company.programs || []).map((v, index) => ({...v, index}))
    }
  },
  methods: {
    ...mapActions('lombard', ['save', 'remove', 'update']),
    async refresh() {
      this.warnings = await get(`/warnigs`)
    },
    onSelect(item, index) {
      const { remote, local } = this.company
      const program = {...this.programs[index], remote, local}
      this.save({...item, program })
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
