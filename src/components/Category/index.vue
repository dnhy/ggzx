<template>
  <!--  <svg-icon name="more" color="red" width="200px" height="200px"></svg-icon> -->
  <el-card style="margin: 10px 0">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          placeholder="Select"
          style="width: 240px"
          :disabled="sence !== 0"
          @change="handleSelectOne"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          placeholder="Select"
          style="width: 240px"
          :disabled="sence !== 0"
          @change="handleSelectTwo"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          placeholder="Select"
          :disabled="sence !== 0"
          style="width: 240px"
        >
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import useCategoryStore from '@/store/modules/category';

const props = defineProps(['sence']);
const { sence } = toRefs(props);
const categoryStore = useCategoryStore();
onMounted(async () => {
  categoryStore.c1Id = '';
  categoryStore.c2Id = '';
  categoryStore.c3Id = '';
  await categoryStore.getC1();
  categoryStore.c1Id = categoryStore.c1Arr[0].id;
  await categoryStore.getC2();
  categoryStore.c2Id = categoryStore.c2Arr[0].id;
  await categoryStore.getC3();
  categoryStore.c3Id = categoryStore.c3Arr[0].id;
});

function handleSelectOne() {
  categoryStore.c2Id = '';
  categoryStore.c3Id = '';
  categoryStore.getC2();
}

function handleSelectTwo() {
  categoryStore.c3Id = '';
  categoryStore.getC3();
}
</script>

<style lang="scss" scoped></style>
