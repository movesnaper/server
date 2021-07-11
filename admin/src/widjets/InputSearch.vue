<template>
  <b-input-group size="sm">
      <b-input-group-prepend>
        <b-button size="sm" variant="outline-secondary" disabled>
          <b-icon icon="search" variant="secondary"/>
        </b-button>
      </b-input-group-prepend>
    <b-form-input type="search" variant="secondary" v-on="$listeners" v-bind="$attrs"/>
  </b-input-group>
</template>

<script>

export default {

}
</script>

<style>

</style>