<template>
  <div class="ratings" ref='ratings'>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size='36' :score='seller.serviceScore'></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size='36' :score='seller.foodScore'></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class='delivery-wrapper'>
            <span class="title">送达时间</span>
            <span class='delivery'>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <RatingSelect @select='select' @toggleContent='toggleContent' :selectType='selectType' :onlyContent='onlyContent' :ratings='ratings'></RatingSelect>
      <div class="rating-wrapper">
        <ul>
          <li v-show='selectShow(rating.rateType,rating.text)' v-for='rating in ratings' class='rating-item border-1px'>
            <div class="avatar">
              <img width='28' height='28' :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :size='24' :score='rating.score'></Star>
                <span class="delivery" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
                <span class="icon-thumb_up"></span>
                <span class='item' v-for='item in rating.recommend'>{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Star from '@/components/star/Star'
  import Split from '@/components/split/Split'
  import RatingSelect from '@/components/ratingSelect/RatingSelect'
  import {formatDate} from '@/common/js/date.js'
  import BScroll from 'better-scroll'

  const ALL = 2

  export default{
    computed: {
      ...mapState([
        'seller',
        'ratings'
      ])
    },
    components: {
      Star,
      Split,
      RatingSelect
    },
    data () {
      return {
        selectType: ALL,
        onlyContent: true
      }
    },
    methods: {
      ...mapActions([
        'getRatingsData'
      ]),
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
      selectShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return this.selectType === type
        }
      }
    },
    filters: {
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    created () {
      this.getRatingsData().then(() => {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .ratings{
    position: absolute;
    top:174px;
    bottom: 0px;
    width: 100%;
    left: 0px;
    overflow: hidden;
  }
  .ratings .overview{
    display: flex;
    padding: 18px 0px;
  }
  .ratings .overview .overview-left{
    flex: 0 0 137px;
    width: 137px;
    border-right: 1px solid rgba(7,17,27,.1);
    text-align: center;
    padding: 6px 0px;
  }
  .ratings .overview .overview-left .score{
    line-height: 28px;
    font-size: 24px;
    color: rgb(255,153,0);
    margin-bottom: 6px;
  }
  .ratings .overview .overview-left .title{
    display: inline-block;
    line-height: 18px;
    line-height: 12px;
    font-size: 12px;
    color:rgb(7,17,27);
    margin-bottom: 6px;
  }
  .ratings .overview .overview-left .rank{
    font-size: 10px;
    line-height: 10px;
    color:rgb(147,153,159);
  }
  .ratings .overview .overview-right{
    flex: 1;
    padding: 6px 0 6px 24px;
  }
  .ratings .overview .overview-right .score-wrapper{
    line-height: 18px;
    margin-bottom: 8px;
    font-size: 0px;
  }
  .ratings .overview .overview-right .score-wrapper .title{
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .ratings .overview .overview-right .score-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin: 0 12px;
  }
  .ratings .overview .overview-right .score-wrapper .score{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    color:rgb(255,153,0)
  }
  .ratings .overview .overview-right .delivery-wrapper{
    font-size: 0;
  }
  .ratings .overview .overview-right .delivery-wrapper .title{
    line-height: 18px;
    font-size: 12px;
    color:rgb(7,17,27);
  }
  .ratings .overview .overview-right .delivery-wrapper .delivery{
    font-size: 12px;
    color:rgb(147,153,159);
    margin-left: 12px;
  }
  @media only screen and (max-width:320px)  {
    .ratings .overview .overview-left{
      flex: 0 0 120px;
      width:120px;
    }
    .ratings .overview .overview-right{
      padding-left: 6px;
    }
  }
  .ratings .rating-wrapper{
    padding: 0 18px;
  }
  .ratings .rating-wrapper .rating-item{
    display: flex;
    padding: 18px 0;
    border-1px(rgba(7,17,27,.1));
  }
  .ratings .rating-wrapper .rating-item .avatar{
    flex:0 0 28px;
    width:28px;
    margin-right:12px;
  }
  .ratings .rating-wrapper .rating-item .avatar img{
    border-radius: 50%;
  }
  .ratings .rating-wrapper .rating-item .content{
    position: relative;
    flex: 1;
  }
  .ratings .rating-wrapper .rating-item .content .name{
    line-height: 12px;
    font-size: 10px;
    color:rgb(7,17,27);
    margin-bottom: 4px;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper{
    margin-bottom: 6px;
    font-size: 0px;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .star{
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
    color:rgb(147,153,159);
  }
  .ratings .rating-wrapper .rating-item .content .text{
    line-height: 18px;
    color:rgb(7,17,27);
    font-size: 12px;
    margin-bottom: 8px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend{
    line-height: 16px;
    font-size: 0px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,.item{
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up{
    color:rgb(0,160,220);
  }
  .ratings .rating-wrapper .rating-item .content .recommend .item{
    padding: 0 6px;
    border:1px solid rgba(7,17,27,.1);
    border-radius: 1px;
    color:rgb(147,153,159);
    background-color: #fff;
  }
  .ratings .rating-wrapper .rating-item .content .time{
    position: absolute;
    top:0px;
    right: 0px;
    line-height: 12px;
    font-size: 10px;
    color:rgb(147,153,159);
  }
</style>
