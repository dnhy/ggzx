<!--  -->
<template>
  <div class="tabbar">
    <div class="tabbar-left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="tabbar-right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts" name="tabbar">
import Breadcrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue';
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-between;

  .tabbar-left {
    display: flex;
  }

  .tabbar-right {
    display: flex;
    align-items: center;
  }
}
</style>
