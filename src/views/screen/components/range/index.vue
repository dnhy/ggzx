<template>
  <ChartWrap tit="热门景区排行">
    <template #chart>
      <div class="charts">
        <div class="sqt" ref="sqt"></div>
      </div>
    </template>
  </ChartWrap>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ChartWrap from '../chartWrap/index.vue';
import * as echarts from 'echarts';

const sqt = ref<HTMLInputElement | null>(null);

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(sqt.value);

  // 指定图表的配置项和数据
  var option = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value',
      axisLabel: {
        margin: 100,
        align: 'right', // Align the labels to the left
      },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: ['峨眉山', '稻城亚丁', '九寨沟', '万里长城', '北京故宫'],
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
      },
    },
    series: [
      {
        name: '预约数量',
        type: 'bar',
        data: [80, 60, 50, 40, 30],
        label: {
          show: true,
          position: 'insideLeft',
          formatter: '{c}%',
          color: '#fff',
        },
        itemStyle: {
          color: function (params: any) {
            var colorList = [
              '#c23531',
              '#2f4554',
              '#61a0a8',
              '#d48265',
              '#91c7ae',
            ];
            return colorList[params.dataIndex];
          },

          borderRadius: [10, 10, 10, 10], // 设置圆角
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderWidth: '1',
          borderColor: '#fff',
          borderRadius: [10, 10, 10, 10], // 设置圆角
        },
      },
    ],
    grid: {
      left: '90%', // 设置左边距
      right: '80%', // 设置右边距
    },
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
.sqt {
  height: 270px;
}
</style>
