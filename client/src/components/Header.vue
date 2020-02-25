<template>
<b-navbar  type="dark" variant="info">
    <b-navbar-brand  href="#">{{logo}}</b-navbar-brand>

    <b-navbar-nav class="ml-auto"> 
        <b-nav-item-dropdown :text="company.email" right>
        <!-- <b-link class="dropdown-item" @click="logout">{{company.conn}}</b-link> -->
        <b-link class="dropdown-item" @click="logout">logout</b-link>
        <b-link class="dropdown-item" @click="edit(company)">edit</b-link>
        </b-nav-item-dropdown>
        <modal-row   ref='modal-edit-user' :fields="['name', 'conn']" @ok="save"/>
    </b-navbar-nav>

</b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import ModalRow from '@/widjets/ModalRow'
// import UserProfile from '@/components/User-Profile'
export default {
components: {ModalRow},
computed: {
    ...mapGetters(['company', 'logo', 'isAuth'])
},
methods: {
    ...mapActions(['logout', 'save']),
    edit(data) {
        this.$refs['modal-edit-user'].show(data)
    }
}
}
</script>

<style>

</style>
