<script lang="ts" setup>
import ArticleContainer from '@/components/ArticleContainer.vue'
import changeChannel from '@/views/article/components/changeChannel.vue'
import { getContainerServe, deleteChannelServe } from "@/api/article"
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const articleData = ref([])
const loading = ref(false)
const dialog = ref()
const getContainer = async () => {
  loading.value = true
  const res = await getContainerServe()
  articleData.value = res.data.data
  loading.value = false
}
getContainer()
const onEditChannel = (row) => {
  console.log(row)
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  await deleteChannelServe(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getContainer()
}
const onaddChannel = () => {
  dialog.value.open({})
}

const success = () => {
  getContainer()
}
</script>

<template>
  <article-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onaddChannel"> 添加分类 </el-button>
    </template>
    <el-table :data="articleData" v-loading="loading" style="width: 100%">
      <el-table-column label="序号" width="100" type="index" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button size="small" type="primary" :icon="Edit" circle @click="onEditChannel(scope.row)">
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" circle @click="onDelChannel(scope.row)">
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <changeChannel ref="dialog" @success="success"></changeChannel>
  </article-container>
</template>

<style lang="scss" scoped></style>
