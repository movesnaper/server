<template>
  <div class="content m-5">
    <data-table v-if="!loading" :items="data" :fields="schema">
        <template #index="{index}">
          <div class="col">{{index + 1}}</div>
        </template>
        <template #name="{item}">
          <b-button variant="link" :to="`${url}/${item._id}`">{{ item._id }}</b-button>
        </template>
        <template #active="{item}">
          <div class="col">
            <b-form-checkbox :checked="item['active']"
            @change="activate(item)"/>
          </div>
        </template>
        <template #remove="{item}">
          <b-button  variant="outline">
            <b-icon icon="trash" @click="remove(item)" variant="danger"/>
          </b-button>
        </template>
        <template #footer>
          <td>
            <b-icon icon="plus-circle" variant="success" />
          </td>
          <td>
            <form-input :action="add"/>
          </td>
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
import lombards from '../lombards/index.vue'

export default {
  mixins: [lombards],
  data: () => ({
    schema: [
      { key: 'index', value: '', width: '10%'},
      { key: 'name', value: 'Логин'},
      { key: 'active', value: '', width: '10%'},
      { key: 'remove', value: '', width: '10%'},
    ],
  }),

}
</script>

<style scoped>

</style>
