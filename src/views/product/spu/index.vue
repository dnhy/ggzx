<!--  -->
<template>
  <div>
    <Category :sence="sence" />
    <el-card>
      <div v-show="sence === 0">
        <el-button type="primary" icon="plus" @click="addSpu">
          添加SPU
        </el-button>
        <el-table border style="width: 100%; margin: 10px 0" :data="spuArray">
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
                type="primary"
                icon="plus"
                size="small"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="InfoFilled"
                size="small"
                @click="findSku(row)"
              ></el-button>

              <el-popconfirm
                :title="`您确定要删除${row.spuName.substring(0, 10) + (row.spuName.length > 10 ? '...' : '')}?`"
                width="180px"
                icon="delete"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="delete"
                  ></el-button>
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
      <div v-show="sence === 2">
        <skuForm ref="skuFormRef" @changeScene="changeScene" />
      </div>
      <!-- dialog对话框:展示已有的SKU数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu';
import spuForm from './components/spuForm.vue';
import skuForm from './components/skuForm.vue';
import useCategoryStore from '@/store/modules/category';
import {
  HasSpuResponseData,
  Records,
  SkuData,
  SkuInfoData,
  SpuData,
} from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
let categoryStore = useCategoryStore();

const spuArray = ref<Records>();
const currentPage = ref<number>(1);
const pageSize = ref<number>(9);
const total = ref<number>(400);
const sence = ref(0);
const spuFormRef = ref<any>();
const skuFormRef = ref<any>();
//存储全部的SKU数据
let skuArr = ref<SkuData[]>([]);
let show = ref<boolean>(false);
watch(
  () => categoryStore.c3Id,
  () => {
    if (categoryStore.c3Id === '') return;
    getSpu();
  },
);

async function getSpu(pager = 1) {
  const res: HasSpuResponseData = await reqHasSpu(
    pager,
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
  if (obj.params == 'update') {
    //更新留在当前页
    getSpu(currentPage.value);
  } else {
    //添加留在第一页
    getSpu();
  }
}

function addSku(skuData: any) {
  sence.value = 2;
  skuFormRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, skuData);
} //查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number);
  if (result.code == 200) {
    skuArr.value = result.data;
    //对话框显示出来
    show.value = true;
  }
};
</script>

<style lang="scss" scoped></style>
