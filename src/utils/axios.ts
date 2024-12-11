import axios, { AxiosInstance } from 'axios'
import { useRequestStore } from '@/store/modules/request'

interface requestQueue {
  [key: string]: boolean
}

class HttpRequest {
  baseURL: string = import.meta.env.VITE_APP_BASE_API
  timeout: number = 3000
  queue: requestQueue = {} //用来维护请求队列{/:true}

  setInterceptor(instance: AxiosInstance, url: string) {
    instance.interceptors.request.use((config) => {
      if (Object.keys(this.queue).length === 0) {
        //首次加载开loading
      }
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.authoriaztion = token
      }

      // 设置请求的CancelToken，页面切换时执行所有请求的cancel函数，取消请求
      const CancelToken = axios.CancelToken
      config.cancelToken = new CancelToken((cancel) => {
        const requestStore = useRequestStore()
        requestStore.setCancelToken(cancel)
      })
      this.queue[url] = true
      return config
    })
    instance.interceptors.response.use(
      (response) => {
        // 响应成功，队列中删除url
        delete this.queue[url]
        if (Object.keys(this.queue).length === 0) {
          //删除后没有正在发送的请求关闭loading
        }
        return response.data
      },
      (error) => {
        delete this.queue[url]
        if (Object.keys(this.queue).length === 0) {
          //删除后没有正在发送的请求关闭loading
        }
        //处理http网络错误
        let msg = ''
        const status = error.response.status
        switch (status) {
          case 401:
            msg = 'token过期'
            break
          case 403:
            msg = '无权访问'
            break
          case 404:
            msg = '请求地址错误'
            break
          case 500:
            msg = '服务器出现问题'
            break
          default:
            msg = '无网络'
        }

        return Promise.reject(error)
      },
    )
  }
  request(options: any) {
    const instance = axios.create()
    const config = {
      baseUrl: this.baseURL,
      timeOut: this.timeout,
      ...options,
    }
    this.setInterceptor(instance, config.url)
    return instance(config)
  }
  get(url: string, data = {}) {
    return this.request({
      url,
      method: 'get',
      ...data,
    })
  }
  post(url: string, data = {}) {
    return this.request({
      url,
      method: 'post',
      ...data,
    })
  }
}

export default new HttpRequest()
