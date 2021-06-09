<template>
  <div class="content p-5">
    <mba-table v-if="!loading" class="lombards-table" :items="model"
      :fields="{
        index: {name: '#', width: '10px'},
        name: {name: $t('lombards.name')},
        program: {name: $t('lombards.program'), width: '20%'},
        active: {width: '10px'},
        token: {name: $t('lombards.token'), width: '30%'},
        remove: {width: '10px'}
      }">
      <template #index="{item}">{{item.index + 1}}</template> 
      <template #name="{item}">
        <a href="#" @click="go('lombard',item)">{{ item.name }}</a>
      </template> 
      <template #program="{item}">
      <b-form-select
        class="col form-control"
        :value="item.program.index"
        @input="(index)=> onSelect(item, index)"
        :options="programs"
        text-field="version"
        value-field="index"/>
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
      <template #footer_name="{item}"><input type="text" :value="item"
      @change="({target}) => save({ name: target.value, index: model.length })">
      </template> 
    </mba-table>
    <div v-else>
      <b-skeleton-table 
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mix from './mix'

export default {
  mixins: [mix],
  async created() {
    await this.update()
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
    async onRemove(v) {
      const dialog = await this.confirm(v, this.$t(`lombards.remove`))
      await this.remove(v)
      dialog.close()
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

<style>

/* .lombards-table th.active {
  width: 10px;
} */


</style>
