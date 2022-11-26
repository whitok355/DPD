<template>
  <table class="table">
    <thead class="table__head">
      <tr class="table__tr">
        <headRow @sorting="sorting" />
      </tr>
    </thead>
    <tbody class="table__body">
      <bodyRow v-for="(val, key) of getSliceUsers" :user="val" :key="key" />
    </tbody>
  </table>
  <div class="pag-container">
    <pagination
      @prevPage="pugFunc.prevPage"
      @nextPage="pugFunc.nextPage"
      @goPage="pugFunc.goPage"
      :page="page"
      :listSize="listSize"
      :countUser="sortDb.length"
    />
  </div>
</template>

<script setup>
import { computed, ref, onUpdated, onMounted } from "vue";
import { useRoute } from "vue-router";
import bodyRow from "comp/br.vue";
import headRow from "comp/hr.vue";
import pagination from "comp/pagination.vue";

const page = ref(1); //текущая страница пагинации
const listSize = ref(20); //максимальное количество записей на странице
const listPosition = ref(0); // номер первой записи страницы
const sortDb = ref([]); // отсортированный массив пользователей
const url = ref(); // текущий fullPath
const route = useRoute(); // служебный метод для работы с route
const db = ref([]); // неотсортированный массив пользователей

/**
 * Объект содержит методы для пагинации
 */
const pugFunc = {
  prevPage: () => {
    listPosition.value -= listSize.value;
    page.value--;
  },
  nextPage: () => {
    listPosition.value += listSize.value;
    page.value++;
  },
  /**
   * el - номер страницы по которой произошел клик
   */
  goPage: (el) => {
    if (el == 1) {
      listPosition.value = 0;
    } else {
      listPosition.value = el * listSize.value - listSize.value;
    }
    page.value = el;
  },
};

const getDate = (date) => {
  return new Date(date);
};

/**
 * Объект содаржащий кастомные для каждого столбца правила сортировки списка.
 */
const sortings = {
  name: () => {
    sortDb.value.sort((a, b) => a.name.first.localeCompare(b.name.first, "en"));
  },
  gender: () => {
    sortDb.value.sort((a, b) => a.gender.localeCompare(b.gender, "en"));
  },
  location: () =>
    sortDb.value.sort((a, b) =>
      a.location.country.localeCompare(b.location.country, "en")
    ),
  dob: () => {
    sortDb.value.sort((a, b) => {
      a = getDate(a.dob.date);
      b = getDate(b.dob.date);
      return a - b;
    });
  },
  email: () => {
    sortDb.value.sort((a, b) => a.email.localeCompare(b.email, "en"));
  },
  reverse: () => {
    sortDb.value.reverse();
  },
};

/**
 *
 * @param {*} key ключ столбца по которому происходит сортировка
 */
const sorting = (key) => {
  sortings[key]();
};

/**
 * Метод ограничивает вывод списка пользователей 20 записями.
 * listPosition.value - значение первого в отражаемом списке пользователя
 * listSize.value - значение максимального количества записей на странице
 */
const getSliceUsers = computed(() => {
  return sortDb.value.slice(listPosition.value, listPosition.value + listSize.value);
});

/**
 * Метод преобразует дату рождения в необходимый формат
 */
const getDob = computed(() => (val) => {
  const dateArr = val.date.split("T");
  return dateArr[0];
});

/**
 * Метод для сортировки массива данных.
 * Создается регулярное выражение на основание значения route.query.inputValue.
 * На основание данного регулярного выражения и просиходит сортировка.
 */
const getLists = computed(() => {
  const regExp = new RegExp(
    route.query.inputValue ? `${route.query.inputValue}` : "",
    "i"
  );
  const newArr = db.value.filter((user) => {
    const computedObj = {
      first: user.name.first,
      second: user.name.last,
      title: user.name.title,
      gender: user.gender,
      location: user.location.country,
      dob: getDob,
      email: user.email,
      phone: user.phone,
    };
    return Object.keys(computedObj).some((key) => regExp.test(computedObj[key]));
  });
  return newArr;
});

onUpdated(() => {
  if (route.fullPath !== url.value) {
    url.value = route.fullPath;
    pugFunc.goPage(1);
  }
});

/**
 * Асинхронный запрос, получение данных
 */
onMounted(async () => {
  try {
    const data = await fetch(`/api.json`);
    const response = await data.json();
    db.value = response.results;
    sortDb.value = getLists.value;
  } catch (err) {
    console.log(err);
  }
});
</script>
<style>
.table {
  border-spacing: 10px;
  width: 100%;
  text-align: center;
  background: #d8d6d6;
}
.pag-container {
  display: flex;
  justify-content: center;
}
</style>
