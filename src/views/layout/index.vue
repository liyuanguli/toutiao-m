<template>
  <div class="layout-container">

<!-- 子路由出口 -->
<router-view />
<!-- /子路由出口 -->

<!-- 标签导航栏 -->
<van-tabbar  class="layout-tabber"  route>
  <van-tabbar-item to="/home" >
    <i slot="icon" class="toutiao toutiao-shouye"></i>
    <span class="text">首页</span>
    </van-tabbar-item>
  <van-tabbar-item to="/qa">
    <i slot="icon" class="toutiao toutiao-wenda"></i>
    <span class="text">问答</span>
    </van-tabbar-item>
  <van-tabbar-item to="/video">
    <i slot="icon" class="toutiao toutiao-shipin"></i>
    <span class="text">视频</span>
    </van-tabbar-item>
  <van-tabbar-item to="/my">
    <i slot="icon" class="toutiao toutiao-wode"></i>
    <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
    </van-tabbar-item>
</van-tabbar>
<!-- /标签导航栏 -->

  </div>
</template>

<script>

export default {
  name: 'LayoutIndex',
  props: {},
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}

}

</script>
<style lang='less' scoped>
.layout-container {
.layout-tabber{
  i.toutiao {
    font-size: 40px;
  }
  span.text{
    font-size: 20px;
  }
}
}
</style>
