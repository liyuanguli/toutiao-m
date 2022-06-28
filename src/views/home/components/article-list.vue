<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="isreFreshloading"
    :success-duration="1000"
    :success-text="refreshSuccessText"
    @refresh="onRefresh">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
  >
  <article-item
  v-for="(article,index) in list" :key="index" :article="article"
  />
   <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
    </van-list>
   </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshloading: false,
      refreshSuccessText: '刷新成功'
    }
  },

  components: {
    ArticleItem
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles(
          {
            channel_id: this.channel.id,
            timestamp: this.timestamp || 1556789000001,
            with_top: 1
          }
        )
        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新时会触发该函数
    async onRefresh () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles(
          {
            channel_id: this.channel.id,
            timestamp: Date.now(),
            with_top: 1
          })
        // 2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...data.data.results)
        // 3.关闭下拉刷新的loading状态
        this.isreFreshloading = false
        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isreFreshloading = false
        this.refreshSuccessText = false
      }
    }
  }

}

</script>
<style lang='less' scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
