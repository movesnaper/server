<template>
    <div class="content mt-3">
        <user-table class="users-table" :items="users"
            :fields="{
                index: {name: '#'},
                name: {name: 'Name'},
                email: {name: 'Email'},
                active: {name: 'active'},
                setup: {name: ''}
            }">
            <template #index="{item}"> {{item.index + 1}}</template> 
            <template #name="{item}"> {{item.name}}</template> 
            <template #email="{item}">{{item.email}}  </template> 
            <template #active="{item}">
                <div class="form-check">
                    <input class="form-check-input ml-0" type="checkbox" 
                    :checked="item['active']"
                    @change="save({...item, active: !item.active})">
                </div>            
            </template> 
            <template #footer_index>
                <div @click="edit">
                    <i class="fas fa-plus-circle"></i>
                </div>
            </template> 
        </user-table>
        <!-- <modal-row   ref='modal-user'
        :fields="['name', 'email', 'password']"
        @ok="save"/> -->
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UserTable from '@/widjets/Mba-Table'
import ModalRow from '@/widjets/ModalRow'

export default {
components: {UserTable, ModalRow},
created() {
    this.update()
},

data () {
    return {}
},
computed: {
    ...mapGetters('user',['users'])
},
methods: {
    ...mapActions('user', ['save', 'remove', 'update']),
    edit(data) {
        this.$refs['modal-user'].show(data)
    }
}
}
</script>

<style>

.users-table th.active {
    width: 10px;
}


</style>
