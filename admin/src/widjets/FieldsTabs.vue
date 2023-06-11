<template>
  <div class="m-5">
    <b-card v-if="!loading" no-body>
      <b-tabs v-model="active" small card class="component-tabs">
        <b-tab v-for="(tab) in schema.tabs" :key="tab.key" 
        :title="tab.title || tab.key">
          <slot v-if="$slots[tab.key]" :name="tab.key"></slot>
          <fields-inputs v-else
            v-for="(field) in tab.schema || schema[tab.key]" :key="field.key"
            :schema="field.map ? field : [field]"
            :fieldKey="field.key"
            :value="value[tab.key]"
            @input="(v) => setValue(tab.key, v)"
            @change="() => $emit('change', tab.key)"/>            
        </b-tab>
      </b-tabs>
    </b-card>
    <div v-else>
      <b-skeleton-table
      :rows="5"
      :columns="4"
      :table-props="{ bordered: true, striped: true }"
      ></b-skeleton-table>
    </div>
  </div>
</template>

<script>


export default {
  name: 'FieldsTabs',
  props: ['loading', 'value', 'schema'],
  components: {
    FieldsInputs: () => import('./FieldsInputs.vue')
  },
  data: () => ({
    active: 0
  }),
  methods: {
    setValue(tabKey, [key, value]) {
      this.value[tabKey] = {...this.value[tabKey], [key]: value}
    }
  }
}
</script>

<style scoped>
  .component-tabs {
    border: 1px solid #00000029;
  }
</style>
