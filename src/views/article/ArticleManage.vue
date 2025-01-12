<script setup>
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import channelSelect from './components/channelSelect.vue'
import { getArticleList, artDelService } from '@/api/article'
import { formatTime } from '@/utils/format'
import changeArticle from './components/changeArticle.vue'
const onDelArticle = async (row) => {
  await ElMessageBox.confirm('你确认删除该文章信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getList()
}

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const loading = ref(false)
const articlelist = ref([])
const total = ref(0)
const getList = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  articlelist.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getList()

const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getList()
}

const submitForm = () => {
  params.value.pagenum = 1
  getList()
}
const resetForm = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getList()
}

const articleEdit = ref()
const onAddArticle = () => {
  articleEdit.value.open({})
}
const onEditArticle = (row) => {
  articleEdit.value.open({ row })
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getList()
}
</script>

<template>
  <article-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle"> 发布文章 </el-button>
    </template>
    <!-- 表单部分 -->
    <el-form :inline="true" style="max-width: 600px">
      <el-form-item label="文章分类" style="width:180px">
        <channelSelect v-model="params.cate_id"></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态" style="width:180px">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布" />
          <el-option label="草稿" value="草稿" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          搜索
        </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 内容部分 -->
    <el-table style="width: 100%" :data="articlelist" v-loading="loading">
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" :icon="Edit" circle @click="onEditArticle(scope.row)">
          </el-button>
          <el-button size="small" type="danger" :icon="Delete" circle @click="onDelArticle(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <el-pagination v-model:current-page="params.pagenum" v-model:page-size="params.pagesize" :page-sizes="[2, 3, 5, 10]"
      :background="true" layout="jumper,total, sizes, prev, pager, next" :total="total" @size-change="onSizeChange"
      @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
  </article-container>
  <!-- 抽屉部分 -->
  <change-article ref="articleEdit" @success="onSuccess"></change-article>
</template>

<style lang="scss" scoped></style>
