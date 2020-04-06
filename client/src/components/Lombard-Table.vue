<template>
    <div class="content mt-3">
        <mba-table class="lombards-table" :items="model"
            :fields="{
                index: {name: '#'},
                name: {name: 'Name'},
                active: {name: 'active'},
                token: {name: 'token'},
                remove: {icon: 'fas fa-trash'}
            }">
            <template #index="{item}"> {{item.index + 1}}</template> 
            <template #name="{item}"><a href="#" @click="go('lombard',item)">{{ item.name }}</a></template> 
            <template #token="{item}" >
                <input v-if="item.active" type="text" class=" form-control form-control-sm"
                :value="item.token" readonly>
            </template> 
            <template #active="{item}">
                <div class="form-check"><input class="form-check-input ml-0" type="checkbox" 
                :checked="item['active']"
                @change="save({...item, active: !item.active})">
                </div>            
            </template> 
            <template #remove="{item}">
                <div @click="onRemove(item)" style="text-align: center;"><i class="fas fa-trash"></i></div>
            </template> 
            <template #footer_index><div><i class="fas fa-plus-circle"></i></div></template> 
            <template #footer_name="{item}"><input type="text" :value="item"
            @change="({target}) => save({ name: target.value, index: model.length })">
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
        items: 'lombard/lombards'
    })
},
methods: {
    ...mapActions('lombard', ['save', 'remove', 'update'])
}
}
</script>

<style>

.lombards-table th.active {
    width: 10px;
}


</style>
