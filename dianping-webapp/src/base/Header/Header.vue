<template>
  <div id="home-header" class="clear-fix">
    <div class="home-header-left float-left">
      {{cityName}}&nbsp;
      <i class="icon-angle-down"></i>
    </div>
    <div class="home-header-right float-right">
      <i class="icon-user"></i>
    </div>
    <div class="home-header-middle">
      <div class="search-container">
        <i class="icon-search"></i>
        <input type="text" placeholder="请输入关键字">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState([
        'cityName'
      ])
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

