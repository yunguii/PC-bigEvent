import request from '@/utils/request'

export const userRegisterServe = ({username, password, repassword}) =>
  request.post('/api/reg',{username, password, repassword})

export const userLoginServe = ({username, password}) =>
  request.post('/api/login',{username, password})

export const getUserInfo = () => {
  request.get('/my/userinfo')
}
