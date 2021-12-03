<template>
  <div class="row">
    <div class="col">
      <div v-for="({ key, value, is, type}) in fields" :key="key" class="form-group row m-0 mt-2">
        <label class="col-form-label col-2" >{{ value }}</label>
        <component rows="3" class="col" :is="is" :type="type"
        :value="item[key]" @change="(v) => $emit('change', {...item, [key]: v })"/>
      </div>
    </div>
    <div class="col">
      <div v-for="({key, value}, index) in [...settings, {}]" :key="index" 
      class="form-group row m-0 mt-2">
        <input placeholder="Ключ" :value="key"
          :class="['col-3 mr-3 form-control', {error: dublicates.includes(key)}]" 
          @change="({ target }) => change({ key: target.value, value }, index)"/>
        <input class="col form-control" placeholder="Значение" :value="value" 
          @change="({ target }) => change({ key, value: target.value }, index)"/>
        <div class="col-1">
          <remove-btn v-if="key" icon="x" @click="() => remove(index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  components: {
    RemoveBtn: () => import('./Button.vue')
  },
  data: () => ({
    tmp: {},
    fields: [
      { key: 'version', value: 'Версия', is: 'b-form-input'},
      { key: 'date', value: 'Дата', is: 'b-form-input', type: 'date' },
      { key: 'description', value: 'Описание', is: 'b-form-textarea' },
      { key: 'link', value: 'Ссылка для скачивания', is: 'b-form-input'}
    ]
  }),
  computed: {
    settings() {
      return this.item.settings || []
    },
    dublicates() {
      return this.settings.map((v) => v.key)
        .filter((e, i, a) => a.indexOf(e) !== i)
    }
  },
  methods: {
    change(value, index) {
      if(!value.key) return
      this.settings[index] = value
      this.$emit('change', {...this.item, settings: this.settings })
    },
    remove(index) {
      const settings = this.settings.filter((v, i) => i !== index)
      return this.$listeners['change']({...this.item, settings })
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>