<template>
  <div>
    <van-nav-bar
      :title="comment.reply_count>0?`${comment.reply_count}条回复` : '暂无回复'"
    >
    <van-icon
    slot="left"
    name="cross"
    @click="$emit('close')">
    </van-icon>
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
        <comment-item
        :comment="comment">
        </comment-item>
        <!-- /当前评论项 -->

        <!-- 评论回复列表 -->
        <van-cell title="全部回复"></van-cell>
        <comment-list
        :source="comment.com_id"
        :list="commentList"
        type='c'/>
    <!-- /评论回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow=true">
        写评论
      </van-button>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
    <comment-post
    :target="comment.com_id"
    @post-success="onPostSuccess"/>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },

  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {
    async onPostSuccess () {
      // 更新回复的数量
      this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复的内容展示到列表的顶部
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: null,
        limit: 10
      })
      const { results } = data.data
      this.commentList.unshift(results[0])
    }
  }

}

</script>
<style lang='less' scoped>
.scroll-wrap{
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88;
  overflow-y: auto;
}
.post-wrap{
  position: fixed;
  bottom: 0;
  left:0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top:1px solid #d8d8d8 ;
  .post-btn{
    width: 60%;
  }
}
</style>
