<script>
export const PROJECTS = [
  {
    title: "BIS",
    children: [
      {
        title: "TransformResponse",
        hidden: false
      }
    ]
  },
  {
    title: "Custom",
    children: []
  }
];

export default {
  name: "Header",
  PROJECTS,
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // router.push({ path: `/project/${project_name}/${script_name}` });
      console.log(key, keyPath);
      this.activeIndex = key;
    }
  }
};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
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
      <el-submenu
        :key="index + 1"
        :index="`${index + 1}`"
        v-if="project.children.length"
      >
        <template slot="title">{{ project.title }}</template>
        <template v-for="(child, indexChild) in project.children">
          <router-link
            class="header__link"
            :to="{
              path: `/project/${project.title}/${child.title}`
            }"
            :props="{
              scriptName: child.title
            }"
          >
            <el-menu-item :key="indexChild + 1">
              {{ child.title }}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
.header__link {
  color: inherit;
  outline: none;
  border: none;
}
</style>
