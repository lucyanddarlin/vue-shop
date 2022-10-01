/* 
    mock request
*/
// 导入 axios 
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建 axios 实例
const request = axios.create({
    // 基础路径
    baseURL: '/mock',
    // 超时时间
    timeout: 5000
    
})

// 配置请求拦截器
request.interceptors.request.use((config) => {
    //启动进度条
    nprogress.start()
    // 在 config 内是对请求头 header 的配置
    // 比如添加 token
    return config
})

// 配置相应拦截器
request.interceptors.response.use( res => {
    // 成功的回调函数
    // 停止进度条
    nprogress.done()
    return res.data
}, () => {
    // 失败的回调函数
    return Promise.reject(new Error('fail'))
})

// 向外共享 axios
export default request