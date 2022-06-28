<template>
      <van-button
        v-if="isFollowed"
        class="follow-btn"
        round
        size="small"
        @click="onFollow"
        :loading="loading"
      >已关注</van-button>
      <van-button
        v-else
        class="follow-btn"
        type="info"
        color="#3296fa"
        round
        size="small"
        icon="plus"
        @click="onFollow"
        :loading="loading"
      >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user.js'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },

  watch: {},

  created () {},

  mounted () {},

  methods: {
    async onFollow () {
      this.loading = true // 展示关注按钮的loading状态
      try {
        if (this.isFollowed) {
          // 已关注，点击取消关注
          await deleteFollow(this.userId)
        } else {
          // 未关注，点击关注
          await addFollow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        let message = '操作失败，请稍后重试'
        if (error.response && error.response.status === 410) {
          message = '您不能关注您自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭关注按钮的loading状态
    }
  }

}

</script>
<style lang='less' scoped>

</style>
