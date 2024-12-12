<!--  -->
<template>
  <el-button icon="Refresh" circle @click="refreshMain" />
  <el-button icon="FullScreen" circle @click="fullScreenChange" />
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          size="small"
          @change="setColor"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗色模式">
        <el-switch
          v-model="darkmode"
          size="small"
          inline-prompt
          active-action-icon="MoonNight"
          inactive-action-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
  </el-popover>

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
import useLayOutSettingStore from '@/store/modules/setting';
import { useUserStore } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

var layOutSettingStore = useLayOutSettingStore();
var userStore = useUserStore();
var $router = useRouter();
var $route = useRoute();

function refreshMain() {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
}

function fullScreenChange() {
  var full = document.fullscreenElement;

  if (!full) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

async function logout() {
  await userStore.userLogout();
  $router.push({
    path: '/login',
    query: {
      redirect: $route.path,
    },
  });
}

const color = ref('#409eff');
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]);

const darkmode = ref(false);

const setColor = () => {
  let html = document.documentElement;
  html.style.setProperty('--el-color-primary', color.value);
};

const changeDark = () => {
  let html = document.documentElement;
  html.className = darkmode.value ? 'dark' : '';
  console.log('darkmode :', darkmode);
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 28px;
  height: 28px;
  margin: 0 10px;
}
</style>
