<script setup>
import { getContainerServe } from '@/api/article'
import { ref } from 'vue'

const list = ref()
const getArticleList = async () => {
  const res = await getContainerServe()
  list.value = res.data.data
}
getArticleList()

const modelValue = defineModel()

</script>

<template>
  <el-select v-model="modelValue">
    <el-option v-for="item in list" :key="item.id" :label="item.cate_name" :value="item.id" />
  </el-select>
</template>
