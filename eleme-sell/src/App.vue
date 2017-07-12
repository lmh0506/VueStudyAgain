<template>
  <div id="app">
    <VHeader></VHeader>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link active-class='active' to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link active-class='active' to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link active-class='active' to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script >
import VHeader from '@/components/header/Header'
import {mapActions} from 'vuex'

export default {
  components: {
    VHeader
  },
  data () {
    return {
      // seller: {}
    }
  },
  methods: {
    ...mapActions([
      'getSellerData'
    ])
  },
  created () {
    // this.$http.get('/api/seller')
    // .then(res => {
    //   if (res.data.errno === ERR_OK) {
    //     this.seller = res.data.data
    //     console.log(this.seller)
    //   }
    // })
    // this.getSellerData()
    this.getSellerData()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./common/stylus/mixin.styl"

  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7,17,27,.1))
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    font-size: 14px;
    color:rgb(77,85,93);
  }
  .tab .tab-item a.active{
    color:rgb(240,20,20);
  }
</style>
