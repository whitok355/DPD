<template>
  <div class="wrapper">
    <div class="main container">
      <search class="search" @reboot="reboot" />
      <tableEl :key="pos" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import search from "comp/search.vue";
import tableEl from "comp/table.vue";

const pos = ref(0);

/**
 * метод необходим для изменений key компонента tableEl, в случае когда пользователь осуществляет поиск
 */

const reboot = () => {
  pos.value++;
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  background: #808080;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 30px;
}
</style>
