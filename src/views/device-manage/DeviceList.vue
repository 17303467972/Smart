<template>


    <el-button plain @click="dialogVisible = true" type="primary">
      新增设备
  </el-button>

  <el-dialog v-model="dialogVisible" title="新增设备" width="500" draggable>
    
    <addDeviceForm @form-submitted="handleFormSubmitted"> 

    </addDeviceForm>
  </el-dialog>


  <el-table :data="store.list" style="width: 100%">
    <el-table-column prop="id" label="#ID" width="60">

    </el-table-column>
    <el-table-column label="设备名称" width="180">
      <template #default="scope">
        <!-- <router-link :to="{name:'about',query:{id:scope.row.id}}">
          {{ scope.row.name }}
        </router-link> -->
        <el-link type="primary" @click="jump(scope.row.id)">
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
          <el-button type="warning" round @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗？" @confirm="handleDelete(scope.$index)" width="220px">
            <template #reference>
              <el-button type="danger" round 
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 设备详情展示 -->

   <el-dialog v-model="dialogVisible1" title="设备操作"  draggable>
        <div>
          <SmartDevice/>
        </div>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="设备操作" draggable>
        <div>
          <taideng/>
        </div>
    </el-dialog>
    <el-dialog v-model="dialogVisible3" title="设备操作"  draggable>
        <div>
          <dianshi/>
        </div>
    </el-dialog>



     <!-- 编辑设备对话框 -->
  <el-dialog v-model="isFormVisible" title="编辑信息" width="500px" draggable>
    <addDeviceForm
      :initialData="selectedData"
      :index="selectedIndex"
      :isEditing="true"
      @form-submitted="handleFormSubmitted"
    />
  </el-dialog>

</template>
  
  <script setup>
import useDevicesStore from "../../store/useDevicesStore";
import { useRouter } from 'vue-router'
import addDeviceForm from "../../components/device/addDeviceForm.vue";
import { ref ,reactive} from 'vue'
import SmartDevice from "./SmartDevice.vue";

import taideng from "../../components/device/taideng.vue";
import dianshi from "../../components/device/dianshi.vue"

//表格dialog
const dialogVisible = ref(false)
//设备详情dialog
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)

//pinia数据存储
const store = useDevicesStore();

const isFormVisible = ref(false);
const selectedData = ref(null);
const selectedIndex = ref(null);

//编辑
const handleEdit = (row, index) => {
  selectedData.value = { ...row }; // 设置选中的数据
  selectedIndex.value = index; // 记录索引
  isFormVisible.value = true; // 显示编辑对话框
};

// 处理表单提交后的逻辑
const handleFormSubmitted = () => {
  isFormVisible.value = false;
  dialogVisible.value = false;
};
//删除
const handleDelete = (index) => {
  store.deleteData(index);
};
//1、要么就跳转到指定的路由，要么就用dialog，这个目前没有用到
const router = useRouter()

//预览
// const jump = (item) => {

//     dialogVisible1.value = true
//     currentItem.value = item
// }
// const currentItem = ref({})

const currentItem = ref({})
const jump = (id) => {
  
  // console.log("跳转",id)

  if(id==1){
    dialogVisible1.value = true
    currentItem.value = item

    // router.push('/device-manage/SmartDevice')
  }
  if(id==2){
    dialogVisible2.value = true
    currentItem.value = item
    // router.push('/device-manage/Taideng')
  }
  if(id==3){
    dialogVisible3.value = true
    currentItem.value = item
    // router.push('/device-manage/Dianshi')
  }

  
  // router.push('/device-manage/'+id)

}

</script>
  