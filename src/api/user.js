/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

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
