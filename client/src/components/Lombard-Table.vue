<template>
    <div class="content mt-3">
        <lombard-table class="lombards-table" :items="items"
            :fields="{
                index: {name: '#'},
                name: {name: 'Name'},
                active: {name: 'active'},
                token: {name: 'token'},
                setup: {icon: 'fas fa-pen'},
                remove: {icon: 'fas fa-trash'}
            }">
            <template #index="{item}"> {{item.index + 1}}</template> 
            <template #name="{item}"> {{item.name}}</template> 
            <template #token="{item}" >
                <input v-if="item.active" type="text" class=" form-control form-control-sm"
                :value="item.token" readonly>
            </template> 
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
        </lombard-table>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import LombardTable from '@/widjets/Mba-Table'

export default {
components: { LombardTable },
created() {
    this.update()
},
computed: {
    ...mapGetters('lombard',['lombards']),
    items({ lombards }) {
        return lombards.sort((a, b) => a.index - b.index)
    }
},
methods: {
    ...mapActions('lombard', ['save', 'remove', 'update']),
    go({ _id }) {
        this.$router.push(`/lombard/${_id}`)       
    }
}
}
</script>

<style>

.lombards-table th.active {
    width: 10px;
}


</style>
