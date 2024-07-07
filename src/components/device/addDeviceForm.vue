<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="编号" prop="id">
      <el-input v-model="ruleForm.id" />
    </el-form-item>
    <el-form-item label="设备名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="购入时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            value-format="YYYY-MM-DD"
            aria-label="Pick a date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item label="设备位置" prop="location">
      <el-segmented v-model="ruleForm.location" :options="locationOptions" />
    </el-form-item>

    <!-- 耗能等级 -->
    <el-form-item label="耗能等级">
      <el-radio-group v-model="ruleForm.type">
        <el-radio :value="1">等级1</el-radio>
        <el-radio :value="2">等级2</el-radio>
        <el-radio :value="3">等级3</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Create
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script lang="ts" setup>
import { reactive, ref } from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";

import useDevicesStore from "../../store/useDevicesStore";
import { useRouter } from "vue-router";

const store = useDevicesStore();
const router = useRouter();

interface RuleForm {
  id: string;
  name: string;
  date1: string;
  type: string;
  location: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  id: "",
  name: "",

  date1: "",
  type: "",

  location: "",
});

const locationOptions = ["客厅", "主卧", "厨房", "卫生间", "次卧"];

const rules = reactive<FormRules<RuleForm>>({
  id: [
    {
      required: true,
      message: "请输入编号",
      trigger: "blur",
    },
  ],

  name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],

  date1: [
    {
      type: "date",
      required: true,
      message: "请选择购买日期",
      trigger: "change",
    },
  ],

  location: [
    {
      required: true,
      message: "请选择设备位置",
      trigger: "change",
    },
  ],
  type: [
    {
      type: "array",
      required: true,
      message: "请选择耗能等级",
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      store.add(ruleForm);
      router.push("/device-manage/DeviceList");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
  