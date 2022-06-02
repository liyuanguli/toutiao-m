/**
 * 频道请求模块
 */
import request from '@/utils/request'

/*
     获取所有频道列表
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/*
     添加用户频道
 */
export const addUserChannel = channel => {
  return request({
    method: 'OPTIONS',
    url: '/app/v1_0/user/channels',
    data: {
      channel: [channel]
    }
  })
}

/*
     删除用户指定频道
 */
export const deleteUserChannel = channelID => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelID}`
  })
}
