<template>
    <div class="content mt-3">
        <lombard-table class="lombards-table" :items="lombards"
            :fields="{
                index: {name: '#'},
                name: {name: 'Name'},
                token: {name: 'token'},
                active: {name: 'active'},
            }"
            :actions="{
                edit: {icon: 'fas fa-pen'},
                remove: {icon: 'fas fa-trash'}
            }"
            @remove="remove"
            @edit="edit">
            <template #index="{item}"> {{item.index + 1}}</template> 
            <template #name="{item}"> {{item.name}}</template> 
            <template #token="{item}" >
                <input type="text" class=" form-control form-control-sm"
                @contextmenu="$event.stopPropagation()"
                :value="item.token" 
                @focus="$event.target.select()"
                readonly>
            </template> 
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
        </lombard-table>
        <modal-row   ref='modal-lombard' :fields="['name']"
         @ok="save"/>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import LombardTable from '@/widjets/Mba-Table'
import ModalRow from '@/widjets/ModalRow'

export default {
components: {LombardTable, ModalRow},
created() {
    this.update()
},
data () {
    return {
        row: {}
    }
},
computed: {
    ...mapGetters('lombard',['lombards'])
},
methods: {
    ...mapActions('lombard', ['save', 'remove', 'update']),
    edit(data) {
        this.$refs['modal-lombard'].show(data || {})
    }
}
}
</script>

<style>

.lombards-table th.active {
    width: 10px;
}


</style>
