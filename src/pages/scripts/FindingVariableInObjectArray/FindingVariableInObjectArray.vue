<script>
export default {
  name: "FindingVariableInObjectArray",
  data() {
    return {
      object: {
        Code: "USD",
        ForWhat: "RUR",
        Type: "CB",
        Since: "2022-12-19T00:00:00.000Z",
        Rate: 64.61,
        Per: 1,
        MinAmount: 0,
        _id: "63a1b0c7904efb21cccb2cdb"
      }
    };
  },
  created() {
    this.getValue("MinAmount");
  },
  methods: {
    getValue(key) {
      try {
        let val = null;
        console.log("obj: ", this.object);

        if (this.object[key] !== null && this.object[key].value) {
          // val = this.object[key].value;
          console.log("tst");
        }
        val = this.object[key];

        console.log({ val });
        return val;
      } catch (e) {
        throw new Error(`Невозможно вычислить значение поля "${key}": ${e}`);
      }
    }
  }
};
</script>

<template>
  <div>FindingVariableInObjectArray</div>
</template>

<style lang="scss" scoped></style>
