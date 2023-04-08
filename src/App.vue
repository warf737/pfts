<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { loadComponent } from "./utils/importUtils";
const Header = loadComponent("Header");
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
}
</style>
