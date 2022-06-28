<template>
      <van-icon
        :name="value? 'star' : 'star-o'"
        :color="value?'#ffa500':'#777'"
        :loading="loading"
        @click="onCollect"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      required: true,
      type: Boolean
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
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，点击收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败请重试')
      }
      this.loading = false
    }
  }

}

</script>
<style lang='less' scoped>
</style>
