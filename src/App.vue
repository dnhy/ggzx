<template>
  <router-view></router-view>
</template>
<script setup lang="ts"></script>
<style lang="scss">
/* 更改进度条颜色 */
#nprogress {
  .bar {
    background: #3b67ee !important;
    height: 2px !important;
  }
  .peg {
    display: none!important;
  }
}

</style>
