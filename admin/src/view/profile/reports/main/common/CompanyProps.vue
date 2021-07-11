<template>
  <div>
    <div class="text-center">
      <h6>
        1. Реквизиты некредитной финансовой организации,
        осуществляющей деятельность ломбардов
      </h6>
    </div>
    <div class="row text-center grey">
      <div class="col border flex-center">
        Полное фирменное наименование некредитной финансовой организации,
          осуществляющей деятельность ломбардов
      </div>
      <div class="col border flex-center">
        Регистрационный номер записи некредитной финансовой организации,
          осуществляющей деятельность ломбардов,
           в Государственном реестре кредитных организаций и некредитных финансовых организаций
           Донецкой Народной Республики
      </div>
      <div class="col border flex-center">
        Местонахождение некредитной финансовой организации,
          осуществляющей деятельность ломбардов
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col border"><strong>1</strong></div>
      <div class="col border"><strong>2</strong></div>
      <div class="col border"><strong>3</strong></div>
    </div>
    <div class="row">
      <div class="col flex-center border">{{ value.name || '-' }}</div>
      <div class="col flex-center border">{{ value.idn || '-' }}</div>
      <div class="col flex-center border">{{ addressTostring(value.address) || '-' }}</div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins]
}
</script>

<style>

</style>