import Axios from 'axios'
import {Promise} from 'core-js'
import { ElMessage } from 'element-plus'
const service = Axios.create({
	baseURL: 'http://localhost:3000/api',
	timeout:3000,
	headers: {
		'Content-Type': 'application/json',
	  },

})
 
service.interceptors.request.use((config) => {
	console.log(config, '发送请求前config信息')
	return config
}, error => {
	return Promise.reject(error)
})
 
service.interceptors.response.use((response) => {
	let {status,message }=response.data
	if(status !==200){
		ElMessage({message: message || 'error',type:'warning'})
	}
	console.log('接受的数据')
	return response
}, error => {
	return Promise.reject(error)
})
 
export default service