<template>
  <div class="my-container">
    <!-- 已登录头部 -->
<div class="header user-info" v-if="user">
  <div class="base-info">
    <div class="left">
<van-image
round
fit="cover"
class="avator"
  :src="userInfo.photo"
/>
<span class="name">{{userInfo.name}}</span>
    </div>
    <div class="right">
<van-button size="mini" round to="/user/profile">编辑资料</van-button>
    </div>
  </div>
  <div class="data-status">
    <div class="data-item">
      <span class="count">10</span>
      <span class="text">头条</span>
    </div>
    <div class="data-item">
      <span class="count">25</span>
      <span class="text">关注</span>
    </div>
    <div class="data-item">
      <span class="count">12</span>
      <span class="text">粉丝</span>
    </div>
    <div class="data-item">
      <span class="count">51</span>
      <span class="text">获赞</span>
    </div>
  </div>
</div>
    <!-- /已登录头部 -->

    <!-- 未登录头部 -->
<div class="header not-login" v-else>
  <div class="login-btn" @click="$router.push('/login')">
    <img vlass="mobile-img" src="~@/assets/mobile.png" alt="">
    <span class="text">登录 / 注册</span>
  </div>
</div>
    <!-- /未登录头部 -->

<van-grid :column-num="2" class="grid-nav" clickable>
<van-grid-item class="grid-item">
  <i slot="icon" class="toutiao toutiao-shoucang"></i>
  <span slot="text" class="text">收藏</span>
</van-grid-item>
<van-grid-item class="grid-item">
  <i slot="icon" class="toutiao toutiao-lishi"></i>
  <span slot="text" class="text">历史</span>
</van-grid-item>
</van-grid>

<van-cell class="message" title="消息通知" is-link />
<van-cell class="mb-9"  title="小智同学" is-link />
<van-cell v-if= "user" class="logout-cell"  title="退出登录" @click="onLogout" clickable />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
export default {
  name: 'MyContainer',
  props: {},
  data () {
    return {
      userInfo: {}// 用户信息
    }
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  watch: {},

  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },

  mounted () {},

  methods: {
    onLogout () {
      // 退出提示
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的user和本地存储中的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }

}

</script>
<style lang='less' scoped>
.my-container{
  .header{
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img{
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text{
        font-style: 28px;
        color: #fff;
      }
    }
  }
  .user-info{
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avator{
         width: 132px;
         height: 132px;
         border: 4px solid #fff;
         margin-right: 23px;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-status{
     display: flex;
     .data-item{
       flex: 1;
       height: 130px;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;color: #fff;
       .count{
         font-size: 36px;
       }
       .text{
         font-size: 23px;
       }
     }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      i.toutiao{
        font-size: 45px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
  }
  .message{
    margin-top: 8px;
  }
  .logout-cell{
    margin-top: 8px;
    color: rgba(255, 0, 0, 0.622);
    text-align: center;
  }

}
</style>
