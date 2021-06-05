<template>
<div>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb m-0">
    <!-- <li class="breadcrumb-item"><a href="/home">Home</a></li> -->
    <li class="breadcrumb-item"><a href="#" @click="$router.push('/users')">{{ route }}</a></li>
    <li class="breadcrumb-item active" aria-current="page">{{ $route.meta.current }}</li>
  </ol>
</nav>
<div class="row m-0">    
    <div class="accordion col-3 p-0" id="menu">
    <div  v-for="(item) in Object.keys(menu)" :key="item">
        <div class="card border-0">
            <div class="card-header row m-0 p-2" :id="`header${item}`">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="`#${item}`" aria-expanded="true" :aria-controls="item"
                @click="onClick(item)">
                {{ item }}
                </button>
            </h2>
            </div>
            <div :id="item" :class="['collapse', { show: opened.includes(item)}]" :aria-labelledby="`header${item}`" :data-parent="`#${menu}`">
            <div class="card-body p-0">
              <ul class="list-group-flush mb-0">
                  <li v-for="(subItem) in menu[item]" :key="subItem"
                  :class="['list-group-item', { active: $route.path.includes(`${item}/${subItem}`) }]"
                  @click="go(item, subItem)">{{ subItem }}</li>
              </ul>
            </div>
            </div>
        </div>
    </div>

</div>
  <div class="col mt-4 pr-2">
    <router-view></router-view>
  </div>
</div>
</div>   
</template>

<script>
import { mapActions } from 'vuex'
export default {
created() {
  this.update()
  this.opened = Object.keys(this.menu)
    .filter(v => this.$route.meta.current === v)
},
data() {
  return {
    opened : []
  }
},
computed: {
  route() {
      return this.$route.params.id
  },
  menu() {
    return {
      settings: ['main', 'passport']
    }
  } 
},
methods: {
  ...mapActions({
      update: 'user/update'
  }),
  includes(value) {
    const { opened, path } = this
    return opened.some(v => v === value) || path.includes(value)
  },
  go(item, subItem) {
    const { id } = this.$route.params
    const path = `${item}/${subItem}`
    return this.$router.push(`/user/${id}/${path}`)
  },
  onClick(item) {
    const open = this.opened.includes(item)
    this.opened = open ? this.opened.filter(v => v !== item)
      : [...this.opened, item] 
  }
}
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-end;
  background-color: initial;
}
#menu .collapse li:hover {
  cursor: pointer;
  text-decoration: underline;
}
.add {
  background: #80808024;
}
.add input {
  background-color: transparent;
}
</style>
