<template>
    <div class="content mt-3">
        <mba-table class="users-table" :items="items"
            :fields="{
            index: {name: '#'},
            name: {name: 'Name'},
            active: {name: 'active'},
            email: {name: 'Email'},
            remove: {icon: 'fas fa-trash'}
            }">
            <template #index="{item}"> {{item.index + 1}}</template> 
            <template #name="{item}"><a href="#" @click="go('user',item)">{{ item.name }}</a></template> 
            <template #email="{item}">{{item.email}}  </template> 
            <template #active="{item}">
                <div class="form-check"><input class="form-check-input ml-0" type="checkbox" 
                :checked="item['active']" @change="save({...item, active: !item.active})">
                </div>            
            </template>
            <template #setup="{item}">
                <div @click="go(item)"><i class="fas fa-pen"></i></div>
            </template> 
            <template #remove="{item}">
                <div @click="onRemove(item)" style="text-align: center;"><i class="fas fa-trash"></i> </div>
            </template> 
            <template #footer_index>
                <div><i class="fas fa-plus-circle"></i></div>
            </template>
            <template #footer_name="{item}"><input type="text" :value="item"
            @change="({target}) => save({ name: target.value, index: items.length })">
            </template> 
        </mba-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mix from './mix'

export default {
    mixins: [mix],
    computed: {
        ...mapGetters({
            items: 'user/users'
        }),
    },
    methods: {
        ...mapActions('user', ['save', 'remove', 'update']),
    }
}
</script>

<style>

.users-table th.active {
    width: 10px;
}


</style>
