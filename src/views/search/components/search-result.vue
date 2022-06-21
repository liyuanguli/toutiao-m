<template>
  <div class="search-result">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="加载失败，请点击重试"
  @load="onLoad"
>
  <van-cell
  v-for="(article,index) in list"
  :key="index"
  :title="article.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },

  components: {},

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 查询关键词
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }

}

</script>
<style lang='less' scoped>

</style>
