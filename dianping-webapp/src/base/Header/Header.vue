<template>
  <div id="home-header" class="clear-fix">
    <router-link tag="div" to="/City" class="home-header-left float-left">
      {{cityName}}&nbsp;
      <i class="icon-angle-down"></i>
    </router-link>
    <div class="home-header-right float-right" @click="toUser">
      <i class="icon-user"></i>
    </div>
    <div class="home-header-middle">
      <div class="search-container">
        <i class="icon-search"></i>
        <input type="text" @keyup.enter='blur' @blur="blur" v-model.trim="keyWord" placeholder="请输入关键字">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        keyWord: ''
      }
    },
    computed: {
      ...mapState([
        'cityName',
        'userInfo'
      ])
    },
    methods: {
      blur () {
        if (this.keyWord) {
          this.$router.push('/search/all/' + this.keyWord)
        }
      },
      toUser () {
        if (this.userInfo.userName) {
          this.$router.push('/User')
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #home-header {
    background-color: rgb(233, 32, 61);
    padding: 10px;

    * {
      color: #fff;
      font-size: 16px;
      line-height: 1;
    }

    .home-header-left {
      width: 60px;
      text-align: left;
      margin: 7px 0;
    }

    .home-header-middle {
      width: auto;
      margin: 0 30px 0 60px;

      .search-container {
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
        padding: 5px;

        i {
          color: #ccc !important;
        }

        input {
          color: #333;
          border: 0;
        }
      }
    }

    .home-header-right {
      width: 30px;
      margin: 7px 0;
      text-align: right;
    }
  }
</style>

