import Axios from 'axios'
import {Promise} from 'core-js'
// import { Message } from '@element-plus/icons-vue'
const service = Axios.create({
	baseURL: '/api',
	timeout:3000
})
 
service.interceptors.request.use((config) => {
	console.log(config, '发送请求前config信息')
	return config
}, error => {
	return Promise.reject(error)
})
 
service.interceptors.response.use((response) => {
	let {status,message }=response.data
	// if(status !==200){
	// 	// Message({message: message || 'error',type:'warning'})
	// }
	console.log('接受的数据')
	return response.data
}, error => {
	return Promise.reject(error)
})
 
export default service