<script>
import { TEMPLATES } from "./constants";
import { sortBy } from "lodash";
export default {
  name: "SortBy",
  data() {
    return {
      templates: TEMPLATES
    };
  },
  computed: {
    handleSortedTemplates() {
      return this.handleSort(this.templates, "name");
    },
    lodashSortedTemplates() {
      return sortBy(this.templates, "name");
    }
  },
  methods: {
    // Функция для сортировки массива объектов по указанному полю
    handleSort(array, field) {
      const copyArray = array.map(obj => ({ ...obj }));
      return copyArray.sort((a, b) => {
        // Проверяем, что у обоих объектов есть поле с указанным именем
        if (a[field] < b[field]) {
          return -1; // Возвращаем отрицательное значение, если значение поля у объекта a меньше, чем у объекта b
        }
        if (a[field] > b[field]) {
          return 1; // Возвращаем положительное значение, если значение поля у объекта a больше, чем у объекта b
        }
        return 0; // Возвращаем 0, если значения равны
      });
    }
  }
};
</script>

<template>
  <div class="wrapper">
    Origin:

    <div class="wrapper__template">
      <template v-for="(template, idx) in templates">
        <span :key="idx">{{ template.name }}</span>
      </template>
    </div>
    Handle:
    <div class="wrapper__template">
      <template v-for="(template, idx) in handleSortedTemplates">
        <span :key="idx">{{ template.name }}</span>
      </template>
    </div>
    Lodash:
    <div class="wrapper__template">
      <template v-for="(template, idx) in lodashSortedTemplates">
        <span :key="idx">{{ template.name }}</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__template {
    display: flex;
    gap: 5px;
  }
}
</style>
