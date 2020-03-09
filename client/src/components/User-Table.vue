<template>
    <div class="content mt-3">
        <user-table class="users-table" :items="items"
            :fields="{
                index: {name: '#'},
                name: {name: 'Name'},
                active: {name: 'active'},
                email: {name: 'Email'},
                setup: {icon: 'fas fa-pen'},
                remove: {icon: 'fas fa-trash'}
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
            <template #setup="{item}">
                <div @click="go(item)">
                    <i class="fas fa-pen"></i>
                </div>
            </template> 
            <template #remove="{item}">
                <div @click="remove(item)">
                    <i class="fas fa-trash"></i>
                </div>
            </template> 
            <template #footer_index>
                <div><i class="fas fa-plus-circle"></i></div>
            </template>
            <template #footer_name="{item}">
                <input type="text" :value="item"
                @change="({target}) => save({ name: target.value, index: items.length })">
            </template> 
        </user-table>
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
computed: {
    ...mapGetters('user',['users']),
    items({ users }) {
        return users.sort((a, b) => a.index - b.index)
    }
},
methods: {
    ...mapActions('user', ['save', 'remove', 'update']),
    go({ _id }) {
        this.$router.push(`/user/${_id}`)       
    }
}
}
</script>

<style>

.users-table th.active {
    width: 10px;
}


</style>
