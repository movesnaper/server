<template>
  <div class="table b-table table-sm">
    <table style="width: 100%">
      <thead>
        <tr>
          <th v-for="({ children, value, is = 'span', attrs }, i) in attrs.headers" :key="i"
          :colspan="children ? children.length : 1">
            <component v-if="children" :is="is" v-bind="$attrs" :node="{attrs}" >
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
        <tr v-if="loading">
          <td :colspan="headers.length">
            <preloader />
          </td>
        </tr>
        <tr v-else :class="hovered.row" v-for="(value, i) in values" :key="i">
          <td v-for="(header) in headers" :key="header.key" :class="hovered.cell" >
            <slot name="cell" v-if="value[header.key]" :item="value[header.key]" :header="header" :value="value">
              {{ value[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="footer">
        <tr>
          <td v-for="(header) in headers" :key="header.key" v-bind="footer[header.key]">
            <slot name="footer" v-if="footer[header.key]" :item="footer[header.key]" :header="header" :value="footer">
              {{ footer[header.key].value }}
            </slot>
          </td>          
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { db } from '@/db'

export default {
  components: { 
    DatePicker: () => import('./DatePicker.vue'), 
    Preloader: () => import('./Skeleton.vue'),
    // AccountValue: () => import('./AccountValue.vue'),
  },
  props: ['value', 'node'],
  data: () => ({
    loading: false,
    values: [],
    footer: {}
  }),
  watch: {
    '$route.query': {
      handler (v) {
        const value = JSON.parse(localStorage.getItem('reports') || '{}')
        localStorage.setItem('reports', JSON.stringify({ ...value, [this.$attrs.url]: v }))
        this.refresh()
      },
      immediate: true
    }
  },

  computed: {
    ui () {
      return this
    },

    attrs () {
      return this.node.attrs || {}
    },

    headers () {
      return this.attrs.headers.reduce((cur, v) => {
        const value = v.children || [v]
        return [...cur, ...value]
      }, [])
    },

    hovered () {
      return { [this.attrs.hovered]: 'hovered' }
    }
  },
  methods: {

    async refresh (silent) {
      try {
        if (!silent) this.loading = true
        const params = this.$route.query
        const { values, footer } = await db(this.$attrs.url).get(`/values`, { params })
        this.values = values
        this.footer = footer
      } catch (e) {
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
