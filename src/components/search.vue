<template>
  <div class="search">
    <input class="search__input" type="text" placeholder="Search" v-model="inputValue" />
    <router-link
      :to="{
        path: '/sort/:id',
        name: 'sort',
        query: { inputValue: inputValue },
      }"
      ><searcIcon class="search__btn" @click="reboot"
    /></router-link>
  </div>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import searcIcon from "./icons/search-icon.vue";

const emit = defineEmits(["reboot"]);

const reboot = () => {
  emit("reboot");
};
const inputValue = ref();
</script>
<style>
.search {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.search__input {
  padding: 10px 50px 10px 20px;
}
.search__svg {
  width: 30px;
  height: 30px;
  margin-left: 30px;
  background: inherit;
  border: none;
}
.search__btn:hover {
  cursor: pointer;
}
</style>
