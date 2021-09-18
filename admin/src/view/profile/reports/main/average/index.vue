<template>
  <div>
    <div class="text-center">
      <h6>
        3. Средневзвешенные значения полной стоимости займов некредитной
        финансовой организации, осуществляющей деятельность ломбардов
      </h6>
    </div>
    <div class="row text-center grey">
      <div class="col-1 border flex-center center">
        Номер строки
      </div>
      <div class="col-3 border flex-center center">
        Категории замов
      </div>
      <div class="col border flex-center center">
        Средневзвешенное значение полной стоимости замов (в процентах)
      </div>
      <div class="col border flex-center center">
        Общая сумма предоставленных займов за последний квартал
        отчётного периода, тысяч российских рублей
      </div>
      <div class="col border flex-center center">
          Количество договоров займов, заключённых за последнийй квартал
        отчётного периода, шт.
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col-1 border"><strong>41</strong></div>
      <div class="col-3 border"><strong>42</strong></div>
      <div class="col border"><strong>43</strong></div>
      <div class="col border"><strong>44</strong></div>
      <div class="col border"><strong>45</strong></div>
    </div>    
    <div class="row">
      <div class="col-1 border grey center flex-center">1</div>
      <div class="col-3 border grey">
        Займы с обеспечением в виде залога лома и изделий из драгоценных
        металлов и драгоценных камней
      </div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">{{ gold.summ }}</div>
      <div class="col border center flex-center">{{ gold.count }}</div>
    </div>    
    <div class="row">
      <div class="col-1 border grey center flex-center">2</div>
      <div class="col-3 border grey">
        Займы с обеспечением в виде залога транспортного средства
      </div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">-</div>
    </div>    
    <div class="row">
      <div class="col-1 border grey center flex-center">3</div>
      <div class="col-3 border grey">
        Займы с обеспечением в виде залога бытовой техники
      </div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">{{ things.summ }}</div>
      <div class="col border center flex-center">{{ things.count }}</div>
    </div>    
    <div class="row">
      <div class="col-1 border grey center flex-center">4</div>
      <div class="col-3 border grey">
        Займы с обеспечением в виде залога иного имущества
      </div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">-</div>
      <div class="col border center flex-center">-</div>
    </div>    
  </div>
</template>

<script>
import mixins from '../mixins'

export default {
  props: ['values'],
  computed: {
    current() {
      return this.values.current || {}
    },
    gold({ current }) {
      return current.gold || {}
    },
    things({ current }) {
      return current.things || {}
    }
  }
}
</script>

<style>

</style>