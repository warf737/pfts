<script>
import { loadScriptPage } from "@/utils/importUtils";
export default {
  name: "ShowScript",
  data() {
    return {};
  },
  props: {},
  computed: {
    scriptName() {
      return this.$route.params.script_name;
    },
    component() {
      return loadScriptPage(this.scriptName);
    }
  }
};
</script>

<template>
  <component :is="component" />
</template>
