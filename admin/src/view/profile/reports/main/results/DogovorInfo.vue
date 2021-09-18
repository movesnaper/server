<template>
  <div>
    <div> 1.4. Информация о договорах займа </div>
    <div class="row text-center grey">
      <div class="col border">
        <div class="flex-center center">
          Количество договогов займа, по которым на конец отчётного периода
          обязательства не погашены или заложенные вещи не прданы, шт.
        </div>
        <div class="row">
          <div class="col flex-center center border">
            общее количество договогов займа, по которым на конец отчётного периода
            обязательства не погашены или заложенные вещи не прданы
          </div>
          <div class="col flex-center center border">
            количество договогов займа, обязательства по которым не погашены
            в установленный срок и которые находятся на льготном месячном сроке
          </div>
          <div class="col flex-center center border">
            количество договогов займа, по которым истёк льготный месячный срок,
            но обязательства по ним не погашены или заложенное имущество ещё не продано
          </div>
        </div>
      </div>
      <div class="col-2 border flex-center center">
        Количество заёмщиков на конец отчётного периода, чел.
      </div>
      <div class="col-2 border flex-center center">
        Количество договогов займа, заключённых за отчётный период, шт.
      </div>
    </div>
    <div class="row text-center grey">
      <div class="col">
        <div class="row">
          <div class="col border"><strong>25</strong></div>
          <div class="col border"><strong>26</strong></div>
          <div class="col border"><strong>27</strong></div>
        </div>
      </div>
      <div class="col-2 border"><strong>28</strong></div>
      <div class="col-2 border"><strong>29</strong></div>
    </div>
    <div class="row text-center">
      <div class="col">
        <div class="row">
          <div class="col border">{{ credits.count }}</div>
          <div class="col border">{{ credits.countBefore }}</div>
          <div class="col border">{{ credits.countAfter }}</div>
        </div>
      </div>
      <div class="col-2 border">{{ credits.klients }}</div>
      <div class="col-2 border">{{ current.count }}</div>
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