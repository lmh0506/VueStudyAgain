<template>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item" v-for="(items, index) in swiperSlides" :key="index">
      <ul>
        <li v-for="(item, index) in items" :class="item" :key="index"></li>
      </ul>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          loop: true,
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 0,
          mousewheelControl: true,
          longSwipesRatio: 0.1
        },
        swiperSlides: [
          ['jingdian', 'ktv', 'gouwu', 'shenghuofuwu', 'jianshenyundong', 'meifa', 'qinzi', 'xiaochikuaican', 'zizhucan', 'jiuba'],
          ['meishi', 'dianying', 'jiudian', 'xuixianyule', 'waimai', 'huoguo', 'liren', 'dujiachuxing', 'zuliaoanmo', 'zhoubianyou'],
          ['ribencai', 'SPA', 'jiehun', 'xuexipeixun', 'xican', 'huochejipiao', 'shaokao', 'jiazhuang', 'chongwu', 'quanbufenlei']
        ]
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  .swiper-box {
    width: 100%;
    height: 130px;
    background: #fff;
  }

  .swiper-pagination-bullet-active {
    background: rgb(233, 32, 61) !important;
  }


  .swiper-item {
    ul {
      width: 100%;
      height: auto;
      margin: 0 auto;
    }
    a {
      color: #333;
    }
    li {
      display: inline-block;
      list-style: none;
      width: 20%;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 50px auto;
      background-position: top center;
      text-align: center;
      color: #666;
      font-size: 14px;
    }

    li.jingdian {
        background-image: url(../../assets/image/jingdian.png);
    }
    li.ktv {
        background-image: url(../../assets/image/ktv.png);
    }
    li.gouwu {
        background-image: url(../../assets/image/gouwu.png);
    }
    li.shenghuofuwu {
        background-image: url(../../assets/image/shenghuofuwu.png);
    }
    li.jianshenyundong {
        background-image: url(../../assets/image/jianshenyundong.png);
    }
    li.meifa {
        background-image: url(../../assets/image/meifa.png);
    }
    li.qinzi {
        background-image: url(../../assets/image/qinzi.png);
    }
    li.xiaochikuaican {
        background-image: url(../../assets/image/xiaochikuaican.png);
    }
    li.zizhucan {
        background-image: url(../../assets/image/zizhucan.png);
    }
    li.jiuba {
        background-image: url(../../assets/image/jiuba.png);
    }
    li.meishi {
        background-image: url(../../assets/image/meishi.png);
    }
    li.dianying {
        background-image: url(../../assets/image/dianying.png);
    }
    li.jiudian {
        background-image: url(../../assets/image/jiudian.png);
    }
    li.xuixianyule {
        background-image: url(../../assets/image/xuixianyule.png);
    }
    li.waimai {
        background-image: url(../../assets/image/waimai.png);
    }
    li.huoguo {
        background-image: url(../../assets/image/huoguo.png);
    }
    li.liren {
        background-image: url(../../assets/image/liren.png);
    }
    li.dujiachuxing {
        background-image: url(../../assets/image/dujiachuxing.png);
    }
    li.zuliaoanmo {
        background-image: url(../../assets/image/zuliaoanmo.png);
    }
    li.zhoubianyou {
        background-image: url(../../assets/image/zhoubianyou.png);
    }
    li.ribencai {
        background-image: url(../../assets/image/ribencai.png);
    }
    li.SPA {
        background-image: url(../../assets/image/SPA.png);
    }
    li.jiehun {
        background-image: url(../../assets/image/jiehun.png);
    }
    li.xuexipeixun {
        background-image: url(../../assets/image/xuexipeixun.png);
    }
    li.xican {
        background-image: url(../../assets/image/xican.png);
    }
    li.huochejipiao {
        background-image: url(../../assets/image/huochejipiao.png);
    }
    li.shaokao {
        background-image: url(../../assets/image/shaokao.png);
    }
    li.jiazhuang {
        background-image: url(../../assets/image/jiazhuang.png);
    }
    li.chongwu {
        background-image: url(../../assets/image/chongwu.png);
    }
    li.quanbufenlei {
        background-image: url(../../assets/image/quanbufenlei.png);
    }
  }
  

</style>
