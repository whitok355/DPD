<template>
  <tr class="row">
    <td class="row__el"><img :src="user.picture.medium" alt="user" /></td>
    <td class="row__el">
      {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
    </td>
    <td class="row__el">{{ user.gender }}</td>
    <td class="row__el">{{ user.location.country }}</td>
    <td class="row__el">{{ getDob }}</td>
    <td class="row__el">{{ user.email }}</td>
    <td class="row__el">{{ user.phone }}</td>
  </tr>
</template>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

/**
 * метод для преобразования даты рождения в необходимый формат
 */
const getDob = computed(() => {
  const dateArr = props.user.dob.date.split("T");
  return dateArr[0];
});
</script>
<style scoped>
.row__el {
  font-size: 0.7em;
}
</style>
