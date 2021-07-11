<template>
  <div class="">
    <div class="text-center">
      <h6>
        6. Информация о ломе и изделиях из драгоценных металлов
        и драгоценных камней, прнятых некредитной финансовой организацией,
        осуществляющей деятельность ломбардов, в залог
      </h6>
    </div>
    <div class="text-right"><i>тысяч российских рублей</i></div>
    <div class="row border text-center grey">
      Сумма оценки лома и изделий из драгоценных металлов
        и драгоценных камней, прнятых некредитной финансовой организацией,
        осуществляющей деятельность ломбардов, в залог по договорам займа,
        на конец отчётного периода 
    </div>
    <div class="row text-center grey">
      <div class="col border flex-center center">
        общая сумма
      </div>
      <div class="col border flex-center center">
        по договорам зама, обязательства по которым не погашены
        в установленный срок и которые находятся на льготном месячном сроке
      </div>
      <div class="col border flex-center center">
        по договорам зама, по которым истёк льготный месячный срок,
        но обязательства по ним не погашены или имущество ещё не продано
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col border"><strong>1</strong></div>
      <div class="col border"><strong>2</strong></div>
      <div class="col border"><strong>3</strong></div>
    </div>
    <report-sign class="mt-3"/>
  </div>
</template>

<script>
import ReportSign from '../Sign.vue'

export default {
  components: { ReportSign },


}
</script>

<style>

</style>