<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
//引入中国地图的JSON数据
import chinaJSON from './chinaMap.json';
//获取DOM元素
let map = ref();
//注册中国地图
echarts.registerMap('china', chinaJSON as any);
onMounted(() => {
  let mychart = echarts.init(map.value);
  //设置配置项
  mychart.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#153a85', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: 'blue', // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#0a214b', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
        borderColor: 'skyblue',
        borderWidth: 1,
        shadowColor: 'skyblue', // 设置阴影颜色
        shadowBlur: 8, // 设置阴影模糊度 shadowOffsetX: 0, // 设置阴影水平偏移
        shadowOffsetX: 3, // 设置阴影垂直偏移
        shadowOffsetY: 3, // 设置阴影垂直偏移
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: 'blue',
        },
        label: {
          fontSize: 20,
          color: 'white',
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
              curveness: 0.1, // 设置弧度，值越大弧度越大
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
              curveness: -0.1, // 设置弧度，值越大弧度越大
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
        },
      },
    ],
  });
});
</script>

<style scoped></style>
