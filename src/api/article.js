import request from '@/utils/request'

// 获取文章分类
export const getContainerServe = () =>
  request.get('/my/cate/list')

// 新增分类
export const addChannelServe = (data) =>
  request.post('/my/cate/add',data)

// 编辑分类
export const updateChannelServe = (data) =>
  request.put('/my/cate/info',data)

// 删除分类
export const deleteChannelServe = (id) =>
  request.delete('/my/cate/del',{params : {id}})

// 获取文章列表
export const getArticleList = (params) =>
  request.get('/my/article/list',{params})

// 发布文章
export const addPublishArticle = (data) => {
  request.post('/my/article/add', data)
}


export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

export const artEditService = (data) =>
  request.put('my/article/info', data)

// 删除文章
export const artDelService = (id) =>
  request.delete('my/article/info', { params: { id } })
