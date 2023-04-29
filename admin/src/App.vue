<template>
  <div id="app" >
    <div class="">
      <header-menu :loading="loading" :menu="menu"/>
      <router-view class="pt-5" />
    </div>
  </div>
</template>

<script>
const { db } = require('@/db')

export default {
  name: 'App',
  components: { 
    HeaderMenu: () => import('@/components/Header') 
  },
  data: () => ({
    loading: false,
    menu: null
  }),
  watch: {
    $route: {
      handler () {
        !!this.menu & this.init()
      },
      immediate: true
    }
  },
  methods: {
    async init() {
      const { value } = await db('/schema').get('/menu')
      this.menu = value
      const routes = this.menu.map((v) => {
        return {
          name: v.key,
          path: `/${v.key}/:id?`, 
          component: () => import('@/view')
        }
      })
      this.$router.addRoutes(routes)
    },
  }
}
</script>

<style src="./style.css">

@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

</style>
