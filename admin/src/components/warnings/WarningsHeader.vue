<template>
  <div>
    <div class="row m-0 flex-center">
      <div class="col">
        <b-button variant="link" :to="`lombard/${item._id}`">{{ item.name }}</b-button>
      </div>
      <b-button variant="outline" v-for="(key) in types" :key="key">
        <b-badge :variant="variants[key]">
          {{ warnings.filter((v) => v[key]).length }}
        </b-badge>
      </b-button>
      <slot></slot>
    </div>
    <b-collapse :id="`info-${item._id}`">
      <warnings-list :warnings="warnings">
        <template #remove-btn="{selected}">
          <transition name="fade_warning_remove_btn">
            <b-button v-if="selected.some((v) => v)"
              class="relative danger py-0"
              variant="link"
              :disabled="loading"
              @click="() => remove(selected)">
              Удалить
              <b-spinner v-if="loading" class="absolute-center"/>
            </b-button>
          </transition>        
        </template>
      </warnings-list>
    </b-collapse>
  </div>
</template>

<script>
import mixins from './mixins'
import WarningsList from './WarningsList.vue'
import { db } from '@/db'

export default {
  mixins: [mixins],
  components: {WarningsList},
  props: ['item'],
  data: () => ({
    warnings: [],
    loading: false
  }),
  created() {
    this.refresh()
  },
  computed: {
    types() {
      return [...new Set(this.warnings.map(this.getVariant))]
    }
  },
  methods: {
    async refresh() {
      try {
        const params = { key: this.item._id }
        this.warnings = await db('/lombards').get('/warnings', { params })
      } catch(e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async remove(selected) {
      try {
        const data = selected.filter((v) => v)
        await db('/lombards').remove('/warnings', { data })
        this.refresh()
      } catch(e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
  .fade_warning_remove_btn-enter-active, .fade_warning_remove_btn-leave-active {
    transition: opacity 1s;
  }
  .fade_warning_remove_btn-enter, .fade_warning_remove_btn-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
</style>