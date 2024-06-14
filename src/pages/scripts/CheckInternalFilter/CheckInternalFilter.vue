<script>
import { state, ITEMS } from "./constants";
export default {
  name: "CheckInternalFilter",
  data() {
    return {
      items: ITEMS,
      filter: state
    };
  },
  computed: {
    filteredItems() {
      return this.checkInternalFilter(this.filter, this.items);
    }
  },
  methods: {
    checkInternalFilter(state, items) {
      console.log("checkInternalFilter", { state, items });

      // приводим все значения к одному виду для последующего сравнения
      const stringify = (value, type) => {
        if (type === "number" && value !== undefined && value !== null) {
          return parseFloat(value.replaceAll(" ", "")).toString();
        }
        return (value === undefined || value === null ? "" : value)
          .toString()
          .toLowerCase()
          .replace(" ", "");
      };

      // проводим сравнение между двумя строками.
      // string - представляет собой значение из фильтруемого элемента.
      // substring - представляет собой значение из фильтра.
      // для некоторых случаев возможно, что элемент содержит какое-то одно значение,
      // а фильтр - массив значений, и релевантным результатом будет считаться,
      // когда значение из элемента частично совпадает со значением из фильтра, а не наоборот
      const compareByCondition = (condition, string, substring, type) => {
        // console.log('compareByCondition', { string, substring, condition });
        const value1 = type === "number" ? parseFloat(string) : string;
        const value2 = type === "number" ? parseFloat(substring) : substring;
        // console.log({ value1, value2, condition });

        let result;
        switch (condition) {
          case "*":
            result = string.includes(substring) || substring.includes(string);
            break;
          case "=":
            result = value1 === value2;
            break;
          case "!=":
            result = value1 !== value2;
            break;
          case "<=":
            result = value1 <= value2;
            break;
          case ">=":
            result = value1 >= value2;
            break;
          case "<":
            result = value1 < value2;
            break;
          case ">":
            result = value1 > value2;
            break;
          default:
            result = false;
        }
        // console.log('compareByCondition', { result });
        return result;
      };

      // устанавливаем тип проверки для фильтров, представленных элементами radio и checkbox.
      // для них сравнения должны быть строгое и не строгое соответственно
      // если фильтр представлен другим компонентом, то берем его значение
      const getFilterOperator = targetFilter => {
        let { operator } = targetFilter;
        if (targetFilter.view_as || targetFilter.operator) {
          if (!operator) {
            switch (targetFilter.view_as) {
              case "radio":
              case "select":
                operator = "=";
                break;
              case "checkbox":
                operator = "*";
                break;
              default:
                operator = targetFilter.operator;
            }
          }
        } else {
          console.error("getFilterOperator", {
            error: "Отсуствует оператор сравнения"
          });
        }
        // console.log('getFilterOperator', { operator });
        return operator;
      };

      // сравниваем значение фильтра для поля и ищем это поле в фильтруемом элементе
      // если такое поле найдено и соответсвует фильтру, то возвращаем true, иначе false
      const checkMatchingValues = (targetFilter, filterValue, item) => {
        let result = true;
        if (targetFilter.value.length) {
          // console.log({ item, targetFilter });
          const itemValue = item[targetFilter.id];
          const itemType = targetFilter.type === "number" ? "number" : "string";
          // console.log({ itemValue, itemType, filterValue });
          result = compareByCondition(
            getFilterOperator(targetFilter),
            stringify(itemValue, itemType),
            stringify(filterValue, itemType),
            itemType
          );
        }
        return result;
      };

      // фильтруем только по заполненным значениям во внутреннем фильтре, остальные фильтры игнорируем
      const filledInternalFilter = state?.internalFilter?.filter(
        filter => filter.value.length
      );
      // console.log('checkMatchingValues', { filledInternalFilter });

      const applyConditions = (conditions, item) => {
        console.log({ conditions, item });
        return conditions?.every(condition =>
          Array.isArray(condition.value)
            ? condition.value.some(conditionValue =>
                checkMatchingValues(condition, conditionValue, item)
              )
            : checkMatchingValues(condition, condition.value, item)
        );
      };

      // return filledInternalFilter.length
      //   ? items.filter((item) =>
      //     filledInternalFilter.every((targetFilter) => {
      //       if (targetFilter.conditions && targetFilter.value.length) {
      //         return targetFilter.value.every((value) =>
      //           applyConditions(targetFilter.conditions[value], item),
      //         );
      //       }
      //       return Array.isArray(targetFilter.value)
      //         ? targetFilter.value.some((targetFilterValue) =>
      //           checkMatchingValues(targetFilter, targetFilterValue, item),
      //         )
      //         : checkMatchingValues(targetFilter, targetFilter.value, item);
      //     }),
      //   )
      //   : items;
      // 1. если есть внутренни фильтры, то фильтруем данные
      return filledInternalFilter.length
        ? items.filter(
            item =>
              !!filledInternalFilter.every(targetFilter => {
                if (targetFilter.conditions && targetFilter.value.length) {
                  return targetFilter.value.every(value =>
                    applyConditions(targetFilter.conditions[value], item)
                  );
                }
                // 1.1 если в фильтре value представлено массивом, то проверяем фильтруемые
                // элементы на соответсвие с каждым элементом массива в фильтре
                return Array.isArray(targetFilter.value)
                  ? targetFilter.value.some(targetFilterValue =>
                      checkMatchingValues(targetFilter, targetFilterValue, item)
                    )
                  : // 1.2 если в фильтре value представлено простым значением, то фильтруем в соответствии с этим значением
                    checkMatchingValues(targetFilter, targetFilter.value, item);
              })
          )
        : items; // 2. если внутренних фильтров нет, то отдаем данные как они есть
    }
  }
};
</script>

<template>
  <div style="display: flex">
    <div style="display: flex; flex-direction: column">
      <template v-for="(i, indx) in items">
        <p :key="indx">i: {{ i }}</p>
      </template>
    </div>
    <div style="display: flex; flex-direction: column">
      <template v-for="(i, idx) in filteredItems">
        <p :key="idx">fi: {{ i }}</p>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
