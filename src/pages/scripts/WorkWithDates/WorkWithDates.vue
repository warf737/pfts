<script>
// import { format, parseISO } from "date-fns";
export default {
  name: "UpdateMenus",
  data() {
    return {
      date: "2024-02-20T12:55:45.451Z"
    };
  },
  computed: {
    parsedDate() {
      return this.date;
    }
  }
};
</script>

<template>
  <div>{{ parsedDate }}</div>
</template>

<style lang="scss" scoped></style>
