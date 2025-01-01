<template>
  <chartWrap tit="预约渠道数据统计">
    <template #chart>
      <div class="charts" ref="charts"></div>
    </template>
  </chartWrap>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartWrap from '../chartWrap/index.vue';
import * as echarts from 'echarts';

let charts = ref();
onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value);
  //设置配置项
  mycharts.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      top: '15%',
      textStyle: { color: '#fff' },
      orient: 'vertical', //图例组件方向的设置
      right: '20px',
    },
    series: [
      {
        name: 'Area Mode',
        type: 'pie',
        radius: [20, 140],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
        },
        data: [
          { value: 30, name: 'rose 1' },
          { value: 28, name: 'rose 2' },
          { value: 26, name: 'rose 3' },
          { value: 24, name: 'rose 4' },
          { value: 22, name: 'rose 5' },
          { value: 20, name: 'rose 6' },
          { value: 18, name: 'rose 7' },
          { value: 16, name: 'rose 8' },
        ],
        label: {
          show: false,
        },
      },
    ],
    grid: {
      left: 0,
      top: 50,
      right: 0,
      bottom: 0,
    },
  });
});
</script>

<style lang="scss" scoped>
.charts {
  height: 380px;
}
</style>
