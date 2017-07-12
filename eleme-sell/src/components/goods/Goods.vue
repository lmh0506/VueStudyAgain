<template>
  <div>
    <div class='goods'>
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for='(item,index) in goods' class='menu-item menu-list-hook' :class='{"current":currentIndex === index}' @click='selectMenu(index,$event)'>
              <span class='text border-1px'>
                <span v-show='item.type > 0' class='icon' :class='classMap[item.type]'></span>
                {{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper"  ref="foodsWrapper">
          <ul>
            <li class='food-list food-list-hook' v-for='(item,index) in goods'>
              <h1 class='title'>{{item.name}}</h1>
              <ul>
                <li @click='selectFood(food,$event)' v-for='food in item.foods' class='food-item border-1px'>
                  <div class='icon'>
                    <img width='57' height='57' :src="food.icon" alt="">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class='desc' v-if='food.description'>{{food.description}}</p>
                    <div class="extra">
                      <span>月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class='foodPrice'><span>￥</span>{{food.price}}</span>
                      <span class='oldPrice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <CartControl @cartAdd='drop' :food='food'></CartControl>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <h1 class="topTitle" :style='{"z-index":topTitlezIndex}' v-if='showTopTitle === 1 '>{{goods[currentIndex].name}}</h1>
        </div>
        <ShopCart ref='shopcart' :selectFoods='selectFoods'></ShopCart>
    </div>
    <Food @cartAdd='drop' :food='selectedFood' ref='food'></Food>
  </div>
    
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapActions, mapState} from 'vuex'
  import ShopCart from '@/components/shopcart/ShopCart'
  import CartControl from '@/components/cartcontrol/CartControl'
  import Food from '@/components/food/Food'

  export default{
    components: {
      ShopCart,
      CartControl,
      Food
    },
    computed: {
      ...mapState([
        'goods',
        'classMap'
      ]),
      selectFoods () {
        let foods = []
        if (this.goods.length > 0) {
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food)
              }
            })
          })
        }
        return foods
      },
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      showTopTitle () {
        return this.goods[this.currentIndex] && this.posY < 0 ? 1 : 0
      },
      topTitlezIndex () {
        return this.scrollY + 26 > this.listHeight[this.currentIndex + 1] ? -1 : 30
      }
    },
    data () {
      return {
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    methods: {
      ...mapActions([
        'getGoodsData'
      ]),
      _initScroll () {
        // this.$refs 获取dom元素
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          this.posY = pos.y
          let menuList = this.$refs.menuWrapper.getElementsByClassName('menu-list-hook')

          let scrollIndex = this.currentIndex - 3
          if (scrollIndex >= 0) {
            let el = menuList[scrollIndex]
            this.meunScroll.scrollToElement(el, 300)
          }
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      drop (target) {
        // 体验优化 异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      }
    },
    created () {
      this.getGoodsData()
      .then(() => {
        this.$nextTick(() => { // DOM更新后执行  因为DOM更新完成后才能准确获取高度  进行滚动
          this._initScroll()
          this._calculateHeight()
        })
      })

      this.$http.jsonp('http://localhost:1128/getAllShuoshuo?page=0', {jsonp: 'callback'}).then((res) => {
        console.log(res.data)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .goods{
    display: flex;
    position:absolute;
    top:174px;
    bottom: 46px;
    width:100%;
    overflow: hidden;
  }
  .goods .menu-wrapper{
      flex:0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
    }
  .goods .menu-wrapper .menu-item{
        display: table;
        width: 54px;
        height: 56px;
        padding: 0 12px;
        line-height: 14px;
      }
   .goods .menu-wrapper .current{
     position: relative;
     margin-top: -1px;
     z-index: 10;
     background-color: #fff;
     font-weight: 700;
   }
   
   .goods .menu-wrapper .menu-item .icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }
    .goods .menu-wrapper .menu-item .decrease{
      bg-image('decrease_3');
    }
    .goods .menu-wrapper .menu-item .discount{
      bg-image('discount_3');
    }
    .goods .menu-wrapper .menu-item .guarantee{
      bg-image('guarantee_3');
    }
    .goods .menu-wrapper .menu-item .invoice{
      bg-image('invoice_3');
    }
    .goods .menu-wrapper .menu-item .special{
      bg-image('special_3');
    }
    .goods .menu-wrapper .menu-item .text{
        display:table-cell;
        width:56px;
        vertical-align:middle;
        font-size:12px;
        border-1px(rgba(7,17,27,.1));
      }
    .goods .menu-wrapper .current .text{
      border-none();
    }
    .foods-wrapper{
      position: relative;
      flex: 1;
    }
    .foods-wrapper .title,.topTitle{
        position: relative;
        z-index: 10;
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color:rgb(147,153,159);
        background-color: #f3f5f7;
      }
    .foods-wrapper .topTitle{
      position: fixed;
      z-index: 1;
      top:174px;
      left: 80px;
      width: 100%;
    }
    .foods-wrapper .title-active{
      position: fixed;
      top:0px;
      left: 0px;
    }
    .foods-wrapper .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-1px(rgba(7,17,27,.1));
      }
    .foods-wrapper .food-item:last-child{
      border-none();
      margin-bottom:0px;
    }
    .foods-wrapper .food-item .icon{
      flex:0 0 57px;
      margin-right: 10px;
    }
    .foods-wrapper .food-item .content{
      flex: 1;
    }
    .foods-wrapper .food-item .content .name{
      margin:2px 0px 14px; 
      color:rgb(7,17,27);
      height: 14px;
      line-height: 14px;
      font-size: 14px;
    }
    .foods-wrapper .food-item .content .desc{
      margin-bottom: 8px;
      font-size: 10px;
      color:rgb(147,153,159);
      line-height: 12px;
    }
    .foods-wrapper .food-item .content .extra{
      font-size: 0px;
      color:rgb(147,153,159);
      line-height: 10px;
    }
    .foods-wrapper .food-item .content .extra span{
      font-size: 10px;
    }
    .foods-wrapper .food-item .content .extra span:first-child{
      margin-right:12px; 
    }
    .foods-wrapper .food-item .content .price {
      font-weight: 700;
      line-height: 24px;
    }
    .foods-wrapper .food-item .content .cartcontrol-wrapper{
      position: absolute;
      right: 0px;
      bottom: 12px;
    }
    .foods-wrapper .food-item .content .price .foodPrice{
      font-size: 14px;
      color:rgb(240,20,20);
    }
    .foods-wrapper .food-item .content .price .foodPrice span{
      font-size: 10px;
      font-weight: normal;
    }
    .foods-wrapper .food-item .content .price .oldPrice{
      font-size:10px;
      color:rgb(147,153,159);
      text-decoration: line-through;
    }
</style>
