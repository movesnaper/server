<template>
  <div>
    <div>
        1.1. Задолженность по основному долгу по предоставленным займам
    </div>
    <div class="text-right">
        <i>тысяч российских рублей</i>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border flex-center center">
        Сумма займов, выданных за отчётный период
      </div>
      <div class="col border">
        <div class="flex-center center">
          Сумма задолженности по основному долгу по предоставленным займам на
           конец отчётного периода:
        </div>
        <div class="row">
          <div class="col flex-center center border">
            общая сумма задолженности по основному долгу по предоставленным займам
          </div>
          <div class="col flex-center center border">
            сумма задолженности по основному долгу по предоставленным займам, 
             по предоставленным займам, не погашенным в срок,
              установленный договором займа
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border"><strong>15</strong></div>
      <div class="col">
        <div class="row">
          <div class="col border"><strong>16</strong></div>
          <div class="col border"><strong>17</strong></div>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-4 border">{{ current.ssuda || '-' }}</div>
      <div class="col">
        <div class="row">
          <div class="col border">{{ credits.ssuda || '-'  }}</div>
          <div class="col border">{{ credits.overDate || '-'  }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['values'],
  computed: {
    current() {
      return this.values.current || {}
    },
    credits() {
      return this.values.credits || {}
    },
  }
}
</script>

<style>

</style>