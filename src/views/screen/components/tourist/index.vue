<template>
  <ChartWrap tit="实时游客统计" rightCont="可预约总量2123人">
    <template #cont>
      <div class="now">
        <div class="char" v-for="item in currPeopleNum.split('')">
          {{ item }}
        </div>
      </div>
    </template>
    <template #chart><div class="sqt" ref="sqt"></div></template>
  </ChartWrap>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import ChartWrap from '../chartWrap/index.vue';

const sqt = ref<HTMLInputElement | null>(null);

let currPeopleNum = ref<string>('123456人');
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(sqt.value);

  // 指定图表的配置项和数据
  var option = {
    //标题组件
    title: {
      text: '水球图',
    },
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列:决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [0.6, 0.4, 0.2], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '100%', //半径
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
});
</script>

<style lang="scss" scoped>
.now {
  width: 100%;
  display: flex;
  padding: 10px;
  color: #29fcff;
  font-size: 14px;

  .char {
    flex: 1.5;
    text-align: center;
    background: url(../../images/total.png) no-repeat;
    background-size: 100% 100%;
    height: 40px;
    line-height: 40px;
  }
}

.sqt {
  height: 270px;
}
</style>
