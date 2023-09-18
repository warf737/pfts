<script>
import { ITEMS } from "./consts";
export default {
  name: "FillingCollection",
  data() {
    return {
      collections: "accountrequisites",
      filterFields: ["Code"],
      items: ITEMS
    };
  },
  created() {
    this.getValue();
  },
  methods: {
    getValue() {
      const replaceData = [];

      const findFilter = [];
      // eslint-disable-next-line
  for (const item of this.items) {
        const filter = {};
        this.filterFields.forEach(field => {
          // logger.debug('updateData', { field });
          filter[field] = item[field];
        });
        findFilter.push(filter);
        // logger.debug('updateData', { filter });
        replaceData.push({
          replaceOne: { filter, replacement: item, upsert: true }
        });
      }
      return console.log({ replaceData });
    }
  }
};
</script>

<template>
  <div>FillingCollection</div>
</template>

<style lang="scss" scoped></style>
