<template>
  <div class="m-5">
    <b-card no-body>
      <b-nav tabs class="nav-item">
        <b-nav-item v-for="(tab) in schema.tabs" :key="tab.key"
        :to="`#${tab.key}`" 
        :active="$route.hash === `#${tab.key}`">
          {{ tab.title || tab.key }}
        </b-nav-item>
      </b-nav>
      <div class="tab-content" v-if="!loading">
        <div v-for="(tab) in schema.tabs" :key="tab.key"
        :class="['tab-pane', 'p-2', { 'active': $route.hash === `#${tab.key}` }]">
          <slot v-if="$slots[tab.key]" :name="tab.key"></slot>
          <fields-inputs v-else v-for="(field) in tab.schema || schema[tab.key]" :key="field.key"
            :schema="field.map ? field : [field]"
            :fieldKey="field.key"
            :value="value"
            @input="setValue"
            @change="() => $emit('change', tab.key)"/>             
        </div>
      </div>
        <b-skeleton-table v-else
        :rows="5"
        :columns="4"
        :table-props="{ bordered: true, striped: true }"
        />
    </b-card>
  </div>
</template>

<script>


export default {
  name: 'FieldsTabs',
  props: ['loading', 'value', 'schema'],
  components: {
    FieldsInputs: () => import('./FieldsInputs.vue')
  },

  methods: {
    setValue([key, value]) {
      this.value[key] = value
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped>
  .nav-item {
    background-color: rgba(0,0,0,.03);
  }
  .tab-content {
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;

  }
</style>
