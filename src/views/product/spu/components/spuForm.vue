<template>
  <el-form style="margin: 10px" label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择" v-model="SpuParams.tmId">
        <el-option
          :label="item.tmName"
          :value="item.id"
          v-for="(item, index) in allTradeMark"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="SpuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        class="avatar-uploader"
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
        :on-success="onUploaded"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '暂无数据可选择'
        "
        class="m-2"
        style="width: 180px"
      >
        <el-option
          :label="item.name"
          :value="item.id + ':' + item.name"
          v-for="(item, index) in unSelectSaleAttr"
        />
      </el-select>
      <el-button
        type="primary"
        icon="plus"
        style="margin-left: 20px"
        :disabled="!saleAttrIdAndValueName"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="row.id"
              class="mx-1"
              closable
              style="margin: 0 8px"
              @close="row.spuSaleAttrValueList.splice($index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-model="row.saleAttrValue"
              v-if="row.flag === true"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
              @blur="toLook(row)"
            ></el-input>
            <el-button
              v-else
              size="small"
              icon="Plus"
              @click="toEdit(row, $index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="isSaveDisabled"
      >
        保存
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu/index';
import type {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  Trademark,
  SpuImg,
  SaleAttr,
  HasSaleAttr,
  SaleAttrValue,
} from '@/api/product/spu/type';
import { ref, nextTick, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';

const $emit = defineEmits(['changeScene']);

let allTradeMark = ref<Trademark[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
let SpuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
});
let saleAttrIdAndValueName = ref<string>('');

// 组件绑定数据
let imgList = ref<SpuImg[]>([]);
let saleAttr = ref<SaleAttr[]>([]);

let dialogVisible = ref<boolean>(false);
let dialogImageUrl = ref<string>('');
let inputArr = ref<any>([]);

let unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName;
    });
  });
  return unSelectArr;
});

let isSaveDisabled = computed(() => {
  return SpuParams.value.spuName === '' || saleAttr.value.length === 0;
});

const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleRemove = () => {};

const handlerUpload = (file: any) => {
  if (
    file.type === 'image/png' ||
    file.type === 'image/jpeg' ||
    file.type === 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      });
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    });
    return false;
  }
};

function onUploaded(response: any) {
  // 201上传失败处理
  if (response.code !== 200) {
    imgList.value.splice(imgList.value.length - 1, 1);
    ElMessage({
      type: 'error',
      message: response.message,
    });
  }
}

function clearData() {
  imgList.value = [];
  saleAttr.value = [];
}

async function save() {
  SpuParams.value.spuImageList = imgList.value.map((e) => ({
    imgName: e.name,
    imgUrl: (e.response && e.response.data) || e.url,
  }));
  SpuParams.value.spuSaleAttrList = saleAttr.value;
  let res = await reqAddOrUpdateSpu(SpuParams.value);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: SpuParams.value.id ? '更新成功' : '添加成功',
    });
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    });
  } else {
    ElMessage({
      type: 'error',
      message: SpuParams.value.id ? '更新失败' : '添加失败',
    });
  }

  clearData();
}

function cancel() {
  clearData();
  $emit('changeScene', { flag: 0, params: 'update' });
}

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(':');
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttr.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = '';
};

const toEdit = (row: SaleAttr, $index: number) => {
  row.flag = true;
  row.saleAttrValue = '';
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };
  if (saleAttrValue?.trim() === '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空的',
    });
    return;
  }
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue;
  });
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复',
    });
    return;
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  row.flag = false;
};
async function initAddSpuData(c3Id: number | string) {
  Object.assign(SpuParams.value, {
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
    id: '',
  });
  saleAttr.value = [];
  saleAttrIdAndValueName.value = '';
  SpuParams.value.category3Id = c3Id;
  let res: AllTradeMark = await reqAllTradeMark();
  let res1: HasSaleAttrResponseData = await reqAllSaleAttr();
  allTradeMark.value = res.data;
  allSaleAttr.value = res1.data;
}

async function initEidtSpuData(spuData: SpuData) {
  SpuParams.value = JSON.parse(JSON.stringify(spuData));

  //获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark();
  //获取某一个品牌旗下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spuData.id as number);
  //获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spuData.id as number,
  );
  //获取整个项目全部SPU的销售属性
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr();
  allTradeMark.value = result.data;
  imgList.value = result1.data.map((e) => ({
    name: e.imgName,
    url: e.imgUrl,
  }));
  allSaleAttr.value = result3.data;

  saleAttr.value = result2.data;
}

defineExpose({ initAddSpuData, initEidtSpuData });
</script>

<style lang="scss" scoped>
.avatar-uploader {
  // border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
