<template>
  <div>
    <div class="row m-0">
      <input type="text" class="form-control col" :placeholder="$t(`user.family`)"
      :value="fio.family" @change="({ target }) => onChange('fio', {...fio, family: target.value})">    
    </div>
    <div class="row m-0 mt-2">
      <div class="col">
        <div class="row">
          <input type="text" class="form-control col-5 mr-1" :placeholder="$t(`user.name`)"
          :value="fio.name" @change="({ target }) => onChange('fio', {...fio, name: target.value})">
          <input type="text" class="form-control col" :placeholder="$t(`user.sername`)"
          :value="fio.sername" @change="({ target }) => onChange('fio', {...fio, sername: target.value })">
        </div>
      </div>
    </div>
    <fields-inputs 
      :fields="fields" 
      :value="user"
      :translate="(v) => $t(`user.${v}`)"
      @change="({ name, value }) => onChange(name, value)"/>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [mix],
  data: () => ({
    fields: [{ name: 'bithday', type: 'date' }, 'email', 'phone']
  }),
  computed: {
    fio({ user }) {
      return user.fio || {}
    }
  }
}
</script>

<style>

</style>