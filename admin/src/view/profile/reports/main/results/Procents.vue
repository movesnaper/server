<template>
  <div>
    <div>
        1.2. Задолженность по процентам по предоставленным займам
    </div>
    <div class="text-right">
        <i>тысяч российских рублей</i>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border flex-center center">
        Сумма начисленных процентов по предоставленным займам
      </div>
      <div class="col border">
        <div class="flex-center center">
          Сумма задолженности по процентам по предоставленным займам
           конец отчётного периода:
        </div>
        <div class="row">
          <div class="col flex-center center border">
            общая сумма задолженности по процентам по предоставленным займам
          </div>
          <div class="col flex-center center border">
            сумма задолженности по процентам по предоставленным займам,
             не погашенным в срок, установленный договором займа
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col-4 border"><strong>18</strong></div>
      <div class="col">
        <div class="row">
          <div class="col border"><strong>19</strong></div>
          <div class="col border"><strong>20</strong></div>
        </div>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-4 border">{{ current.procents }}</div>
      <div class="col">
        <div class="row">
          <div class="col border">-</div>
          <div class="col border">-</div>
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