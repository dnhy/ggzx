<!--  -->
<template>
  <Category :sence="sence" />
  <el-card>
    <div v-show="sence === 0">
      <el-button type="primary" icon="plus" @click="addSpu">添加SPU</el-button>
      <el-table border style="width: 100%; margin: 10px" :data="spuArray">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          min-width="12"
        />
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column prop="date" label="SPU操作">
          <template #="{ row, column, $index }">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="editSpu(row)"
            ></el-button>

            <el-popconfirm
              :title="`您确定要删除${row.spuName.substring(0, 10) + (row.spuName.length > 10 ? '...' : '')}?`"
              width="180px"
              icon="delete"
              @confirm="deleteSpu(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 9, 11]"
        :pager-count="5"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getSpu"
        @size-change="getSpu"
      />
    </div>
    <div v-show="sence === 1">
      <spuForm ref="spuFormRef" @changeScene="changeScene" />
    </div>
    <div v-show="sence === 2"></div>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { reqHasSpu, reqRemoveSpu } from '@/api/product/spu';
import spuForm from './components/spuForm.vue';
import useCategoryStore from '@/store/modules/category';
import { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();

const spuArray = ref<Records>();
const currentPage = ref<number>(1);
const pageSize = ref<number>(9);
const total = ref<number>(400);
const sence = ref(0);
const spuFormRef = ref<any>();

watch(
  () => categoryStore.c3Id,
  () => {
    getSpu();
  },
);

async function getSpu() {
  const res: HasSpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.c3Id,
  );

  if (res.code === 200) {
    spuArray.value = res.data.records;
    total.value = res.data.total;
  }
}

function editSpu(row: SpuData) {
  sence.value = 1;
  spuFormRef.value.initEidtSpuData(row);
}

function addSpu() {
  sence.value = 1;
  spuFormRef.value.initAddSpuData(categoryStore.c3Id);
}

async function deleteSpu(spuData: SpuData) {
  let res = await reqRemoveSpu(spuData.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
}

function changeScene(obj: any) {
  sence.value = obj.flag;
}
</script>

<style lang="scss" scoped></style>
