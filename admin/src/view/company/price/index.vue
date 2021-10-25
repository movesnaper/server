<template>
  <div class="price">
        <table class="table">
          <thead >
            <tr>
              <th></th>
              <th>{{ $t('price.key')}}</th>
              <th>{{ $t('price.value')}}</th>
              <th></th>
            </tr>
          </thead>
          <table-row :value="company.price" @change="onChange"/>
        </table>
    </div>
</template>


<script>
import mixins from '../../company/mixins'
import TableRow from './TableRow'

export default {
  components: { TableRow },
  mixins: [mixins],
  data: () => ({
    loading: false
  }),
  methods: {
    async onChange(price) {
      this.loading = true
      await this.save({...this.company, price })
      this.loading = false
      this.update()      
    }
  }
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>