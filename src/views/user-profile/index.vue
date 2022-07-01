<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()" />
    <!-- /导航栏 -->

    <input
       type="file"
       hidden
       ref="file"
       @change="onFileChange">

    <!-- 个人信息 -->
    <van-cell
        title="头像"
        is-link
        center
        @click="$refs.file.click()"
        >
      <van-image
      class="avator"
      fit="cover"
      round
      :src="user.photo"/>
    </van-cell>
    <van-cell
        title="昵称"
        :value="user.name"
        @click="isUpdateNameShow = true"
        is-link />
    <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        @click="isUpdateGenderShow=true"
        is-link/>
    <van-cell
        title="生日"
        @click="isUpdateBirthdayShow=true"
        :value="user.birthday"
        is-link/>
    <!-- /个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
        v-model="isUpdateNameShow"
        style="height:100%"
        position="bottom">
        <update-name
          v-if="isUpdateNameShow"
          @close="isUpdateNameShow=false"
          v-model="user.name"/>
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup
        v-model="isUpdateGenderShow"
        position="bottom">
      <update-gender
        @close="isUpdateGenderShow=false"
        v-if="isUpdateGenderShow"
        v-model="user.gender"/>
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
        v-model="isUpdateBirthdayShow"
        position="bottom">
      <update-birthday
        @close="isUpdateBirthdayShow=false"
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"/>
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
        v-model="isUpdatePhotoShow"
        position="bottom"
        style="height:100%;">
      <update-photo
        :img="img"
        @close="isUpdatePhotoShow=false"
        v-if="isUpdatePhotoShow"
        @update-photo="user.photo=$event"
        v-model="user.photo"/>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '../../api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  props: {},
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },

  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },

  computed: {},

  watch: {},

  created () {
    this.loadUserProfile()
  },

  mounted () {},

  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }
  }

}

</script>
<style lang='less' scoped>
.user-profile{
  .avator{
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }
}
</style>
