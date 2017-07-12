<template>
  <div class="cartControl">
    <transition name="move" mode="">
      <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent='decreaseCart' v-show='food.count>0'></div>
    </transition>
    <transition name='fade'>
      <div class="cart-count" v-show='food.count>0'>{{food.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click.stop.prevent='addCart($event)'></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }

        if (!this.food.count) {
          // this.food.count = 1 // 自己新添加的属性 不会被vue观测到 即属性发生变化时 检测不到
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count ++
        }
        this.$emit('cartAdd', event.target)
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }

        if (this.food.count) {
          this.food.count --
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cartControl{
    font-size: 0;
  }
  .cartControl .cart-decrease,.cart-add{
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color:rgb(0,160,220);
  }

  .cartControl .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    text-align: center;
    line-height: 24px;
    padding-top: 6px;
    color:rgb(147,153,159);
    font-size: 10px;

  }

  .move-enter-active,.move-leave-active{
    transition: all .4s linear;
  }
  .move-enter,.move-leave-active{
    opacity: 0;
    transform: translate3d(24px,0,0) rotate(180deg);
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .2s;
  }
  .fade-enter-active{
    transition-delay: .2s
  }
  .fade-enter,.fade-leave-active{
    opacity: 0;
  }
</style>
