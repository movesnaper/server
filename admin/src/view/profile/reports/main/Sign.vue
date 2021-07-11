<template>
  <div>
    <div class="row mt-5">
      <div class="col-3">Руководитель</div>
      <div class="col border-bottom relative">
        <div class="absolute-bottom">
          <i>(фамилия, инициалы)</i>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="row mt-5">
      <div class="col-3">Главный бухгалтер</div>
      <div class="col border-bottom relative">
        <div class="absolute-bottom">
          <i>(фамилия, инициалы)</i>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="row mt-5">
      <div class="col-3">Дата составления</div>
      <div class="col-3 border-bottom"></div>
      <div class="col"></div>
    </div>
    <div class="row mt-5">
      <div class="col-7 border-bottom relative">
        <div class="absolute-bottom">
          <i>(фамилия, имя, отчество работника, составившего отчёт, номер телефона)</i>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.absolute-bottom {
  font-size: 12px;
  position: absolute;
  left: 0;
  bottom: -20px;
  width: 100%;
  text-align: center;
}
</style>