<script>
import { rule, data } from "./consts";
import JsonEditor from "vue-json-editor";
import _isEmpty from "lodash/isEmpty";
import objectMapper from "object-mapper";

export default {
  name: "TransformResponse",
  components: {
    JsonEditor
  },
  data() {
    return {
      raw: {
        rule: rule,
        data: data
      },
      transformResult: {}
    };
  },
  methods: {
    async onTestClick({ rule, data }) {
      console.log("click", { rule, data });
      let transformData = JSON.stringify(data);

      if (!_isEmpty(rule)) {
        console.log("1");
        if (Array.isArray(data)) {
          console.log("2");
          transformData = [];
          console.log("3");
          // eslint-disable-next-line no-restricted-syntax
          for (const item of data) {
            console.log("4", { item });
            const itemMap = await objectMapper(item, rule);
            transformData.push(itemMap);
          }
        } else {
          console.log("5", { ...transformData });
          transformData = await objectMapper(data, rule);
          console.log("5.5", { ...transformData });
        }
      }

      console.log("6", { transformData });
      this.transformResult = transformData;
    }
  }
};
</script>

<template>
  <div>
    <section class="test">
      <json-editor
        class="test__editor"
        v-model="raw.rule"
        mode="form"
        :show-btns="false"
        :expandedOnStart="true"
      />
      <el-button
        class="test__button"
        @click="onTestClick({ rule: raw.rule, data: raw.data })"
      >
        Старт
      </el-button>
      <json-editor
        class="test__editor"
        v-model="transformResult"
        mode="form"
        :show-btns="false"
        :expandedOnStart="true"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.test {
  display: flex;
  gap: 20px;
  color: red;

  &__editor {
    width: 100%;
  }

  &__button {
    height: 40px;
  }
}
</style>
