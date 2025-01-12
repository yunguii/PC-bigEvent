<script setup>
import ArticleContainer from '@/components/ArticleContainer.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { updateUserInfo } from '@/api/user'

const formRef = ref(null)
const { user: { id, username, nickname, email }, getUser } = useUserStore()
const form = ref({
  id: id,
  username: username,
  nickname: nickname,
  email: email
})

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { pattern: /^\S{2,10}$/, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  const res = formRef.value.validate()
  if (res) {
    await updateUserInfo(form.value)
    getUser()
    ElMessage.success('修改成功')
  }
}
</script>

<template>
  <article-container title="基本资料">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </article-container>
</template>
