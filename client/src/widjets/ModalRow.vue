<template>
 <b-modal class="modal-row" 
    v-model="showModal"
    :title="title"
    :ok-disabled="!notEqual"
    @ok="$emit('ok', row)">
    <div class="mb-3" v-for="(name, index) in fields" :key="index">
        <input  class='form-control' 
         :placeholder="name"   
        v-model="row[name]">
    </div>

</b-modal>    
</template>

<script>
export default {
props: {
    fields: Array,
    title: {
        type: String,
        default: ''
    }
},
data () {
    return {
        row: {},
        old: false,
        showModal: false
    }
},
computed: {
    notEqual() {
        // console.log([...this.fields])
        return this.fields.some( name => {
            const old = this.old[name] || ''
            const row= this.row[name] || ''
            return row !== old
        })
    }
},

methods: {
    show(data){
        this.old = {...data}
        this.row = {...data}
        this.showModal = true
    }
},

}
</script>

<style>

</style>
