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
          <table-row/>
        </table>
    </div>
</template>


<script>

import TableRow from './TableRow'

export default {
  components: { TableRow }
}
</script>

<style scoped>
  .tab >>> .nav-link.active{
    background-color: initial;
    color: #007bff !important;
  }
</style>