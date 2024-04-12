<script>
import { format, format as formatDate, isValid, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
export default {
  name: "WorkWithDates",
  data() {
    return {
      date: "2023-10-12T17:12:28.000Z"
    };
  },
  computed: {
    parsedDate() {
      return this.date
        ? formatDate(parseISO(this.date), "dd.MM.yyyy HH:mm:ss")
        : null;
    },
    // parsedFront() {
    //   return this.date
    //     ? this.formatFieldDatetime(this.date, { display: true })
    //     : null;
    // }
    parsedFront() {
      return formatDate(
        utcToZonedTime(this.parseIso, "UTC"),
        "dd.MM.yyyy г. HH:mm:ss"
      );
    },
    parseIso() {
      return parseISO(this.date);
    }
  },
  methods: {
    formatFieldDatetime(field, format = {}) {
      console.log("formatFieldDatetime", { field, format });
      if (format.display) {
        const date = this.parseDateString(field);
        if (!date) {
          return field;
        }
        return utcToZonedTime(formatDate(date, "dd.MM.yyyy HH:mm:ss"));
      }
      return null;
    },
    /* Calculate time with current timezone*/
    parseDateString(value) {
      if (!`${value}`.match(/^(\d{4})-(\d{2})-(\d{2})/)) return null;

      const parsed = parseISO(value);
      const timezoneOffset = new Date().getTimezoneOffset();

      const digit = timezoneOffset > 0 ? "-" : "+";
      const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
      const offsetMinutes = Math.abs(timezoneOffset) - offsetHours * 60;
      const timezoneString = `${digit}${
        offsetHours < 10 ? "0" : ""
      }${offsetHours}:${offsetMinutes < 10 ? "0" : ""}${offsetMinutes}`;

      const date = utcToZonedTime(parsed, timezoneString);

      if (!isValid(date)) {
        return null;
      }

      return date;
    }
  }
};
</script>

<template>
  <main>
    <h3>WorkWithDates</h3>
    <el-input placeholder="Please input" v-model="date"></el-input>
    <p>backend: {{ parsedDate }}</p>
    <p>front: {{ parsedFront }}</p>
    <p>1:date {{ date }}</p>
    <p>2 -- {{ parseIso }}</p>
    <p>3: parsedFront {{ parsedFront }}</p>
  </main>
</template>

<style lang="scss" scoped></style>
