<template>
  <div id="home-ad">
    <h2>超级特惠</h2>
    <div class="ad-container clear-fix">
      <div class="ad-item" v-for="(item, index) in adData" :key="index">
        <a :href="item.link">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAdData} from 'fetch/home/home'
  import {ERR_OK} from 'fetch/config'

  export default {
    data () {
      return {
        adData: []
      }
    },
    methods: {
      getAdData () {
        getAdData().then(res => {
          if (res.data.error === ERR_OK) {
            this.adData = res.data.data
          }
        })
      }
    },
    mounted () {
      this.getAdData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  #home-ad{
    background-color: #fff;

    h2 {
      font-size: 16px;
      font-weight: 700;
      padding: 10px 15px;
      border-bottom: 1px solid #f1f1f1;
    }

    .ad-container {
      width: 100%;
      padding: 10px 15px;
    }

    .ad-item {
      width: 33.3333333%;
      height: 140px;
      float: left;
      a {
        display: block;
        img {
          width: 100%;
          height: 100%;;
        }
      }
    }
  }
</style>
