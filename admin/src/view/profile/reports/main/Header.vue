<template>
  <div>
    <div class="text-center">
      <h4>{{$t(`reports.company.title`)}}</h4>
    </div>
    <div class="text-center mt-4">
      по состоянию на
      <span class="border-bottom px-5">{{ title }}</span>
    </div>
    <div class="text-right">
      Код формы 0201
    </div>
    <div class="text-right">
      Квартальная
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>

</style>