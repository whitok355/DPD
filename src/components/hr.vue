<template>
  <template v-for="(val, key) in titles" :key="key">
    <th class="table__th" :id="key">
      {{ val }}
      <sortUp
        class="table__icon"
        v-if="key != 'picture'"
        @click="sorting(key)"
        :class="{ hidden: arrowView ? true : false }"
      />
      <sortDown
        class="table__icon"
        v-if="key != 'picture'"
        @click="sorting('reverse')"
        :class="{ hidden: !arrowView ? true : false }"
      />
    </th>
  </template>
</template>
<script setup>
import { reactive, defineEmits, ref } from "vue";
import sortUp from "icons/sortUp.vue";
import sortDown from "icons/sortDown.vue";

const emit = defineEmits(["sorting"]);
const arrowView = ref(false); // переменная для изменения стрелок сортировки

/**
 *
 * @param {*} key название столбца по которому происходит сортировка
 */
const sorting = (key) => {
  arrowView.value = !arrowView.value;
  if (key !== "picture") {
    emit("sorting", key);
  }
};

const titles = reactive({
  picture: "Аватар",
  name: "ФИО",
  gender: "Пол",
  location: "Страна",
  dob: "Дата рождения",
  email: "Адрес электронной почты",
  phone: "Телефон",
});
</script>
<style>
.table__th {
  font-size: 1.1em;
  text-transform: uppercase;
}
.table__icon {
  width: 10px;
  height: 10px;
}
.table__icon:hover {
  cursor: pointer;
}
.hidden {
  display: none;
}
</style>
