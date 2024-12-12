import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/modules/user';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  var userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  //返回配置对象,headers属性请求头，给服务器携带公共参数
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理http网络错误
    let msg = '';
    const status = error.response.status;
    switch (status) {
      case 401:
        msg = 'token过期';
        break;
      case 403:
        msg = '无权访问';
        break;
      case 404:
        msg = '请求地址错误';
        break;
      case 500:
        msg = '服务器出现问题';
        break;
      default:
        msg = '无网络';
    }

    ElMessage({
      type: 'error',
      message: msg,
    });

    return Promise.reject(error);
  },
);

export default request;
