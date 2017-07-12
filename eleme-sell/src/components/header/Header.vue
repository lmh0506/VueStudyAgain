<template>
    <div class='header'>
        <div class="content-wrapper">
            <div class="avatar">
                <img width='64' height='64' :src="seller.avatar" alt="">
            </div>
            <div class="content">
              <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
              </div>
              <div class="description">
                {{seller.description}} / {{seller.deliveryTime}} 分钟送达
              </div>
              <div v-if='seller.supports' class='support'>
                <span class="icon" :class='classMap[seller.supports[0].type]'></span>
                <span class="text">{{seller.supports[0].description}}</span>
              </div>
            </div>
            <div v-if='seller.supports' class="support-count" @click='toggleDetail'>
              <span class="count">{{seller.supports.length}}个</span>
              <i class='icon-keyboard_arrow_right'></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click='toggleDetail'>
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
          <i class='icon-keyboard_arrow_right'></i>
        </div>
        <div class="background">
          <img :src="seller.avatar" alt="" width='100%' height='100%'>
        </div>
        <transition name="fade" mode="">
          <div class="detail" v-show='detailShow' @click='toggleDetail'>
            <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <h1 class='name'>{{seller.name}}</h1>
                <div class="star-wrapper">
                  <Star :size='48' :score='seller.score'></Star>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if='seller.supports' class='supports'>
                  <li class='support-item' v-for='item in seller.supports'>
                    <span class="icon" :class='classMap[item.type]'></span>
                    <span class="text">{{item.description}}</span>
                  </li>
                </ul>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="bulletin">
                  <p class="content">{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
            <div class="detail-close">
              <i class='icon-close'></i>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Star from '@/components/star/Star'
export default {
  components: {
    Star
  },
  computed: {
    ...mapState([
      'seller',
      'classMap'
    ])
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    toggleDetail () {
      this.detailShow = !this.detailShow
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .header{
    color:#fff;
    background-color:rgba(7,17,27,.5)
    position: relative;
    overflow:hidden;
  }
  .header .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0px;
  }
  .header .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .header .content-wrapper .avatar img{
    border-radius: 2px;
  }
  .header .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
  }
  .header .content-wrapper .content .title{
    margin: 2px 0px 8px 0px;
  }
  .header .content-wrapper .content .title .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: top;
    bg-image('brand');
    background-size: 30px 18px;
    background-repeat:no-repeat;

  }
  .header .content-wrapper .content .title .name{
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
  }
  .header .content-wrapper .description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
  }
  .header .content-wrapper .support .icon{
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    margin-right:4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }
  .header .content-wrapper .support .decrease{
    bg-image('decrease_1');
  }
  .header .content-wrapper .support .discount{
    bg-image('discount_1');
  }
  .header .content-wrapper .support .guarantee{
    bg-image('guarantee_1');
  }
  .header .content-wrapper .support .invoice{
    bg-image('invoice_1');
  }
  .header .content-wrapper .support .special{
    bg-image('special_1');
  }
  .header .content-wrapper .support .text{
    font-size: 10px;
    line-height: 12px;
  }
  .header .content-wrapper .support-count{
    position: absolute;
    right: 12px;
    bottom:14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color:rgba(0,0,0,.2);
    text-align: center; 
  }
  .header .content-wrapper .support-count .count{
    font-size: 10px;
    margin-right: 2px;
  }
  .header .content-wrapper .support-count .icon-keyboard_arrow_right{
    font-size: 10px;
    line-height: 24px;
  }
  .header .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7,17,27,.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .header .bulletin-wrapper .bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    bg-image('bulletin');
    background-size:22px 12px;
    background-repeat:no-repeat;
    vertical-align:middle;
  }
  .header .bulletin-wrapper .bulletin-text{
    line-height: 28px;
    font-size: 10px;
    margin-right: 4px;
  }
  .header .bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    right: 12px;
    top:0px;
    line-height: 28px;
    font-size: 10px;
  }
  .header .background{
    position: absolute;
    top:0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px)
  }
  .header .detail{
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(7,17,27,.8);
    backdrop-filter:blur(10px)
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .5s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
    background-color: rgba(7,17,27,0);
  }
  .header .detail .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .header .detail .detail-wrapper .detail-main{
    margin-top:64px;
    padding-bottom:64px; 
  }
  .header .detail .detail-wrapper .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .header .detail .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
  .header .detail .detail-wrapper .detail-main .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .header .detail .detail-wrapper .detail-main .title{
    display: flex;    
    width: 80%;
    margin: 28px auto 24px;
  }
  .header .detail .detail-wrapper .detail-main .title .line{
    flex: 1;
    position: relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,.2);
  }
  .header .detail .detail-wrapper .detail-main .title .text{
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
  }
  .header .detail .detail-wrapper .detail-main .supports{
    width: 80%;
    margin: 0 auto;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item:last-child{
    margin-bottom: 0px;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 16px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .decrease{
    bg-image('decrease_2');
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .discount{
    bg-image('discount_2');
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .guarantee{
    bg-image('guarantee_2');
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .invoice{
    bg-image('invoice_2');
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .special{
    bg-image('special_2');
  }
  .header .detail .detail-wrapper .detail-main .supports .support-item .text{
    line-height:16px;
    font-size:12px;
  }
  .header .detail .detail-wrapper .detail-main .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .header .detail .detail-wrapper .detail-main .bulletin .content{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
