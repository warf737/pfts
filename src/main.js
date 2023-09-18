import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";

Vue.use(ElementUI, { locale });

// const router = Router.createRouter({
//   routes: [
//     {
//       path:'/main',
//       name: 'main',
//       component: App
//     },
//   ],
//   mode: 'history'
// });
// router.replace('/main');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
