<template>
  <div class="content p-5">
    <mba-table v-if="!loading" class="users-table" :items="items"
        :fields="{
        index: {name: '#', width: '10px'},
        name: {name: $t('users.name')},
        roles: {name: $t('users.roles')},
        active: {width: '10px'},
        reset: {width: '15%'},
        remove: {width: '10px'}
        }">
        <template #index="{item}">{{item.index + 1}}</template> 
        <template #name="{item}">
          <a href="#" @click="go('user',item)">{{ item.name }}</a>
        </template> 
        <template #roles="{item}">
          <b-input type="text"
          :value="(item.roles || []).join(', ')"
          @change="(v) => save({...item, roles: v.split(',').map(v => v.trim())})"/>
        </template> 
        <template #reset="{item}">
          <div class="center">
            <b-button variant="outline-primary"
            :disabled="!item.active || !item.password"
            @click="() => resetPassword(item)">{{ $t(`users.reset_password`)}}</b-button>          
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
        @change="({target}) => save({ name: target.value, index: items.length })">
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
  computed: {
    ...mapGetters({
      items: 'user/users'
    }),
  },
  methods: {
    ...mapActions('user', [ 'save', 'remove', 'update' ]),
    async resetPassword(v) {
      const dialog = await this.confirm(v, this.$t(`users.reset_password`))
      await this.save({...v, password: undefined })
      dialog.close()
    },
    async onRemove(v) {
      const dialog = await this.confirm(v, this.$t(`users.remove`))
      await this.remove(v)
      dialog.close()
    }
  }
}
</script>

<style>

</style>
