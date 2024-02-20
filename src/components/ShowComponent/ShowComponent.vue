<template>
  <component :is="component" />
</template>

<script>
import { loadPage } from "@/utils/importUtils";
export default {
  name: "ShowComponent",
  data() {
    return {
      component: null,
      props: null
    };
  },
  props: {
    pageName: String
  },
  created() {
    this.component = loadPage(this.pageName);
  }
};
</script>
