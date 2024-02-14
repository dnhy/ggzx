<!--  -->
<template>
  <div class="container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <div class="tip-top">Hello</div>
          <div class="tip-btm">欢迎来到硅谷甄选</div>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn-login"
              type="primary"
              @click="login"
              :loading="isLoading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import type { loginResponseData, userResponseData, loginForm } from '@/api/type'
import { ElNotification } from 'element-plus'
import { dateState } from '@/utils/date'

const loginForm = reactive({ username: 'admin', password: '111111' })

const router = useRouter()
const userStore = useUserStore()

const isLoading = ref(false)

const loginForms = ref()

async function login() {
  await loginForms.value.validate()

  isLoading.value = true
  try {
    await userStore.userLogin(loginForm)
    let timeQuantum = dateState()
    isLoading.value = false

    ElNotification({
      title: `${timeQuantum}好！`,
      message: '欢迎回来',
      type: 'success',
    })
    router.push({
      path: './home',
    })
  } catch (error) {
    console.error('error :', error)
    isLoading.value = false

    ElNotification({
      title: '登录失败！',
      message: (error as Error).message,
      type: 'warning',
    })
  }
}

//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}
//定义表单校验需要配置对象
const rules = {
  //规则对象属性:
  //required,代表这个字段务必要校验的
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验,blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style lang="scss" scoped>
@import './css/index.scss';
</style>
