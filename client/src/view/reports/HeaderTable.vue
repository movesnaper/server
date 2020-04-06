<template>
    <div>
        <div class="row mb-2">
            <div class="col"><strong>{{ value.h1 }}</strong></div>
            <div class="col"><strong>{{ value.h2 }}</strong></div>
        </div>
        <div class="row mb-2" >
            <div class="col" style="text-align: center;"><h5>{{ value.h3 }}</h5></div>
        </div>
        <div class="p-3" style="font-size: 18px;"> <!-- header table -->
            <div class="row border">
                <div class="col border-right">{{ t('name fin company') }}</div>
                <div class="col">{{ logo }}</div>
            </div>
            <div class="row border" style="border-top: 0 !important;">
                <div class="col border-right">{{ t('cod fin company') }}</div>
                <div class="col" style="text-align: center;">{{ finCod }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import mix from './mix'
export default {
  mixins: [ mix ],

}
</script>

<style>

</style>