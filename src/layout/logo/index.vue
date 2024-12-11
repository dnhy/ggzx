<template>
  <div class="logo">
    <img :src="logo" alt="" />
    <div class="tit">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
const { setting } = defineProps(['setting'])
const { logo, title } = setting
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  background-color: #545c64;
  width: calc(100% - 5px);
  overflow: hidden;

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
    white-space: nowrap;
  }
}
</style>
