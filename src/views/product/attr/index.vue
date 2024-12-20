<!--  -->
<template>
  <div>
    <Category :sence="sence" />
    <el-card>
      <div v-show="sence === 0">
        <el-button type="primary" icon="plus" @click="addAttr">
          添加平台属性
        </el-button>
        <el-table border :data="attrList" style="width: 100%; margin: 10px 0">
          <el-table-column
            label="序号"
            width="width"
            align="center"
            type="index"
            min-width="12px"
          ></el-table-column>
          <el-table-column
            header-align="center"
            label="属性名称"
            prop="attrName"
          ></el-table-column>
          <el-table-column header-align="center" label="属性值名称">
            <template #="{ row, column }">
              <el-tag
                v-for="(item, index) in row.attrValueList"
                style="margin-right: 10px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="操作">
            <template #="{ row, column, $index }">
              <el-button
                type="warning"
                size="small"
                icon="edit"
                @click="editSpu(row)"
              ></el-button>

              <el-popconfirm
                :title="`您确定要删除${row.attrName.substring(0, 10) + (row.attrName.length > 10 ? '...' : '')}?`"
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
      </div>
      <div v-show="sence === 1">
        <el-form ref="form" inline>
          <el-form-item label="属性名称">
            <el-input
              width="100px"
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="plus"
          :disabled="attrParams.attrName === ''"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button @click="sence = 0">取消</el-button>

        <el-table
          border
          style="width: 100%; margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="width"
            type="index"
            align="center"
            min-width="12px"
          ></el-table-column>
          <el-table-column header-align="center" label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                v-model="row.valueName"
                @blur="handleBlurValueName(row, $index)"
                placeholder="请输入属性值名称"
              ></el-input>
              <div v-else @click="handleClickValueName(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="delete"
                @click="deleteValueName($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="saveIsDisabled"
        >
          保存
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from '@/api/product/attr';
import { ref, watch, reactive, nextTick, computed } from 'vue';
import useCategoryStore from '@/store/modules/category';
import type {
  Attr,
  AttrResponseData,
  AttrValue,
} from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore();

const sence = ref(0);
const attrList = ref<Attr[]>();
const inputArr = ref<any[]>([]);

//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [
    //新增的属性值数组
  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
});

let saveIsDisabled = computed(() => attrParams.attrValueList.length === 0);

watch(
  () => categoryStore.c3Id,
  () => {
    getAttr();
  },
);

async function getAttr() {
  if (categoryStore.c3Id === '') return;
  const res: AttrResponseData = await reqAttr(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id,
  );

  attrList.value = res.data;
}

function addAttr() {
  sence.value = 1;
  Object.assign(attrParams, {
    attrName: '', //新增的属性的名字
    attrValueList: [
      //新增的属性值数组
    ],
    categoryId: categoryStore.c3Id, //三级分类的ID
    categoryLevel: 3, //代表的是三级分类
  });
}

function addAttrValue() {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  });
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus();
  });
}

function editSpu(attr: Attr) {
  Object.assign(attrParams, JSON.parse(JSON.stringify(attr)));
  sence.value = 1;
}
async function deleteSpu(attr: Attr) {
  const res: any = await reqRemoveAttr(attr.id as number);
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
  }
}

function deleteValueName($index: number) {
  attrParams.attrValueList.splice($index, 1);
  inputArr.value.splice($index, 1);
}
function handleBlurValueName(attrVal: AttrValue, $index: number) {
  if (attrVal.valueName.trim() === '') {
    deleteValueName($index);

    ElMessage({
      type: 'error',
      message: '属性值名称不能为空',
    });

    return;
  }

  let repeat = attrParams.attrValueList.find((item) => {
    if (item !== attrVal) {
      return item.valueName === attrVal.valueName;
    }
  });

  if (repeat) {
    deleteValueName($index);

    ElMessage({
      type: 'error',
      message: '属性值名称不能重复',
    });

    return;
  }

  attrVal.flag = false;
}

function handleClickValueName(attrVal: AttrValue, index: number) {
  attrVal.flag = true;
  nextTick(() => {
    inputArr.value[index].focus();
  });
}

async function save() {
  let res: any = await reqAddOrUpdateAttr(attrParams);
  if (res.code === 200) {
    sence.value = 0;
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    });
    getAttr();
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    });
  }
}

function cancel() {
  sence.value = 0;
}
</script>

<style lang="scss" scoped></style>
