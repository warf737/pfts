<script>
import { loadScriptPage } from "@/utils/importUtils";
export default {
  name: "ShowScript",
  data() {
    return {
      scriptName: "",
      component: null
    };
  },
  props: {},
  created() {
    this.scriptName = this.$route.params.script_name;
    this.component = loadScriptPage(this.scriptName);
  }
};
</script>

<template>
  <component :is="component" />
</template>
