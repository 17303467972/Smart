<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center" />
      <el-table-column prop="username" label="用户名" align="center" />
      <el-table-column prop="password" label="密码" align="center" />
      <el-table-column prop="rolename" label="权限名称" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="warning" round @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm title="你确定要删除吗？" @confirm="handleDelete(scope.row)" width="220px">
            <template #reference>
              <el-button type="danger" round 
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="编辑信息" width="500" draggable>
      <el-form
        ref="updateFormRef"
        :model="updateForm"
        :rules="rules"
        label-width="80px"
        class="ruleForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="updateForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updateForm.password" type="password" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm()"> 更新 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { onMounted } from "vue";
import { getUserInfo, putUser } from "../../../server/api/api";
import axios from "axios";

//获取数据库数据
const tableData = ref([]);

onMounted(() => {
  getData();
});
const getData = async (params) => {
  var res = await getUserInfo(params);
  console.log(res.data);
  tableData.value = res.data;
};
//更新对话框
const dialogVisible = ref(false);

const updateFormRef = ref();
const currentItem = ref({});

const updateForm = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const handleEdit = (item) => {
  currentItem.value = item;

  updateForm.username = item.username;
  updateForm.password = item.password;

  dialogVisible.value = true;
  console.log(item);
};

const handleConfirm = () => {
  updateFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      await putUser(currentItem.value.id, updateForm.value);
      dialogVisible.value = false;

      await getData();
    } else {
      console.log("error submit!", fields);
    }
  });
};
//删除
const handleDelete = async ({id}) => {
 await axios.delete(`/api/getUser/${id}`)
}
</script>
