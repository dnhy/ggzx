<!--  -->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="refresh" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="main">
import useLayOutSettingStore from '@/store/modules/setting';
import { nextTick, ref, watch } from 'vue';

var layOutSettingStore = useLayOutSettingStore();
var refresh = ref(true);
watch(
  () => layOutSettingStore.refresh,
  () => {
    refresh.value = false;
    nextTick(() => {
      refresh.value = true;
    });
  },
);
</script>

<style lang="scss" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.fade-enter-active {
  transition: all 1s;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
