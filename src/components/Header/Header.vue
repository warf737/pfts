<script>
import { PROJECTS } from "@/pages/constants";

export default {
  name: "Header",
  PROJECTS,
  data() {
    return {
      activeProjectIndex: "1",
      activeScriptIndex: "1"
    };
  },
  computed: {
    activeProject() {
      return this.$options.PROJECTS[this.activeProjectIndex - 1];
    },
    scripts() {
      return this.activeProject.children;
    }
  },
  methods: {
    handleSelectProject(key) {
      this.activeProjectIndex = key;
    },
    handleSelectScript(key) {
      this.activeScriptIndex = key;
    }
  }
};
</script>

<template>
  <div>
    <el-menu
      :default-active="activeProjectIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelectProject"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <router-link to="/">
        <el-menu-item index="0">
          На главную
        </el-menu-item>
      </router-link>

      <template v-for="(project, index) in $options.PROJECTS">
        <el-menu-item :key="index" :index="`${index + 1}`">{{
          project.title
        }}</el-menu-item>
      </template>
      <!--    <template v-for="(project, index) in $options.PROJECTS">-->
      <!--      <el-submenu-->
      <!--        :key="index + 1"-->
      <!--        :index="`${index + 1}`"-->
      <!--        v-if="project.children.length"-->
      <!--      >-->
      <!--        <template slot="title">{{ project.title }}</template>-->
      <!--        <template v-for="(child, indexChild) in project.children">-->
      <!--                <router-link-->
      <!--                  :key="indexChild + 1"-->
      <!--                  class="header__link"-->
      <!--                  :to="{-->
      <!--                    path: `/project/${project.title}/${child.title}`-->
      <!--                  }"-->
      <!--                  :props="{-->
      <!--                    scriptName: child.title-->
      <!--                  }"-->
      <!--                >-->
      <!--                  <el-menu-item :key="indexChild + 1">-->
      <!--                    {{ child.title }}-->
      <!--                  </el-menu-item>-->
      <!--                </router-link>-->
      <!--        </template>-->
      <!--      </el-submenu>-->
      <!--    </template>-->
    </el-menu>

    <el-menu
      :default-active="activeScriptIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelectScript"
    >
      <template v-for="(script, index) in scripts">
        <el-menu-item :key="index" :index="`${index + 1}`">
          <router-link
            :key="script + 1"
            class="header__link"
            :to="{
              path: `/project/${activeProject.title}/${script.title}`
            }"
            :props="{
              scriptName: script.title
            }"
          >
            <!--            <el-menu-item :key="index + 1">-->
            {{ script.title }}
            <!--            </el-menu-item>-->
          </router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.header {
  &__link {
    color: inherit;
    outline: none;
    border: none;
  }
  &__menuWrapper {
  }
}
</style>
