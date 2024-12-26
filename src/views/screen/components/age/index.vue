<template>
  <ChartWrap tit="年龄比例" bg="../../images/dataScreen-main-cb.png">
    <template v-slot:chart>
      <div class="chart" ref="chart"></div>
    </template>
  </ChartWrap>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartWrap from '../chartWrap/index.vue';
import * as echarts from 'echarts';

const chart = ref<HTMLInputElement>();

onMounted(() => {
  var myChart = echarts.init(chart.value);
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' },
        ],
      },
    ],
    //调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  };

  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
.chart {
  height: 270px;
}
</style>
