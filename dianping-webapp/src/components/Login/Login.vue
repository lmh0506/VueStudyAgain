<template>
  <div>
    <base-header>
      <h1>登录</h1>
    </base-header>
    <div id="login-container">
      <div class="input-container phone-container">
        <i class="icon-tablet"></i>
        <input type="text" placeholder="请输入手机号" v-model="userName">
      </div>
      <div class="input-container password-container">
        <i class="icon-key"></i>
        <button>发送验证码</button>
        <input type="text" placeholder="请输入验证码">
      </div>
      <button class="btn-login" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
  import BaseHeader from '@/base/BaseHeader/BaseHeader'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        userName: ''
      }
    },
    methods: {
      ...mapMutations([
        'setUserInfo'
      ]),
      login () {
        if (this.userName) {
          this.setUserInfo({userName: this.userName})
          if (this.$route.query.back) {
            this.$router.back()
          } else {
            this.$router.push('/User')
          }
        }
      }
    },
    components: {
      BaseHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  h1 {
    display: inline;
    font-size: 16px;
    line-height: 1;
  }

  #login-container {
    width: 80%;
    margin: 160px auto 0 auto;

    .input-container {
      background-color: #fff;
      border: 1px solid #fff;
      padding: 5px 10px;
      border-radius: 5px;
      overflow: hidden;

      input {
        width: 58%;
        font-size: 16px;
        display: block;
        border: 0;
      }

      i{
        color: rgb(233, 32, 61);
        width: 16px;
        float: left;
        margin-top: 3px;
      }
    }

    .phone-container {
      input {
        margin-left: 20px;
      }
    }

    .password-container {
      margin-top: 10px;
      input {
        margin-left: 20px;
        margin-right: 80px;
      }
      button {
        width: 80px;
        height: 100%;
        font-size: 16px;
        color: rgb(233, 32, 61);
        border: 0;
        background-color: #fff;
        text-align: center;
        float: right;
      }
    }
    .btn-login {
      width: 100%;
      text-align: center;
      background-color: rgb(233, 32, 61);
      color: #fff;
      border: 1px solid rgb(233, 32, 61);
      border-radius: 5px;
      font-size: 16px;
      margin-top: 10px;
      padding: 5px 0;
    }
  }
</style>
