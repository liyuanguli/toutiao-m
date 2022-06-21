<template>
  <div class="search-suggestion">
    <van-cell  icon="search"
    v-for="(text,index) in suggestions"
    :key="index"
    @click="$emit('search',text)">
    <div slot="title" v-html="highlight(text)"></div>
    </van-cell>

  </div>
</template>

<script>
import { getSearchSuggestions } from '../../../api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [] // 联想建议数据列表
    }
  },

  components: {},

  computed: {},

  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions()
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },

  created () {},

  mounted () {},

  methods: {
    async loadSearchSuggestions () {
      try {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }

}

</script>
<style lang='less' scoped>
.search-suggestion{
  /deep/span.active{
    color: #3296fa !important;
  }
}
</style>
