<template>
  <transition name="move" mode="">
    <div class="food" v-show='showFlag' ref='food'>
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click='hide'>
            <i class='icon-arrow_lift'></i>
          </div>
        </div>
        <div class="content" >
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class='now'>￥{{food.price}}</span>
            <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <CartControl @cartAdd='add' :food='food'></CartControl>
          </div>
          <!--<transition name='fade'>-->
            <div @click.stop.prevent='addFirst' class="buy" v-show='!food.count || food.count===0'>加入购物车</div>
          <!--</transition>-->
        </div>
        <Split v-show='food.info'></Split>
        <div class="info" v-show='food.info'>
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect v-if='food.ratings' @select='select' @toggleContent='toggleContent' :selectType='selectType' :onlyContent='onlyContent' :desc='desc' :ratings='food.ratings' ></RatingSelect>
        </div>
        <div class="rating-wrapper">
          <ul v-if='food.ratings && food.ratings.length'>
            <li v-show='needShow(rating.rateType,rating.text)' v-for='rating in food.ratings' class='rating-item border-1px'>
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img width="12" height='12' :src="rating.avatar" alt="" class="avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class='text'>
                <span :class='{"icon-thumb_up":rating.rateType === 0,"icon-thumb_down":rating.rateType === 1}'></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-else>暂无评价</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import CartControl from '@/components/cartcontrol/CartControl'
  import Split from '@/components/split/Split'
  import RatingSelect from '@/components/ratingSelect/RatingSelect'
  import {formatDate} from '@/common/js/date.js'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default{
    props: {
      food: {
        type: Object
      }
    },
    components: {
      CartControl,
      Split,
      RatingSelect
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    methods: {
      select (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent (flag) {
        this.onlyContent = flag
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      show () {
        this.showFlag = true
        this.selectType = ALL
        this.onlyContent = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        if (!this.count) {
          console.log(this.count)
          this.$emit('cartAdd', event.target)
          Vue.set(this.food, 'count', 1)
        }
      },
      add (target) {
        this.$emit('cartAdd', target)
      },
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .food{
    position: fixed;
    top: 0px;
    bottom: 48px;
    left: 0px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
  }
  .move-enter-active,.move-leave-active{
    transition: all .2s linear;
  }
  .move-enter,.move-leave-active{
    transform: translateX(100%);
  }
  .food .image-header{
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 100%; /* padding-top 100% 是以宽度为基准去计算高度的  从而撑开高度*/
  }
  .food .image-header img{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .food .image-header .back{
    position: absolute;
    top: 10px;
    left: 0px;
  }
  .food .image-header .back .icon-arrow_lift{
    display: block;
    padding: 10px;
    font-size: 20px;
    color:#fff;
  }
  .food .content{
    position: relative;
    padding: 18px;
  }
  .food .content .title{
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color:rgb(7,17,27);
  }
  .food .content .detail{
    margin-bottom: 18px;
    line-height: 10px;
    font-size: 0px;
    height: 10px;
  }
  .food .content .detail .sell-count , .rating{
    font-size: 10px;
    color:rgb(147,153,159);
  }
  .food .content .detail .sell-count{
    margin-right:12px; 
  }
  .food .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .food .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color:rgb(240,20,20);
    font-weight: normal;
  }
  .food .content .price .old{
    font-size:10px;
    color:rgb(147,153,159);
    text-decoration: line-through;
  }
  .food .cartcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .food .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color:#fff;
    background-color: rgb(0,160,220);
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .2s;
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
  .food .info{
    padding: 18px;
  }
  .food .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color:rgb(7,17,27)
  }
  .food .info .text{
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    padding: 0 8px;
    color:rgb(77,85,93);
  }
  .food .rating{
    padding-top: 18px;
  }
  .food .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .food .rating-wrapper{
    padding: 0 18px;
  }
  .food .rating-wrapper .rating-item{
    position: relative;
    padding: 16px 0;
    border-1px(rgba(7,17,27,.1));
  }
  .food .rating-wrapper .rating-item .user{
    position:absolute;
    right:0;
    top:16px;
    font-size:0;
    line-height:12px;
  }
  .food .rating-wrapper .rating-item .user .name{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color:rgb(147,153,159);
    margin-right: 6px;
  }
  .food .rating-wrapper .rating-item .user .avatar{
    display: inline-block;
    vertical-align: top;
    border-radius:50%;
  }
  .food .rating-wrapper .rating-item .time{
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159);
    margin-bottom: 6px;
  }
  .food .rating-wrapper .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .food .rating-wrapper .rating-item .icon-thumb_up,.icon-thumb_down{
    line-height: 16px;
    margin-right: 4px;
    font-size: 12px;
  }
  .food .rating-wrapper .rating-item .icon-thumb_up{
    color:rgb(0,160,220);
  }
  .food .rating-wrapper .rating-item .icon-thumb_down{
    color:rgb(147,153,159);
  }
  .food .rating-wrapper .no-rating{
    padding: 16px 0;
    font-size: 12px;
    color:rgb(147,153,159);
  }
</style>
