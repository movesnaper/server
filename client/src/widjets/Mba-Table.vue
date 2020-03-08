<template>
        <div class="mba-table">
        <table class="table table-sm">
        <thead >
            <tr>
                <th v-for="({name}, key) in fields" :key="key"
                 :class="key">{{name}}
                </th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(item, index) in items"  :key="index"
                :class="{active: active === index}">
            <td v-for="({name}, key) in fields"  :key="key" :class="key">
                <slot  :name="key" :item="{...item, index}"></slot>
            </td>
            </tr>
            <tr class="footer">
            <td v-for="(name, key) in fields" :key="key" :class="key">
                <slot  :name="'footer_' + key"/>
            </td>                
            </tr>
    

        </tbody>
        </table> 
    </div>
</template>

<script>
export default {
    props: {
        fields: Object,
        items: Array,
    },
    data () {
        return {
            active: false,
        }
    },

methods: {
    // context(evt, data) {
    //     this.active = data.index
    //     this.$refs.menu.open(evt, data)
    // },
    emit(name, data) {
        this.active = false
        this.$emit(name, data)
    }
}
}
</script>

<style>
  .mba-table .table  thead th {
    border-bottom: none;
  }
  .mba-table .table   tr {
    border-bottom: 1px solid #0000001f;
  }
  .mba-table .table td,   .mba-table .table th {
    border-top: none;
        border-right: 1px solid #00000033;
  }
    .mba-table table{
        border: 1px solid rgba(0, 0, 0, 0.22);
    }
    tr.active{
            background-color: #0000001a;
    }
    .mba-table .index {
        text-align: center;
        width: 10px;
    }

    .vue-context li:hover {
        background-color: #0000000a;
    }
    .vue-context li {
        padding-left: 10px;
        list-style: none;
        cursor: pointer;
    }
    .vue-context i {
        float: right;
        line-height: inherit;
        padding-right: 10px;
    }
</style>
