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
      <el-select v-model="ruleForm.name" placeholder="设备名称">
        <el-option label="空调" value="空调" />
        <el-option label="台灯" value="台灯" />
        <el-option label="电视" value="电视" />
      </el-select>
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
        确定
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>
  
  <script lang="ts" setup>
import { defineProps, defineEmits,reactive, ref ,watch} from "vue";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";

import useDevicesStore from "../../store/useDevicesStore";
import { useRouter } from "vue-router";

const store = useDevicesStore();
const router = useRouter();

const props = defineProps({
  initialData: Object as () => RuleForm,
  index: Number,
  isEditing: Boolean // 添加一个标志，表示是否是编辑模式
});
const emit = defineEmits(['form-submitted']);


interface RuleForm {
  id: string;
  name: string;
  date1: string;
  type: string;
  location: string;
}

const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();



// Initialize ruleForm with default values
const ruleForm = reactive<RuleForm>({
  id: '',
  name: '',
  date1: '',
  type: '',
  location: ''
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


// 监听 props.initialData 的变化
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(ruleForm, newData);
    }
  },
  { deep: true, immediate: true }
);


// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log('submit!');

      
//       // Depending on the mode, either update or add the data
//       if (props.isEditing) {
//         store.updateData(props.index, ruleForm);
//       } else {
//         store.add(ruleForm);
//       }
//       router.push('/device-manage/DeviceList');
//     } else {
//       console.log('error submit!', fields);
//     }
//   });
//   emit('form-submitted');
// };


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('提交成功！');
      const store = useDevicesStore();
      if (props.isEditing) {
        store.updateData(props.index, ruleForm);
      } else {
        store.add(ruleForm);
      }
      router.push('/device-manage/DeviceList');
      emit('form-submitted');
    } else {
      console.log('error submit!', fields);
    }
  });
};




const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  if (props.isEditing) {
    // If in editing mode, reset to initial data
    Object.assign(ruleForm, props.initialData);
  } else {
    // If in add mode, reset to default empty values
    Object.assign(ruleForm, {
      id: '',
      name: '',
      date1: '',
      type: '',
      location: ''
    });
  }
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
</script>
  