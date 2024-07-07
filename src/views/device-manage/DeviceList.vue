<template>


    <el-button plain @click="dialogVisible = true" type="primary">
      新增设备
  </el-button>

  <el-dialog v-model="dialogVisible" title="新增设备" width="500" draggable>
    
    <addDeviceForm>

    </addDeviceForm>
  </el-dialog>


  <el-table :data="store.list" style="width: 100%">
    <!-- <el-table-column prop="id" label="#ID" width="60">

    </el-table-column> -->
    <el-table-column label="设备名称" width="180">
      <template #default="scope">
        <!-- <router-link :to="{name:'about',query:{id:scope.row.id}}">
          {{ scope.row.name }}
        </router-link> -->
        <el-link type="primary" @click="jump(scope.row)">
          <b style="margin-left: 10px">
            {{ scope.row.name }}
          </b>
        </el-link>
      </template>
    </el-table-column>

    <el-table-column label="所处位置" prop="location" />
    <el-table-column label="耗能等级" prop="type" />
    <el-table-column label="购入时间" prop="date1" />

    <el-table-column label="操作" width="180">
      <template #default="scope">
        <div>
          <el-button type="warning" round @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" round @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 设备详情展示 -->

   <el-dialog v-model="dialogVisible1" title="设备详情" :fullscreen="true">
        <div>
          111


        </div>
    </el-dialog>
</template>
  
  <script setup>
import useDevicesStore from "../../store/useDevicesStore";
import { useRouter } from 'vue-router'
import addDeviceForm from "../../components/device/addDeviceForm.vue";
import { ref } from 'vue'
//表格dialog
const dialogVisible = ref(false)
//设备详情dialog
const dialogVisible1 = ref(false)
//pinia数据存储
const store = useDevicesStore();
//编辑
const handleEdit = (item) => {
  console.log(item);
};
//删除
const handleDelete = (item) => {
  console.log(item);
};
//1、要么就跳转到指定的路由，要么就用dialog，这个目前没有用到
const router = useRouter()

//预览
const jump = (item) => {

    dialogVisible1.value = true
    currentItem.value = item
}
const currentItem = ref({})

// const jump = () => {
  
//   router.push('/device-manage/SmartDevice')
// }

</script>
  