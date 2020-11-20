<template>
<div class="profile">
    <lombard-table></lombard-table>
    <user-table></user-table>
    <!-- <version-table></version-table> -->
</div>
    
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'
// import VersionTable from '@/components/VersionTable'
import LombardTable from '@/components/Lombard-Table'
import UserTable from '@/components/User-Table'
export default {
components: { LombardTable, UserTable },
created() {},
computed: {
    // ...mapGetters(['company', 'isAuth'])
    
},
methods: {}
}
</script>

<style>

</style>
