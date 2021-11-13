<template>
  <div v-if="!loading" class="row py-5 ">
    <div class="col-2 reports accordion">
      <b-card no-body v-for="({ text, children, key }, index) in menu" :key="key">
        <b-card-header v-b-toggle="key">
          <b-link v-if="!children"
          style="padding: .3rem 1rem;"
          :to="`/${key}`"
          router-tag="div"
          :active="isActive(`/${key}`)">
            {{ text }}
          </b-link>    
          <span v-else>{{ text }}</span>
        </b-card-header>
        <b-collapse :visible="isActive(key) || index === 0" :id="key" accordion="reports">
          <b-card-body v-if="children">
            <b-nav  vertical class="px-0">
              <b-nav-item v-for="({ text, key: url }) in children" :key="url"
              :visible="isActive(`/${url}/${key}`)"
              :to="`/${url}`">
                {{ text }}
              </b-nav-item>
            </b-nav>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <div class="col border">
      <report-view />
    </div>
  </div>
  <preloader v-else/>
</template>

<script>
import { db } from '@/db'
import Node from './Node.vue'
import ReportView from './Report.vue'
import Preloader from './components/Skeleton.vue'

export default {
  components: { Node, Preloader, ReportView },
  name: 'Report',
  data: () => ({
    menu: [],
    loading: false,
  }),

  async created() {
    try {
      this.loading = true
      this.menu = await db(`/report`).get(`/`)
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false
    }
  },
  methods: {
    isActive(url) {
      return this.$route.path.includes(url)
    }
  }
}
</script>

<style scoped>
  .border {
    border: 1px solid rgb(187, 185, 185);
  }
  .reports >>> .router-link-active {
    background-color: rgb(209, 212, 212);
  }

</style>