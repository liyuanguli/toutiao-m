<template>

<van-cell class="article-item">
<div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
<div slot="label">
  <div v-if="article.cover.type === 3" class="cover-wrap">
  <div
  class="cover-item"
  v-for="(img,index) in article.cover.images"
  :key="index"
  >
  <van-image
    class="cover-wrap-img"
    :src="img"
    fit="cover"
/>
  </div>
  </div>
  <div class="label-info-wrap">
    <span>{{article.id}}</span>
    <span>{{article.pubdate| relativeTime}}</span>
  </div>
</div>
<van-image
v-if="article.cover.type === 1"
class="right-cover"
fit="cover"
slot="default"
:src="article.cover.images[0]"
/>
</van-cell>
</template>

<script>

export default {
  name: 'ArticleItem',
  props: {
    article: {
      required: true,
      type: Object
    }
  },
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  watch: {},

  created () {
  },

  mounted () {},

  methods: {}

}
</script>
<style lang='less' scoped>
.article-item{
  .title{
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    padding-left: 25px;
    width: 232px;
    height: 146px;
  }
  .right-cover{
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap{
    display: flex;
    padding: 30px 0;
    .cover-item{
      flex: 1;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
      .cover-wrap-img{
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
