<template>
  <el-form style="margin: 10px" label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="请你输入SPU名称" v-model="skuParams.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="请你输入价格"
        v-model="skuParams.price"
        type="number"
      />
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input
        placeholder="请你输入重量"
        v-model="skuParams.weight"
        type="number"
      />
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SKU描述"
        v-model="skuParams.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="100px">
        <el-form-item
          :label="item.attrName"
          v-for="(item, index) in attr"
          :key="item.id"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              :value="`${item.id}:${attrValue.id}`"
              :label="attrValue.valueName"
              v-for="(attrValue, index) in item.attrValueList"
              :key="attrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="100px">
        <el-form-item
          :label="item.saleAttrName"
          v-for="(item, index) in saleAttr"
          :key="item.id"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              :value="`${item.id}:${saleAttrValue.id}`"
              :label="saleAttrValue.saleAttrValueName"
              v-for="(saleAttrValue, index) in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
  <el-form-item>
    <el-button type="primary" size="default" @click="save">保存</el-button>
    <el-button size="default" @click="cancel">取消</el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import type { SkuData, SpuData, SpuImg } from '@/api/product/spu/type';
import { reactive, ref } from 'vue';
import {
  reqAttr,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from '@/api/product/attr';
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
import { reqAddSku } from '@/api/product/spu';

const attr = ref<any[]>();
const saleAttr = ref<any[]>();
const imgArr = ref<SpuImg[]>();
const categoryStore = useCategoryStore();
const table = ref();
let $emit = defineEmits(['changeScene']);

//收集SKU的参数
let skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  //v-model收集
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述

  skuAttrValueList: [
    //平台属性的收集
  ],
  skuSaleAttrValueList: [
    //销售属性
  ],
  skuDefaultImg: '', //sku图片地址
});

function handler(skuData: any) {
  table.value.clearSelection();
  table.value.toggleRowSelection(skuData, true);
  skuParams.skuDefaultImg = skuData.imgUrl;
}

const initSkuData = async (c1Id: number, c2Id: number, spuData: SpuData) => {
  skuParams.category3Id = spuData.category3Id;
  skuParams.spuId = spuData.id as number;
  skuParams.tmId = spuData.tmId;

  let res = await reqAttr(c1Id, c2Id, spuData.category3Id);
  let res2 = await reqSpuHasSaleAttr(spuData.id as number);
  let res3 = await reqSpuImageList(spuData.id as number);

  attr.value = res.data;
  saleAttr.value = res2.data;
  imgArr.value = res3.data;
};
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' });
};
const save = async () => {
  skuParams.skuAttrValueList = attr.value?.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({
        attrId,
        valueId,
      });
    }
    return prev;
  }, []);

  skuParams.skuSaleAttrValueList = saleAttr.value?.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }
      return prev;
    },
    [],
  );

  let res = await reqAddSku(skuParams);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    });
    $emit('changeScene', { flag: 0, params: '' });
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    });
  }
};
defineExpose({
  initSkuData,
});
</script>

<style lang="scss" scoped>
.el-select {
  width: 200px;
}
</style>
