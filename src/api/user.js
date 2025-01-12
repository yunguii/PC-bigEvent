import request from '@/utils/request'

export const userRegisterServe = ({username, password, repassword}) =>
  request.post('/api/reg',{username, password, repassword})

export const userLoginServe = ({username, password}) =>
  request.post('/api/login',{username, password})

export const getUserInfo = () =>
   request.get('/my/userinfo')

//更新用户基本资料
export const updateUserInfo = (data) =>
  request.put('/my/userinfo', data)

//更新头像
export const userUploadAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

//更新密码
export const userUpdatePassService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
