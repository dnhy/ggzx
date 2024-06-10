<!--  -->
<template>
  <el-icon style="margin: 0 10px" @click="clickFold">
    <component :is="layOutSettingStore.fold ? 'fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" v-show="item.meta.title" :to="item.path">
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="breadcrumb">
import useLayOutSettingStore from '@/store/modules/setting'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
var layOutSettingStore = useLayOutSettingStore()

function clickFold() {
  layOutSettingStore.fold = !layOutSettingStore.fold
}

var $route = useRoute()
console.log('%c [ $route  ]-24', 'font-size:px;', $route)
</script>

<style lang="scss" scoped></style>
