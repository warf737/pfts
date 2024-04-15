<script>
import objectUtils from "../../../utils/objectUtils";
import dateFilters from "../../../utils/dateFilters";

import { TEMPLATE, /* SOURCE_VALID, */ SOURCE_INVALID } from "./constants";
export default {
  name: "FillTemplateObject",
  data() {
    return {};
  },
  computed: {
    result() {
      // console.log({
      //   result: this.fillTemplateObject(this.template, this.object)
      // });
      // return this.fillTemplateObject(TEMPLATE, SOURCE_VALID);
      return this.fillTemplateObject(TEMPLATE, SOURCE_INVALID);
    },
    json() {
      return JSON.stringify(this.result, null, 2);
    }
  },
  methods: {
    replaceVarsInTemplate(
      template,
      object,
      convertPossibleDate,
      convertPossibleDateTime
    ) {
      // console.log('replaceVarsInTemplate', {
      //   template,
      //   object,
      //   convertPossibleDate,
      //   convertPossibleDateTime,
      // });
      if (!template || !object) return "";

      /**
       * Функция для конвертации значений
       */
      const convertValue = val =>
        convertPossibleDate
          ? dateFilters.date(val)
          : convertPossibleDateTime
          ? dateFilters.datetime(val)
          : val;

      let result = template;
      if (/<%(.*?)%>/g.test(template)) {
        /**
         * В шаблоне есть хоть одна ссылка
         */
        if (template.replace(/<%(.*?)%>/g, "")) {
          /**
           * Шаблон состоит из ссылок и констант.
           * Возвращаем строку "abc obj.f1.f2 edf"
           */
          const replacer = (asIs, path) =>
            convertValue(objectUtils.getObjectFieldByPath(object, path));
          result = template.replace(/<%(.*?)%>/g, replacer);
        } else {
          /**
           * Шаблон состоит из одной ссылки.
           * Возвращаем obj.f1.f2
           */
          const path = (/<%(.*?)%>/g.exec(template) || ["", ""])[1];
          result = convertValue(objectUtils.getObjectFieldByPath(object, path));
        }
      }
      // console.log('replaceVarsInTemplate', { result, template });
      return result || template;
    },
    findVarsInFilter(filter, object) {
      // console.log('findVarsInFilter', { filter, object });
      if (!filter && ["string", "undefined"].includes(typeof filter)) return "";

      if (
        typeof filter === "string" &&
        // eslint-disable-next-line no-bitwise
        ~filter.indexOf("<%") &&
        object &&
        Object.keys(object).length
      ) {
        return this.replaceVarsInTemplate(filter, object);
      }
      // console.log('findVarsInFilter', { filter });
      return filter;
    },
    fillTemplateObject(objectTemplate, objectSource) {
      // console.log("fillTemplateObject", { objectTemplate, objectSource });
      if (!objectTemplate || typeof objectTemplate !== "object") {
        throw new Error(
          "templateUtils :: fillTemplateObject - некорректное значение параметра objectTemplate."
        );
      }
      if (!objectSource || typeof objectSource !== "object") {
        throw new Error(
          "templateUtils :: fillTemplateObject - некорректное значение параметра objectSource."
        );
      }

      const template = objectUtils.copy(objectTemplate);
      const source = objectUtils.copy(objectSource);

      const result = Object.keys(template).reduce((result, fieldKey) => {
        // console.log('fillTemplateObject', { fieldKey });
        let fieldValue = template[fieldKey];

        if (fieldValue && typeof fieldValue === "object") {
          fieldValue = Array.isArray(fieldValue)
            ? fieldValue.map(item =>
                typeof item === "object"
                  ? this.fillTemplateObject(item, objectSource)
                  : item
              )
            : this.fillTemplateObject(fieldValue, objectSource);
        }
        // console.log('fillTemplateObject', { fieldValue });

        return {
          ...result,
          [fieldKey]: this.findVarsInFilter(fieldValue, source)
        };
      }, {});

      console.log("fillTemplateObject", { result });
      return result;
    }
  }
};
</script>

<template>
  <div><textarea v-model="json" rows="8" cols="40"></textarea></div>
</template>

<style lang="scss" scoped></style>
