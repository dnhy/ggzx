<!--  -->
<template>
  <el-button icon="Refresh" circle @click="refreshMain" />
  <el-button icon="FullScreen" circle @click="fullScreenChange" />
  <el-button icon="Setting" circle />
  <img class="avatar" :src="userStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="setting">
import useLayOutSettingStore from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

var layOutSettingStore = useLayOutSettingStore()
var userStore = useUserStore()
var $router = useRouter()
var $route = useRoute()

function refreshMain() {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}

function fullScreenChange() {
  var full = document.fullscreenElement

  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function logout() {
  userStore.userLogout()
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  })
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 28px;
  height: 28px;
  margin: 0 10px;
}
</style>
