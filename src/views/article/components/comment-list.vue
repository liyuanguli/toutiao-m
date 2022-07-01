<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :immediate-check="false"
  @load="onLoad"
>
  <comment-item
   v-for="(item,index) in list"
  :key="index"
  :comment="item"
  @reply-click="$emit('reply-click',$event)"/>
</van-list>

</template>

<script>
import { getComments } from '../../../api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10
    }
  },

  components: {
    CommentItem
  },

  computed: {},

  watch: {

  },

  created () {
    // 手动初始化时，不会自动开启loading
    this.loading = true
    this.onLoad()
  },

  mounted () {
  },

  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 把文章评论的总数量传递到外部
        this.$emit('onload-success', data.data)

        // 3.将loading设置为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          // 没有就将finished设置为true
          this.finished = true
        }
      } catch (error) {

      }
    }
  }

}

</script>
<style lang='less' scoped>

</style>
