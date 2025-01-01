<template>
  <chartWrap tit="年度游客量对比">
    <template #chart><div class="charts" ref="charts"></div></template>
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
    //标题组件
    title: {
      //   text: '访问量',
    },
    //x|y轴
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      //轴线的设置
      axisLine: {
        show: false,
      },
      //刻度
      axisTick: {
        show: false,
      },
      axisLabel: { color: '#fff' },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: false,
      },
      //刻度
      axisTick: {
        show: false,
      },
      axisLabel: { color: '#fff' },
      name: '(人数)', // 添加纵坐标轴顶部的文字
      nameLocation: 'end',
      nameTextStyle: { color: '#fff', fontSize: 12, align: 'right' },
    },
    grid: {
      left: 40,
      right: 20,
      bottom: 10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['2017', '2018', '2019'],
      textStyle: { color: '#fff' },
      icon: 'rect',
      right: '3%',
    },
    //系列
    series: [
      {
        name: '2017',
        type: 'line',
        data: [120, 223, 66, 299, 321, 890, 120, 123, 434, 212, 212, 653],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#2356b2',
        },
      },
      {
        name: '2018',
        type: 'line',
        data: [220, 423, 166, 229, 721, 190, 140, 223, 134, 312, 612, 153],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#975277',
        },
      },
      {
        name: '2019',
        type: 'line',
        data: [620, 223, 566, 233, 121, 690, 230, 113, 334, 212, 234, 133],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: '#946b70',
        },
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.charts {
  height: 250px;
}
</style>
