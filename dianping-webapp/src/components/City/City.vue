<template>
  <div>
    <base-header>
      <h1>选择城市</h1>
    </base-header>
    <div class="current-city">
      <h2>{{cityName}}</h2>
    </div>
    <div class="city-list-container">
      <h3>热门城市</h3>
      <ul class="clear-fix">
        <li v-for="(item, index) in cityList" :key="index" @click="changeCity(item)">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import BaseHeader from '@/base/BaseHeader/BaseHeader'

  export default {
    data () {
      return {
        cityList: ['北京', '上海', '杭州', '广州', '苏州', '深圳', '南京', '天津', '重庆', '厦门', '武汉', '西安']
      }
    },
    computed: {
      ...mapState([
        'cityName'
      ])
    },
    methods: {
      ...mapMutations([
        'setCityName'
      ]),
      changeCity (item) {
        this.setCityName(item)
        this.$router.push('/')
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

  .current-city {
    background-color: #fff;
    text-align: center;
    padding: 30px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .city-list-container {
    background-color: #fff;
    padding: 10px 15px 20px 15px;

    h3 {
      font-size: 16px;
    }

    ul {
      display: block;
      width: 100%;
    }

    li {
      list-style: none;
      display: block;
      float: left;
      width: 33.3%;
      text-align: center;

      span {
        display: inline-block;
        border: 1px solid #ccc;
        font-size: 16px;
        line-height: 2;
        margin-top: 15px;
        width: 90%;
      }
    }
  }
</style>
