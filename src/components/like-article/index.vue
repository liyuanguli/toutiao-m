<template>
      <van-icon
        :name="value===1? 'good-job' : 'good-job-o'"
        :color="value===1?'#e5645f':'#777'"
        :loading="loading"
        @click="onCollect"
      />
</template>

<script>
import { addLike, deleteLike } from '../../api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },

  components: {},

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {
    async onCollect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败请稍后重试')
      }
      this.loading = false
    }
  }

}

</script>
<style lang='less' scoped>

</style>
