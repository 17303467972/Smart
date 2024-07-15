<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="id" align="center"/>
    <el-table-column prop="username" label="用户名" align="center" />
    <el-table-column prop="password" label="密码" align="center"/>
    <el-table-column prop="rolename" label="权限名称" align="center"/>
    <el-table-column  label="操作" />
    <template>
      <el-button type="danger">
        删除

      </el-button>
    </template> 

  </el-table>
</template>

<script >
import { getUserInfo } from '../../../server/api/api';


export default {
  data(){
    return{
      tableData:[],
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(params){
      getUserInfo(params).then(res=>{
        console.log(res);
        this.tableData = res.data
      })
    }
  }
}
</script>
