<template>
  <div id="detail-info-container">
    <div class="info-container clear-fix">
      <div class="info-img-container float-left">
        <img v-lazy="info.img" alt="">
      </div>
      <div class="info-content">
        <h1>{{info.title}}</h1>
        <div class="star-container">
          <star :num='info.star'></star>
          <span class="price">￥{{info.price}}</span>
        </div>
        <p class="sub-title">{{info.subTitle}}</p>
      </div>
    </div>
    <p class="inf-desc" v-html="info.desc"></p>
  </div>
</template>

<script>
  import {getInfoData} from 'fetch/detail/detail'
  import {ERR_OK} from 'fetch/config'
  import Star from '@/base/Star/Star'

  export default {
    data () {
      return {
        info: {}
      }
    },
    methods: {
      getInfoData () {
        let id = this.$route.params.id
        getInfoData(id).then(res => {
          if (res.data.error === ERR_OK) {
            this.info = res.data.data
          }
        })
      }
    },
    components: {
      Star
    },
    mounted () {
      this.getInfoData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  #detail-info-container {
    background-color: #fff;
    padding: 10px;

    .info-container{
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    .info-img-container{
      width: 130px;
      img {
        width: 100%;
      }
    }

    .info-content{
      margin-left: 140px;

      h1 {
        font-size: 20px;
        color: #333;
      }
      .star-container {
        margin: 5px 0;

        .price {
          margin-left: 20px;
          color: #999;
        }
      }

      .sub-title {
        color: #999;
      }
    }

    .info-desc{
      color: #999;
      line-height: 1.5;
    }
  }
</style>
