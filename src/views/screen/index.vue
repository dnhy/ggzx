<!--  -->
<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <div class="left">
          <span class="left-btn">首页</span>
        </div>
        <div class="mid"><div class="title">智慧旅游可视化大数据平台</div></div>
        <div class="right">
          <span class="right-btn">统计报告</span>
          <span class="time">当前时间：{{ timeNow }}</span>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const screen = ref<HTMLInputElement | null>(null);
const timeNow = ref<string>(getNowTime());

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const hh = window.innerHeight / h;
  return ww < hh ? ww : hh;
}

let interval: any = setInterval(() => {
  timeNow.value = getNowTime();
}, 1000);

onMounted(() => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
onBeforeUnmount(() => {
  clearInterval(interval);
});

window.onresize = () => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};

function getNowTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: 100% 100%;
}

.screen {
  width: 1920px;
  height: 1080px;
  // background-color: cadetblue;
  position: fixed;
  left: 50%;
  top: 50%;
  transform-origin: left top;
  .top {
    width: 100%;
    height: 40px;
    // background-color: blue;
    display: flex;
    color: #29fcff;
    .left {
      flex: 1.5;
      background: url(./images/dataScreen-header-left-bg.png) no-repeat;
      background-size: cover;

      .left-btn {
        width: 150px;
        height: 40px;
        background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
        background-size: 100% 100%;

        float: right;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .mid {
      flex: 2;

      .title {
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 30px;
        background: url(./images/dataScreen-header-center-bg.png) no-repeat;
        background-size: 100% 100%;
        text-align: center;
      }
    }
    .right {
      flex: 1.5;
      background: url(./images/dataScreen-header-right-bg.png) no-repeat;
      background-size: cover;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right-btn {
        width: 150px;
        height: 40px;
        background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
        background-size: 100% 100%;

        float: left;
        text-align: center;
        line-height: 40px;
        font-size: 20px;
        cursor: pointer;
      }
      .time {
        font-size: 20px;
      }
    }
  }
}
</style>
