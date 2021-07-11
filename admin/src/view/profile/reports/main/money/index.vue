<template>
  <div class="">
    <div class="text-center">
      <h6>
        4. Информация об операциях с денежными средствами
      </h6>
    </div>
    <div class="text-right">
      <i>тысяч российских рублей</i>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border flex-center center">
        Наименование показателя
      </div>
      <div class="col border flex-center center">
        Остаток денежных средств на начало последнего квартала отчётного периода
      </div>
      <div class="col border flex-center center">
        Поступление денежных средств за последний квартал отчётного периода
      </div>
      <div class="col border flex-center center">
        Выбытие денежных средств за последний квартал отчётного периода
      </div>
      <div class="col border flex-center center">
        Остаток денежных средств на конец последнего квартала отчётного периода
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border"><strong>46</strong></div>
      <div class="col border"><strong>47</strong></div>
      <div class="col border"><strong>48</strong></div>
      <div class="col border"><strong>49</strong></div>
      <div class="col border"><strong>50</strong></div>
    </div>    
    <div class="row">
      <div class="col-4 border grey flex-center">
        Наличные денежные средства
      </div>
      <div class="col border center">{{ kassa.start || '-' }}</div>
      <div class="col border center">{{ kassa.dt || '-' }}</div>
      <div class="col border center">{{ kassa.ct || '-' }}</div>
      <div class="col border center">{{ kassa.end || '-' }}</div>
    </div>    
    <div class="row">
      <div class="col-4 border grey flex-center">
        Банковские счета
      </div>
      <div class="col border center">{{ bank.start || '-' }}</div>
      <div class="col border center">{{ bank.dt || '-' }}</div>
      <div class="col border center">{{ bank.ct || '-' }}</div>
      <div class="col border center">{{ bank.end || '-' }}</div>
    </div>
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  mixins: [mixins],
  data: () => ({
    report: 'money'
  }),
  computed: {
    kassa({ value }) {
      return value.kassa || {}
    },
    bank({ value }) {
      return value.bank || {}
    }
  }
}
</script>

<style>

</style>