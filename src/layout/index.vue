<template>
  <div class="container">
    <el-container style="height: 100%">
      <el-aside
        width="220px"
        class="left-bar animation"
        :class="{ collapse: fold }"
      >
        <el-scrollbar class="scrollbar">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            text-color="#fff"
            :collapse="fold"
            :collapse-transition="false"
          >
            <Logo :setting="setting"></Logo>
            <Menu :menuRoutes="menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="animation">
        <el-header>
          <Tabbar></Tabbar>
        </el-header>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="layout">
import Menu from './menu/index.vue';
import { useUserStore } from '@/store/modules/user';
import Main from '@/layout/main/index.vue';
import Tabbar from './tabbar/index.vue';
import Logo from '@/layout/logo/index.vue';
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
import { computed } from 'vue';
import setting from '../setting';

const userStore = useUserStore();
const menuRoutes = userStore.menuRoutes;

let $route = useRoute();

var layOutSettingStore = useLayOutSettingStore();
var fold = computed(() => {
  return layOutSettingStore.fold;
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}

.left-bar {
  background-color: #545c64;
}

.menu {
  background: #545c64;
}

.animation {
  transition: all 0.3s;
}

::v-deep .el-menu--collapse {
  overflow: hidden;
  width: 100%;
}

.el-menu {
  border-right: none;
}

.collapse {
  width: 60px;
}
</style>
