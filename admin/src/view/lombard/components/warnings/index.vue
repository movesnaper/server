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
        <transition name="slide-fade">
          <b-button variant="outlined" v-b-toggle="`info-${item._id}`" :class="['rotate', {down: visible[index]}]">
            <b-icon icon="chevron-down" ></b-icon>
          </b-button>
        </transition>
    </div>
    <b-collapse :id="`info-${item._id}`" v-model="visible[index]">
      <warnings-list :warnings="warnings">
        <template #remove-btn="{selected}">
          <b-button v-if="selected.some((v) => v)"
            class="relative danger py-0"
            variant="link"
            :disabled="loading"
            @click="() => remove(selected)">
            Удалить
            <b-spinner v-if="loading" class="absolute-center"/>
          </b-button>
        </template>
      </warnings-list>
    </b-collapse>
  </div>
</template>

<script>
import mixins from './mixins'
import { db } from '@/db'

export default {
  mixins: [mixins],
  components: { 
    WarningsList: () => import('./List.vue')
  },
  props: ['item', 'index'],
  data: () => ({
    warnings: [],
    loading: false,
    visible: {}
  }),
  created () {
    this.refresh()
  },
  computed: {
    types () {
      return [...new Set(this.warnings.map(this.getVariant))]
    }
  },
  methods: {
    async refresh () {
      try {
        const params = { startkey: [this.item._id] }
        this.warnings = await db('/company').get('/warnings', { params })
      } catch (e) {
        this.$alert(e)
      } finally {
        this.loading = false
      }
    },
    async remove (selected) {
      try {
        this.loading = true
        const data = selected.filter((v) => v)
        await db('/company').remove('/warnings', { data })
        await this.refresh()
      } catch (e) {
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
.rotate{
    -moz-transition: all 0.4s linear;
    -webkit-transition: all 0.4s linear;
    transition: all 0.4s linear;
}
.rotate.down{
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
</style>
