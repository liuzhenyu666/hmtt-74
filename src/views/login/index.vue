<template>
  <div class="login">
    <!-- 大标题 -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <!-- error-message="手机号格式错误" 底部错误的文字提示 -->
    <van-cell-group>
      <van-field
        @input="handleInput"
        v-model="mobile"
        required
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errMobileMsg"
      />
      <van-field
        @input="handleInput"
        v-model="code"
        required
        label="验证码"
        placeholder="请输入验证码"
        :error-message="errCodeMsg"
      />
    </van-cell-group>

    <div class="btn-wrap">
      <!-- 组件定义规范: 组件的根元素, 一般都会有和组件名同名的类名 -->
      <van-button @click="login" class="my-login-btn" type="info">登录</van-button>
      <van-button @click="getInfo" type="primary">测试: 获取用户信息</van-button>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { mapMutations } from 'vuex'
import { reqLogin, reqGetProfile } from '@/api/user.js'

export default {
  name: 'Login',
  data () {
    return {
      mobile: '18616115546',
      code: '246810',
      errMobileMsg: '',
      errCodeMsg: ''
    }
  },
  methods: {
    ...mapMutations('user', ['setTokenInfo']),

    // 自行配置校验函数
    validate () {
      // 验证手机号
      if (this.mobile.trim() === '') {
        this.errMobileMsg = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.errMobileMsg = '手机号格式有误'
        return false
      }
      this.errMobileMsg = ''

      // 验证验证码
      if (this.code.trim() === '') {
        this.errCodeMsg = '验证码不能为空'
        return false
      }
      // 6位验证码, 全是数字
      if (!/^\d{6}$/.test(this.code)) {
        this.errCodeMsg = '验证码格式有误'
        return false
      }
      this.errCodeMsg = ''

      return true
    },
    // 登录
    async login () {
      // 进行校验
      if (this.validate()) {
        // Toast('提示内容')
        // this.$toast('提示消息')
        this.$toast.loading({
          message: '拼命加载...',
          forbidClick: true, // 禁用背景点击
          overlay: true, // 显示背景遮罩
          duration: 0
        })

        try {
          // 调用登录接口, 发送请求
          const res = await reqLogin(this.mobile, this.code)
          // 关闭
          // this.$toast.clear()
          // 给个成功的提示
          this.$toast.success('登录成功')
          // 将token存到vuex中
          this.setTokenInfo(res.data.data)
          // 再跳转
          this.$router.push('/')
        } catch {
          this.$toast.fail('登录失败')
        }
      }
    },
    handleInput () {
      this.validate()
    },
    async getInfo () {
      const res = await reqGetProfile()
      console.log(res.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  padding: 20px;
  .my-login-btn {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
}
</style>
