<!--  -->
<template>
  <div>
    <el-card style="max-width: 100%; margin: 10px 10px">
      <div class="wrapper">
        <el-avatar :size="100" :src="avatar" class="avatar" />
        <div class="userinfo">
          <h1 class="title">{{ dateState() }}好！{{ username }}</h1>
          <div class="subtitle">dnhy的运营平台</div>
        </div>
      </div>
    </el-card>
    <div class="bottom">
      <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { dateState } from '@/utils/date'

const userStore = useUserStore()

const avatar = userStore.avatar
const username = userStore.username
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  .avatar {
    margin: 0 20px;
  }
  .userinfo {
    margin: auto 0;

    .title {
      font-size: 25px;
      margin-bottom: 20px;
    }

    .subtitle {
      font-style: italic;
      color: #87ceeb;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
