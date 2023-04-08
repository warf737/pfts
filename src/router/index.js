import Vue from "vue";
import VueRouter from "vue-router";
import { loadComponent, loadPage } from "@/utils/importUtils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: loadPage("Home")
  },
  {
    path: "/project/:project_name/:script_name",
    name: "project",
    component: loadComponent("ShowComponent"),
    props: {
      pageName: "ShowScript"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
