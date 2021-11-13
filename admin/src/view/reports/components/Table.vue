<template>
  <preloader v-if="loading"/>
  <div v-else class="table b-table table-sm">
    <table style="width: 100%">
      <thead>
        <tr>
          <th v-for="({ children, value, is = 'span', attrs }, i) in attrs.headers" :key="i"
          :colspan="children ? children.length : 1">
            <component v-if="children" :is="is" :attrs="attrs" >
              {{ value }}
            </component>
          </th>
        </tr>
        <tr>
          <th v-for="({ value = '', style, width }, i) in headers" :key="i" 
          :width="width"
          :style="style">
            {{ value }}
          </th>
        </tr>
      </thead>
      <tbody >            
        <tr :class="hovered.row" v-for="(value, i) in values" :key="i">
          <table-cell v-for="(header) in headers" :key="header.key"
          :header="header" :value="value" :class="hovered.cell">
          </table-cell>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <table-cell v-for="(header) in headers" :key="header.key"
          :header="header" :value="footer"/>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import TableCell from './TableCell.vue'
import DatePicker from './DatePicker.vue'
import Preloader from './Skeleton.vue'
import { db } from '@/db'
export default {
  components: { TableCell, DatePicker, Preloader },
  props: ['value', 'node'],
  data: () => ({
    loading: false,
    values: [],
    footer: {}
  }),
  watch: {
    '$route.query': {
      handler(query) {
      if (Object.keys(query).length)
        this.refresh()
      },
      immediate: true
    }
  },
  computed: {
    attrs() {
      return this.node.attrs || {}
    },
    headers() {
      return this.attrs.headers.reduce((cur, v) => {
        const value = v.children || [v]
        return [...cur, ...value]
      }, [])
    },
    hovered() {
      return { [this.attrs.hovered]: 'hovered' }
    }
  },
  methods: {
    async refresh() {
      const { key, period = '' } = this.$route.params
      const url = key && `/${key}/${period}`
      if(!url) return
      try {
        this.loading = true
        const { values, footer } = await db('/report').get(`${url}/values`, { params: this.$route.query })
        this.values = values
        this.footer = footer
      } catch(e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

  .table >>> tr:hover.hovered, td:hover.hovered {
    cursor: pointer;
    background:rgb(230, 230, 230);
  }
  .table >>> table {
    width: 100%;
  }
  .table >>> thead th {
    border-bottom: none
}
</style>