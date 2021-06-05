<template>
  <div>
    <div class="form-group">
      <input type="text" class="form-control"
      placeholder="Name"
        v-model="value.name"/>
        <p class="error" v-if="err.name">{{ t('err', err.name) }}</p>
    </div>    
    <div class="form-group">
      <input type="password" class="form-control" 
        placeholder="Password"
        v-model="value.password"/>
        <p class="error" v-if="err.password">{{ t('err', err.password) }}</p>
    </div>
    <div class="form-group flex-end">
      <button class="btn btn-primary relative" 
      @click="$emit('login', value)" 
      :disabled="loading || disabled">
        <b-spinner v-if="loading" class="absolute-center"/>
        {{ t('login') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['err', 'loading'],
  data: () => ({
    value: {}
  }),
  computed: {
    disabled({ value }) {
      return ['name', 'password'].some((name) => !value[name])
    }
  },
  methods: {
    t(...params) {
      return this.$t(`auth.${params.join('.')}`)
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>