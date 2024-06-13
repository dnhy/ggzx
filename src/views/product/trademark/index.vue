<!--  -->
<template>
  <div>
    <el-card style="margin: 10px">
      <el-button type="primary" icon="plus" @click="addTradeMark">
        添加品牌
      </el-button>

      <el-table border style="width: 100%; margin: 10px" :data="tradeArray">
        <el-table-column label="序号" align="center" type="index" />
        <el-table-column prop="tmName" label="品牌名称" />
        <el-table-column label="品牌logo">
          <template #="{ row, column, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="品牌操作">
          <template #="{ row, column, $index }">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="editTradeMark(row)"
            ></el-button>

            <el-popconfirm
              :title="`您确定要删除${row.tmName.substring(0, 10) + (row.tmName.length > 10 ? '...' : '')}?`"
              width="180px"
              icon="delete"
              @confirm="deleteTradeMark(row.id)"
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
        @current-change="getHasTradeMark"
        @size-change="sizeChangeRefresh"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form
        style="width: 80%"
        :model="tradeParams"
        :rules="rules"
        ref="tradeFormRef"
      >
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input v-model.trim="tradeParams.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌logo" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeParams.logoUrl"
              :src="tradeParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirmTradeMark">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { reqHasTradeMark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'

import type {
  Records,
  TradeMark,
  TradeMarkResponseData,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import {
  reqAddTradeMark,
  reqEditTradeMark,
  reqDeleteTradeMark,
} from '@/api/product/trademark'

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(400)
const tradeArray = ref<Records>([])
const dialogFormVisible = ref<boolean>(false)
const tradeParams = reactive<TradeMark>({ tmName: '', logoUrl: '' })
const title = computed(() => {
  return tradeParams.id ? '修改品牌' : '添加品牌'
})
const tradeFormRef = ref()

const tmNameValidate = (rule: any, value: any, callback: any) => {
  value.length >= 2
    ? callback()
    : callback(new Error('品牌名称位数大于等于两位'))
}

const logoUrlValidate = (rule: any, value: any, callback: any) => {
  value != '' ? callback() : callback(new Error('LOGO图片务必上传'))
}

const rules = {
  tmName: [
    {
      required: true,
      validator: tmNameValidate,
      trigger: 'blur',
    },
  ],
  logoUrl: [{ required: true, validator: logoUrlValidate }],
}

const getHasTradeMark = async (page = 1) => {
  currentPage.value = page
  let result: TradeMarkResponseData = await reqHasTradeMark(
    currentPage.value,
    pageSize.value,
  )
  if (result.code == 200) {
    tradeArray.value = result.data.records
    total.value = result.data.total
  }
}

onMounted(() => {
  getHasTradeMark()
})

function sizeChangeRefresh() {
  getHasTradeMark()
}

function addTradeMark() {
  dialogFormVisible.value = true
  tradeParams.id = undefined
  tradeParams.logoUrl = ''
  tradeParams.tmName = ''

  clearValidate()
}

function clearValidate() {
  nextTick(() => {
    tradeFormRef.value.clearValidate('logoUrl')
    tradeFormRef.value.clearValidate('tmName')
  })
}
function editTradeMark(row: TradeMark) {
  dialogFormVisible.value = true
  // tradeParams.id = row.id
  // tradeParams.logoUrl = row.logoUrl
  // tradeParams.tmName = row.tmName
  Object.assign(tradeParams, row)

  clearValidate()
}
async function confirmTradeMark() {
  try {
    await tradeFormRef.value.validate()
  } catch (error) {
    return
  }

  dialogFormVisible.value = false
  let result: any = tradeParams.id
    ? await reqEditTradeMark(tradeParams)
    : await reqAddTradeMark(tradeParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: tradeParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    dialogFormVisible.value = false

    var curr = tradeParams.id
      ? currentPage.value
      : tradeArray.value.length + 1 > pageSize.value
        ? currentPage.value + 1
        : currentPage.value

    getHasTradeMark(curr)
  } else {
    //添加品牌失败
    ElMessage({
      type: 'error',
      message: tradeParams.id ? '修改品牌失败' : '添加品牌失败',
    })
    //关闭对话框
    dialogFormVisible.value = false
  }
}

function cancel() {
  dialogFormVisible.value = false
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type.indexOf('image') == -1) {
    ElMessage.error('请上传图片类型的文件')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('请上传2M以内大小的图片')

    return false
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  tradeParams.logoUrl = response.data
  tradeFormRef.value.clearValidate('logoUrl')
}

async function deleteTradeMark(id: number) {
  let res: any = await reqDeleteTradeMark(id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })

    getHasTradeMark(
      tradeArray.value.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
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
