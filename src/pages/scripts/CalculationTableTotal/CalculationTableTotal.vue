<script>
import { table, columns, total } from "./consts";
import { sumBy, toNumber, toString, reduce } from "lodash";
export default {
  name: "TestTable",
  data() {
    return {
      table,
      columns,
      total
    };
  },
  methods: {},
  computed: {
    isShowTotal() {
      return !!this.total;
    },
    totalDataComputed() {
      const stringToNumber = item =>
        toNumber(item[this.total.id].replace(" ", ""));
      const summaryString = data =>
        toString(sumBy(data, item => stringToNumber(item)));

      const groupTotal = () =>
        reduce(
          this.table,
          (acc, current) => {
            if (!acc[current[this.total.groupBy]]) {
              acc = {
                ...acc,
                [current[this.total.groupBy]]: stringToNumber(current)
              };
            } else {
              acc = {
                ...acc,
                [current[this.total.groupBy]]:
                  acc[current[this.total.groupBy]] + stringToNumber(current)
              };
            }
            return acc;
          },
          {}
        );

      return this.columns.map(({ key }, index) => {
        if (index === 0) return { id: key, value: "Итого" };
        if (key === this.total.id)
          return {
            id: key,
            value: !this.total.groupBy
              ? summaryString(this.table)
              : groupTotal()
          };
        return { id: key, value: null };
      });
    }
  }
};
</script>

<template>
  <div>
    <!--    Заголовки-->
    <div class="row" style="font-weight: bold">
      <div v-for="item in columns" :key="item.id" class="col-sm">
        {{ item.label }}
      </div>
    </div>

    <!--    Таблица-->
    <div v-for="(row, i) in table" :key="i" class="row">
      <div v-for="item in columns" :key="item.id" class="col-sm">
        {{ row[item.key] }}
      </div>
    </div>

    <!--    Итог-->
    <div v-for="(row, i) in totalDataComputed" :key="i" class="row">
      {{ row.value }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  display: flex;
  justify-content: space-around;
}
</style>
