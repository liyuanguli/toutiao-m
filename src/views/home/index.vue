<template>
  <div class="home-container">
   <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed >
     <van-button
     class="search-btn"
     slot="title"
     type="info"
     size="small"
     round
     icon="search"
     to="/search"
     >搜索</van-button>
      </van-nav-bar>
   <!-- /导航栏 -->

    <!--频道列表  -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
       <van-tab
       :title="channel.name"
       v-for="channel in channels"
       :key="channel.id">
       <!-- 文章列表 -->
              <article-list :channel='channel'/>
       <!-- /文章列表 -->
       </van-tab>
       <div class="placeholder" slot="nav-right"></div>
       <div class="hamburger-btn" slot="nav-right" @click="isChannelEditShow=true">
         <i class="toutiao toutiao-gengduo"></i>
       </div>
   </van-tabs>
    <!--/频道列表  -->

    <!-- 频道编辑弹出层 -->
    <van-popup
        v-model="isChannelEditShow"
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '100%' }"
    >
    <channel-edit
    :my-channels="channels"
    :active="active"
    @update-active="onUpdateActive"></channel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage'

export default {
  name: 'HomeContainer',
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  computed: {
    ...mapState(['user'])
  },

  watch: {},

  created () {
    this.loadChannels()
  },

  mounted () {},

  methods: {
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 已登录，请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有就拿来展示
          if (localChannels) {
            channels = localChannels
          } else {
          // 没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  }

}

</script>
<style lang='less' scoped>
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
 /deep/ .van-nav-bar__title {
    max-width: unset;
}
  .search-btn{
    width: 532px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs{
.van-tabs__wrap{
  position: fixed;
  left: 0;
  right: 0;
  top: 92px;
  z-index: 1;
  height: 82px;
}
.van-tab{
  min-width: 200px;
  border-right: 1px solid #edeff3;
  font-size: 30px;
  color: #777;
}
.van-tabs--active{
  color: #333;
}
.van-tabs__nav{
  padding-bottom: 0;
  padding-right: 0;
}
.van-tabs__line{
  bottom: 8px;
  width: 31px !important;
  height: 6px;
  background-color: #3296fa;
}
.placeholder{
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.hamburger-btn{
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao{
    font-size: 33px;
  }
  &:before{
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
  }
}
</style>
