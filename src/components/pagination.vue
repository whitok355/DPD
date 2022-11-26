<template>
  <div class="pagination">
    <button class="pagination__el" @click="prevPage" :disabled="page == 1">&lt;</button>
    <template v-for="el in pageCount" :key="el">
      <div
        class="pagination__el"
        :class="page == el ? 'pagination__el--active' : ''"
        @click="goPage(el)"
      >
        {{ el }}
      </div>
    </template>
    <button class="pagination__el" @click="nextPage" :disabled="page == pageCount">
      &gt;
    </button>
  </div>
</template>
<script setup>
import { defineEmits, defineProps, computed } from "vue";

const emits = defineEmits(["prevPage", "nextPage", "goPage"]);
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  countUser: {
    type: Number,
    required: true,
  },
  listSize: {
    type: Number,
    required: true,
  },
});
const prevPage = () => {
  emits("prevPage");
};
const nextPage = () => {
  emits("nextPage");
};
const goPage = (el) => {
  emits("goPage", el);
};
const pageCount = computed(() => {
  return Math.ceil(props.countUser / props.listSize);
});
</script>
<style>
.pagination {
  display: flex;
  align-items: center;
  padding-top: 55px;
  padding-bottom: 55px;
  width: 90%;
}
.pagination__el {
  text-transform: uppercase;
  font-size: 1.1em;
  background: white;
  padding: 15px 0;
  width: 100%;
  text-align: center;
}
.pagination__el--active {
  background: #c0c0c0;
  font-size: 1.3em;
  font-weight: 900;
}
.pagination__el:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: 0.5s;
}
</style>
