<template>
  <b-navbar type="dark" variant="info" class="px-5" fixed="top">
      <b-navbar-brand style="cursor: pointer" to="/">PShop</b-navbar-brand>
    <b-navbar-nav >
      <component v-for="({ key, value, children }) in schema" :key="key"
        :is="!children ? 'b-nav-item' : 'b-nav-item-dropdown'"
        right
        :text="value"
        active-class="active"
        :to="`/${key}`">
        <span v-if="!children">{{ value}}</span>
        <template v-else>
          <b-dropdown-item v-for="({key: sub, value}) in children" :key="sub" 
          :to="`/${key}/${sub}`"
          >{{ value }}</b-dropdown-item>
        </template>
       </component>
    </b-navbar-nav>
    <b-navbar-nav  class="ml-auto">
      <b-nav-item-dropdown v-if="user" :text="user" right>
      <b-link class="dropdown-item" :disabled="loading" @click="logout">
        <b-spinner v-if="loading" class="absolute-center"/>
        Выйти
      </b-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
const { db } = require('@/db')

export default {
  data: () => ({
    loading: false,
    user: '',
    schema: null
  }),
  watch: {
    $route: {
      handler () {
        if (!this.schema) this.init()
      },
      immediate: true
    }
  },

  methods: {
    async init() {
      this.schema = await db('/company').get('/schema', { params: { key: 'menu' } })
      this.user = localStorage.getItem('login')
      const routes = this.schema && this.schema.map((v) => {
        return {
          name: v.key,
          path: `/${v.key}/:id?`, 
          component: () => import('@/view')
        }
      })
      if(routes) this.$router.addRoutes(routes)
    },

    async update () {
      try {
        this.schema = await db('/company').get('/schema', { params: { key: 'menu' } })
        this.user = localStorage.getItem('login')
      } catch (e) {
        this.$alert(e)
      }
    },

    async logout () {
      this.loading = true
      await db('/auth').post('/logout')
      localStorage.removeItem('login')
      this.reload()
    },

    reload() {
      window.location.reload()
    }
  }
}
</script>

<style>

</style>
