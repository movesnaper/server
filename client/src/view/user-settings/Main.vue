<template>
  <div>
    <div class="row m-0 mt-2">
      <div class="col"><h1>{{ user.name }}</h1></div>
      <div class="col-4">
        <!-- <div class="form-group row"> -->
          <!-- <label class="col">Reset password</label> -->
      <button class="btn btn-primary" :disabled="!user.password"
      @click="() => onChange('password', false)">reset password</button>
        <!-- </div> -->
      </div>
    </div>
    <div class="row m-0">
      <input type="text" class="form-control col" placeholder="family"
      :value="fio.family" @change="({ target }) => onChange('fio', {...fio, family: target.value})">    
    </div>
    <div class="row m-0 mt-2">
      <div class="col">
        <div class="row">
          <input type="text" class="form-control col-5 mr-1" placeholder="name"
          :value="fio.name" @change="({ target }) => onChange('fio', {...fio, name: target.value})">
          <input type="text" class="form-control col" placeholder="sername"
          :value="fio.sername" @change="({ target }) => onChange('fio', {...fio, sername: target.value})">
        </div>
      </div>
    </div>
    <div v-for="item in fields" :key="item" class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >{{ item }}</label>
      <input type="text" class="col form-control" :value="user[item]"
      @change="({ target }) => onChange(item, target.value)">
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >post</label>
      <input type="text" class="col form-control" :value="user.post"
      @change="({ target }) => onChange('post', target.value)">
    </div>
    <div class="form-group row m-0 mt-2">
      <label class="col-sm-4 col-form-label" >roles</label>
      <input type="text" class="col form-control" :value="(user.roles || []).join(', ')"
      @change="({ target }) => onChange('roles', (target.value || '').split(',').map(v => v.trim()))">
    </div>
  </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],
  computed: {
    fields() {
      return ['email', 'phone']
    },
    fio({ user }) {
      return {...user.fio }
    }
  },
  methods: {}
}
</script>

<style>

</style>