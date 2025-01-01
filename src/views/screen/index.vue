<!--  -->
<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top"><Top /></div>
      <div class="bottom">
        <div class="left">
          <Tourist />
          <Gender />
          <Age />
        </div>
        <div class="mid">
          <Map class="map" />
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Range />
          <Year />
          <Channel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Top from './components/top/index.vue';
import Tourist from './components/tourist/index.vue';
import Gender from './components/gender/index.vue';
import Age from './components/age/index.vue';
import Map from './components/map/index.vue';
import Line from './components/line/index.vue';
import Range from './components/range/index.vue';
import Year from './components/year/index.vue';
import Channel from './components/channel/index.vue';

const screen = ref<HTMLInputElement | null>(null);

function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const hh = window.innerHeight / h;
  return ww < hh ? ww : hh;
}

onMounted(() => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

window.onresize = () => {
  screen.value!.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
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
  position: fixed;
  left: 50%;
  top: 50%;
  transform-origin: left top;
  .top {
    width: 100%;
    height: 40px;
    display: flex;
    color: #29fcff;
  }

  .bottom {
    width: 100%;
    height: calc(1080px - 40px);
    display: flex;

    .left {
      flex: 1.5;
    }
    .mid {
      flex: 3;
      display: flex;
      flex-direction: column;
      .map {
        flex: 4;
      }
      .line {
        flex: 1;

        margin: 10px;
      }
    }
    .right {
      flex: 1.5;
    }
  }
}
</style>
