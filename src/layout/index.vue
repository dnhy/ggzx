<template>
  <div class="container">
    <el-row style="height: 100%">
      <el-col :span="8" class="left-bar">
        <div class="logo">
          <img src="../../../public/logo.png" alt="" />
          <div class="tit">硅谷甄选运营平台</div>
        </div>
        <div class="menu">
          <el-scrollbar class="scrollbar">
            <el-menu
              active-text-color="#ffd04b"
              background-color="#545c64"
              class="el-menu-vertical-demo"
              default-active="2"
              text-color="#fff"
            >
              <Menu :menuRoutes="menuRoutes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="main">
          <Main></Main>
          <!-- 子路由会在这个子的router-view中显示，一级路由在外层的router-view中显示。子路由和一级路由相同以谁后写为准，如果非得同时写，写在前面的路由名要和最后一个相同 -->
          <!-- <router-view></router-view> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Menu from './menu/index.vue'
import { useUserStore } from '@/store/modules/user'
import Main from '@/layout/main/index.vue'

const userStore = useUserStore()
const menuRoutes = userStore.menuRoutes
console.log('menuRoutes :', menuRoutes)
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
    margin: 5px;
    margin-top: 10px;
  }
  .tit {
    font-size: 20px;
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
</style>
