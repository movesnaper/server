<template>
  <div class="">
    <div class="text-center">
      <h6> 5. Балансовые показатели </h6>
    </div>
    <div class="text-right">
      <i>тысяч российских рублей</i>
    </div>
    <div class="row text-center grey">
      <div class="col-1 border flex-center center">
        Номер строки
      </div>
      <div class="col border flex-center center">
        Наименование показателя
      </div>
      <div class="col-2 border flex-center center">
        Значение показателя
      </div>

    </div>
    <div class="row text-center grey">
      <div class="col-1 border"><strong>1</strong></div>
      <div class="col border"><strong>2</strong></div>
      <div class="col-2 border"><strong>3</strong></div>
    </div>    
    <div class="row" v-for="({ number, name, value, is = 'span' }, i) in items" :key="i">
      <div class="col-1 border grey flex-center">
        <component :is="is">{{ number }}</component>
      </div>
      <div class="col border grey">
        <component :is="is">{{ name }}</component>
      </div>
      <div class="col-2 border center">
        <component :is="is">{{ value }}</component>
      </div>
    </div>     
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  mixins: [mixins],
  data: () => ({
   report: 'balance',
   items: [
     { number: '1', is: 'strong', name: 'Активы, в том числе:' },
     { number: '1.1', name: 'финансовые вложения (задолжность по предоставленным займам)' },
     { number: '1.1.1', name: 'задолженность по основному долгу' },
     { number: '1.1.2', name: 'задолженность по процентам' },
     { number: '1.2', name: 'дебиторская задолженность' },
     { number: '1.3', name: 'запасы' },
     { number: '1.4', name: 'основные средства' },
     { number: '1.5', name: 'денежные средства, в том числе:' },
     { number: '1.5.1', name: 'на банковских счетах' },
     { number: '1.5.2', name: 'в кассе' },
     { number: '1.6', name: 'прочие активы' },
     { number: '2', is: 'strong', name: 'Капитал, в том числе:' },
     { number: '2.1', name: 'уставной капитал' },
     { number: '2.2', name: 'резервный капитал' },
     { number: '2.3', name: 'добавочный капитал' },
     { number: '2.4', name: 'нераспределённая прибыль (непокрытый убыток)' },
     { number: '2.5', name: 'прочие составляющие капитала' },
     { number: '3', is: 'strong', name: 'Обязательства, в том числе:' },
     { number: '3.1', name: 'кредиторская задолженность ломбарда' },
     { number: '3.2', name: 'прочие обязательства' }
   ]
  })

}
</script>

<style>

</style>