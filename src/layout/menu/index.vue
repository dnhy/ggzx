<template>
  <template v-for="item in menuRoutes" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="toRouter"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="toRouter"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多个子路由 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu :index="item.path" v-if="!item.meta.hidden">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuRoutes="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts" name="menu">
import { defineProps } from 'vue';
import { RouteLocationRaw, useRouter } from 'vue-router';

let res = defineProps(['menuRoutes']);
const router = useRouter();

let menuRoutes = res.menuRoutes;

function toRouter(vc: { index: RouteLocationRaw }) {
  console.log(vc.index);
  router.push(vc.index);
}
</script>
<script lang="ts">
export default {
  name: 'Menu',
};
</script>

<style lang="scss" scoped></style>
