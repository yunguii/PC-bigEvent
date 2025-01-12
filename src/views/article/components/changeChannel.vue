<script setup>
import { ref } from 'vue'
import { addChannelServe, updateChannelServe } from '@/api/article'
const dialogVisible = ref(false)
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

defineExpose({
  open
})

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入名字', trigger: 'change' },
    {
      pattern: /^\S{5,10}$/,
      message: '分类名必须是5-10位的非空字符',
      trigger: 'change'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入别名', trigger: 'change' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'change' }
  ]
}

const emit = defineEmits(['success'])
const form = ref()
const sumbit = async () => {
  await form.value.validate()
  formModel.value.id ? updateChannelServe(formModel.value) : addChannelServe(formModel.value)
  ElMessage({
    message: formModel.value.id ? '编辑成功' : '添加成功',
    type: 'success'
  })
  dialogVisible.value = false
  emit('success')
}

</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="500">
    <span>
      <el-form ref="form" :model="formModel" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名" />
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sumbit">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
