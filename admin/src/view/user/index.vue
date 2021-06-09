<template>
  <div class="p-5">
    <b-card v-if="!loading" no-body class="user">
      <b-tabs v-model="active" small card class="user_tabs">
        <b-tab v-for="(item, i) in tabs" :key="i" :title="$t(`user.menu.${item}`)">
          <component class="p-3" :is="`component-${item}`" :user="user"/>
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
import { mapActions, mapGetters } from 'vuex'
import ComponentUser from './User'
import ComponentPassport from './Passport'
import ComponentAddress from './Address'

export default {
  components: { ComponentUser, ComponentPassport, ComponentAddress },
  data() {
    return {
      active: 0,
      loading: false,
      tabs: ['user', 'passport', 'address']
    }
  },
  async created() {
    this.loading = true
    await this.update()
    this.loading = false
  },
  computed: {
    ...mapGetters({
      map: 'user/map'
    }),
    user({ map }) {
      const id = this.$route.params.id
      return {...map[id]}
    }
  },
  methods: {
    ...mapActions({
      update: 'user/update'
    })
  }
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-end;
  background-color: initial;
}
#menu .collapse li:hover {
  cursor: pointer;
  text-decoration: underline;
}
.add {
  background: #80808024;
}
.add input {
  background-color: transparent;
}
</style>
