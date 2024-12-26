<template>
  <div
    class="statistic"
    :style="{
      background: `url(${getImageUrl(bg)}) no-repeat`,
      backgroundSize: '100% 100%',
    }"
  >
    <div class="head">
      <div class="title">
        <p>{{ tit }}</p>
        <p class="bg"></p>
      </div>
      <div class="right" v-if="rightCont">{{ rightCont }}</div>
    </div>
    <slot name="cont"></slot>
    <slot name="chart"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
const props = defineProps({
  tit: String,
  rightCont: String,
  bg: {
    type: String,
    default: '../../images/dataScreen-main-lb.png',
  },
});
let { tit, rightCont, bg } = toRefs(props);

function getImageUrl(url: string): string {
  return new URL(url, import.meta.url).href;
}
</script>

<style lang="scss" scoped>
.statistic {
  font-size: 22px;
  margin-top: 10px;
  color: white;
  .head {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    .title {
      padding: 5px;
      .bg {
        width: 68px;
        height: 7px;
        background: url(../../images/dataScreen-title.png);
        margin-top: 10px;
      }
    }
    .right {
      margin-top: 50px;
    }
  }
  .sex {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .women {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url(../../images/woman-bg.png) no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
  }

  .charts {
    height: 100px;
  }
}
</style>
