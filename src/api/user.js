/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

/*
    发送验证码
*/
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/sms/codes/:${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 发送请求头数据
    /* headers: {
      Authorization: `Bearer ${store.state.user.token}`
    } */
  })
}
