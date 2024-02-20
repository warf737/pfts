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
        <el-menu-item
          v-if="project.children.length"
          :key="index"
          :index="`${index + 1}`"
          >{{ project.title }}</el-menu-item
        >
      </template>
    </el-menu>

    <el-menu
      :default-active="activeScriptIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelectScript"
    >
      <template v-for="(script, index) in scripts">
        <el-menu-item
          v-if="!script.hidden"
          :key="index"
          :index="`script-${index + 1}`"
        >
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
            {{ script.title }}
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
