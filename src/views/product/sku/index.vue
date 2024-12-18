<!--  -->
<template>
  <el-card>
    <el-table style="width: 100%" :data="skuArray">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        min-width="22"
      ></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row, column }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100%; height: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量（g）" prop="weight"></el-table-column>
      <el-table-column label="价格（元）" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, column }">
          <el-button
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}?`"
            width="200px"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
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
      @current-change="getSkuArray"
      @size-change="getSkuArray"
    />
  </el-card>

  <el-drawer v-model="drawer" :direction="direction">
    <template #header>
      <h4>查看商品的详情</h4>
    </template>
    <template #default>
      <el-descriptions :column="1">
        <el-descriptions-item label="名称">
          {{ skuInfo?.skuName }}
        </el-descriptions-item>
        <el-descriptions-item label="描述">
          {{ skuInfo?.skuDesc }}
        </el-descriptions-item>
        <el-descriptions-item label="价格">
          {{ skuInfo?.price }}
        </el-descriptions-item>
        <el-descriptions-item label="平台属性">
          <el-tag
            size="small"
            v-for="item in skuInfo?.skuAttrValueList"
            style="margin-right: 10px"
            :key="item.id"
          >
            {{ item.valueName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="销售属性">
          <el-tag
            size="small"
            v-for="item in skuInfo?.skuSaleAttrValueList"
            style="margin-right: 10px"
            :key="item.id"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="商品图片">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              v-for="item in skuInfo?.skuImageList"
              :key="item.id"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {
  reqHasSku,
  onSaleSku,
  cancelSku,
  reqRemoveSku,
  reqSkuInfo,
} from '@/api/product/sku';
import type {
  HasSkuResponseData,
  Records,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import type { DrawerProps } from 'element-plus';

const skuArray = ref<Records>();
const currentPage = ref<number>(1);
const pageSize = ref<number>(9);
const total = ref<number>(400);
const direction = ref<DrawerProps['direction']>('rtl');
const drawer = ref<boolean>(false);
const skuInfo = ref<SkuData>();

onMounted(() => {
  getSkuArray();
});

function updateSku() {
  ElMessage({
    type: 'info',
    message: '该内容开发中~',
  });
}

async function findSku(data: SkuData) {
  skuInfo.value = {
    id: 0,
    isSale: 0,
    price: 0,
    skuDefaultImg: '',
    skuDesc: '',
    skuName: '',
    weight: '',
  };
  drawer.value = true;

  const res: SkuInfoData = await reqSkuInfo(data.id);
  skuInfo.value = res.data;
}

async function getSkuArray(pager = 1) {
  currentPage.value = pager;
  const res: HasSkuResponseData = await reqHasSku(
    currentPage.value,
    pageSize.value,
  );

  if (res.code === 200) {
    skuArray.value = res.data.records;
    total.value = res.data.total;
  }
}

async function updateSale(data: SkuData) {
  if (data.isSale === 0) {
    await onSaleSku(data.id);
    ElMessage({
      type: 'success',
      message: '上架成功',
    });
  } else {
    await cancelSku(data.id);
    ElMessage({
      type: 'success',
      message: '下架成功',
    });
  }

  getSkuArray(currentPage.value);
}

async function removeSku(skuId: number) {
  const res: any = await reqRemoveSku(skuId);
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' });
    getSkuArray(
      skuArray.value?.length! > 1 ? currentPage.value : currentPage.value - 1,
    );
  } else {
    ElMessage({ type: 'error', message: '删除失败' });
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions__label {
  width: 100px;
  display: inline-block;
  text-align: right;
  margin-right: 60px;
  vertical-align: top;
}
::v-deep .el-descriptions__content {
  width: calc(100% - 200px);
  display: inline-block;
  vertical-align: top;
}
</style>
