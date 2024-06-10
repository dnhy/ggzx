<template>
  <div class="container">
    <el-row style="height: 100%">
      <el-col :span="spanWidth" class="left-bar animation">
        <div class="logo">
          <img :src="setting.logo" alt="" />
          <div class="tit" v-if="!fold">{{ setting.title }}</div>
        </div>
        <div class="menu">
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
              <Menu :menuRoutes="menuRoutes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="24 - spanWidth" class="animation">
        <div class="main">
          <Tabbar></Tabbar>
          <Main></Main>
          <!-- 子路由会在这个子的router-view中显示，一级路由在外层的router-view中显示。子路由和一级路由相同以谁后写为准，如果非得同时写，写在前面的路由名要和最后一个相同 -->
          <!-- <router-view></router-view> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="layout">
import Menu from './menu/index.vue'
import { useUserStore } from '@/store/modules/user'
import Main from '@/layout/main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import { computed, watch } from 'vue'
import setting from '../setting'

const userStore = useUserStore()
const menuRoutes = userStore.menuRoutes

let $route = useRoute()

var layOutSettingStore = useLayOutSettingStore()
var fold = computed(() => {
  return layOutSettingStore.fold
})
var spanWidth = computed(() => {
  return layOutSettingStore.fold ? 1 : 4
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
.logo {
  display: flex;
  background-color: #545c64;
  width: calc(100% - 5px);

  img {
    width: 30px;
    height: 30px;
    margin: 15px;
    margin-top: 10px;
  }
  .tit {
    font-size: 18px;
    line-height: 30px;
    color: #eee;
    margin-top: 10px;
  }
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
</style>
