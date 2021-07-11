<template>
  <div>
    <div class="text-center">
      <h6>
        2. Сведения о банковских счетах некредитной финансовой организации,
          осуществляющей деятельность ломбардов
      </h6>
    </div>
    <div class="row text-center grey">
      <div class="col-1 border flex-center overflow-wrap">
        Порядковый номер
      </div>
      <div class="col border flex-center">
        Полное фирменное наименование некредитной финансовой организации
      </div>
      <div class="col border flex-center">
        Местонахождение кредитной финансовой организации
      </div>
      <div class="col border flex-center">
        Регистрационный номер записи кредитной организации,
           в Государственном реестре кредитных организаций и некредитных финансовых организаций
           Донецкой Народной Республики
      </div>
      <div class="col border flex-center">
        Номер счёта
      </div>
      <div class="col border flex-center">
        Дата открытия счёта
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col-1 border"><strong>4</strong></div>
      <div class="col border"><strong>5</strong></div>
      <div class="col border"><strong>6</strong></div>
      <div class="col border"><strong>7</strong></div>
      <div class="col border"><strong>8</strong></div>
      <div class="col border"><strong>9</strong></div>
    </div>
    <div class="row" v-for="({bank, address, number, date}, i) in items" :key="i">
      <div class="col-1 flex-center center border">{{ i + 1 }}</div>
      <div class="col flex-center border">{{ bank.name || '-' }}</div>
      <div class="col flex-center border">{{ addressTostring(address) || '-' }}</div>
      <div class="col flex-center border">{{ bank.idn || '-' }}</div>
      <div class="col flex-center border">{{ number || '-' }}</div>
      <div class="col flex-center border">{{ moment(date).format('L') || '-' }}</div>
    </div>
  </div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  computed: {
    items({ value }) {
      return value.bank || []
    }
  }
}
</script>

<style>

</style>