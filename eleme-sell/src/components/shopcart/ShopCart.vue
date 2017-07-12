<template>
  <div>
    <div class='shopcart'>
      <div class="content" @click='toggleList'>
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class='{"hignlight":totalCount>0}'>
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show='totalCount>0'>
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class='{"hignlight":totalPrice>0}'>￥{{newTotalPrice}}</div>
          <div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent='pay'>
          <div class="pay" :class='{"enough":totalPrice>=seller.minPrice}'>
            {{payDesc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for='(ball,index) in balls' key = 'index'>
          <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter' >
            <div class='ball'  v-show='ball.show'>
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name='slide'>
        <div class="shopcart-list" v-show='listShow'>
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click='empty'>清空</span>
          </div>
          <div class="list-content" ref='listContent'>
            <ul>
              <li class='food border-1px' v-for='food in selectFoods'>
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl @cartAdd='drop' :food='food'></CartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name='fade'>
      <div class="list-mask" v-show='listShow' @click='hideList'></div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CartControl from '@/components/cartcontrol/CartControl'
  import BScroll from 'better-scroll'
  const TWEEN = require('../../../build/Tween')

  export default{
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      CartControl
    },
    data () {
      return {
        newTotalPrice: 0,
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      ...mapState([
        'seller'
      ]),
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.seller.minPrice}元起送`
        } else if (this.totalPrice < this.seller.minPrice) {
          let diff = this.seller.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      pay () {
        if (this.totalPrice < this.seller.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      },
      hideList () {
        this.fold = true
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.transform = `translate3d(0,${y}px,0)`
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = `translate3d(${x}px,0,0)`
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)'
          el.style.webkitTransform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.transform = `translate3d(0,0,0)`
          inner.style.webkitTransform = `translate3d(0,0,0)`
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift() // shift返回第一个元素
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    watch: {
      totalPrice: function (val, oldVal) {
        let vm = this
        function animate (time) {
          requestAnimationFrame(animate)
          TWEEN.update(time)
        }
        new TWEEN.Tween({ tweeningNumber: oldVal })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: val }, 200)
        .onUpdate(function () {
          vm.newTotalPrice = this.tweeningNumber.toFixed(0)
        })
        .start()
        animate()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 @import "../../common/stylus/mixin.styl"

  .shopcart{
    position: fixed;
    left:0px;
    bottom: 0px;
    z-index: 50;
    width: 100%;
    height: 48px;
    background-color: #000;
  }
  .shopcart .content{
    display: flex;
    background-color: #141d27;
  }
  .shopcart .content .content-left{
    flex: 1;
    font-size: 0;
  }
  .shopcart .content .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    margin: 0 6px;
    padding: 6px;
    border-radius: 50%;
    vertical-align: top;
    background-color: #141d27;
  }
  .shopcart .content .content-left .logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background-color: #2b343c;
  }
  .shopcart .content .content-left .logo-wrapper .hignlight{
    background-color: rgb(0,160,220);
  }
  
  .shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart{
    font-size: 24px;
    line-height: 44px;
    color:rgba(255,255,255,.4);
  }
  .shopcart .content .content-left .logo-wrapper .hignlight .icon-shopping_cart{
    color:#fff;
  }
  .shopcart .content .content-left .logo-wrapper .num{
    position: absolute;
    top:0px;
    right: 0px;
    width: 24px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
  }
  .shopcart .content .content-left .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    box-sizing: border-box;
    padding-right:12px;
    border-right: 1px solid rgba(255,255,255,.1);
    line-height: 24px;
    font-size: 16px;
    color:rgba(255,255,255,.4);
    font-weight: 700;
  }
  .shopcart .content .content-left .hignlight{
    color:#fff;
  }
  .shopcart .content .content-left .desc{
    display: inline-block;
    vertical-align: top;
    margin-left: 12px;
    line-height: 48px;
    font-size: 10px;
    color:rgba(255,255,255,.4);
    font-weight: 700;
  }
  .shopcart .content .content-right{
    flex: 0 0 95px;
    width: 95px;
  }
  .shopcart .content .content-right .pay{
    font-size: 12px;
    color:rgba(255,255,255,.4);
    font-weight: 700;
    line-height: 48px;
    text-align: center;
    background-color: rgb(43,51,59);
  }
  .shopcart .content .content-right  .enough{
    background-color: #00b43c;
    color:#fff;
  }
  .shopcart .ball-container .ball{
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .shopcart .ball-container .ball .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0,160,220);
    transition: all 0.4s linear;
  }
  .shopcart .shopcart-list{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .shopcart .slide-enter-active,.shopcart .slide-leave-active{
    transition: all .5s;
  }
  .shopcart .slide-enter,.shopcart .slide-leave-active{
    transform: translate3d(0, 0, 0);
  }
  
  .shopcart .shopcart-list .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color:#f3f5f7;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,.1);
  }
  .shopcart .shopcart-list .list-header .title{
    float: left;
    font-size: 14px;
    color:rgb(7,17,27);
  }
  .shopcart .shopcart-list .list-header .empty{
    float: right;
    font-size: 12px;
    color:rgb(0,160,220);
  }
  .shopcart .shopcart-list .list-content{
    padding: 0 18px;
    max-height: 217px;
    background-color:#fff;
    overflow: hidden;
  }
  .shopcart .shopcart-list .list-content .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-1px(rgba(7,17,27,.1));
  }
  .shopcart .shopcart-list .list-content .food .name{
    line-height:24px;
    font-size:14px;
    color:rgb(7,17,27);
  }
  .shopcart .shopcart-list .list-content .food .price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color:rgb(240,20,20);
  }
  .shopcart .shopcart-list .list-content .food .cartcontrol-wrapper{
    position: absolute;
    right: 0px;
    bottom: 6px;
  }
  .list-mask {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter:blur(10px);
    background-color:rgba(7,17,27,.6);
  }
  .list-mask .fade-enter-active,.list-mask .fade-leave-active{
    transition: all .5s;
  }
  .list-mask .fade-enter,.list-mask .fade-leave-active{
    opacity: 0;
    background-color:rgba(7,17,27,0);
  }
</style>
