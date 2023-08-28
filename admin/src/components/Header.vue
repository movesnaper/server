<template>

    <b-navbar-nav >
      <component v-for="({ key, value, children }) in menu" :key="key"
        :is="!children ? 'b-nav-item' : 'b-nav-item-dropdown'"
        right
        text="value"
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
</template>

<script>
const { db } = require('@/db')

export default {
  data: () => ({
    loading: false,
    menu: null
  }),
  async created() {
      const { value } = await db('/schema').get('/menu') || {}
      this.menu = value
      const routes = this.menu.map((v) => {
        return {
          name: v.key,
          path: `/${v.key}/:id?`, 
          component: () => import('@/view'),
          beforeEnter: (to, from, next) => {
            !localStorage.getItem('jwt') ? next('/') : next()
          }
        }
      })
      this.$router.addRoutes(routes)
  },
}
</script>

<style>

</style>
