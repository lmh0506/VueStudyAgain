<template>
  <div class="list-container">
    <div class="list-item clear-fix" v-for="(item, index) in list" :key="index">
      <router-link tag="div" :to="{name: 'Detail', params: {id: item.id}}">
        <div class='item-img-container float-left'>
          <img v-lazy='item.img' alt="item.title"/>
        </div>
        <div class="item-content">
          <div class="item-title-container clear-fix">
            <h3 class="float-left">
              {{item.title}}
            </h3>
            <span class="float-right">
              {{item.distance}}
            </span>
          </div>
          <p class="item-sub-title">
            {{item.subTitle}}
          </p>
          <div class="item-price-container clear-fix">
            <span class="price float-left">￥{{item.price}}</span>
            <span class="mumber float-right">已售{{item.mumber}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .list-container {
    background-color: #fff;
    padding: 0 15px;
  }
  .list-item {
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

    .item-img-container {
      width: 120px;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .item-content {
      margin-left: 100px;
      padding-left: 30px;

      .item-title-container {
        height: 25px;

        h3 {
          font-size: 18px;
          line-height: 1;
          color: #333;
        }

        span {
          font-size: 13px;
          line-height: 18px;
          color: #999;
        }
      }
      .item-sub-title {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
      }
      .item-price-container {
          margin-top: 10px;

          .price {
              font-size: 18px;
              line-height: 1;
              font-weight: 900;
              color: rgb(233, 32, 61);
          }
          .mumber {
              font-size: 13px;
              line-height: 18px;
              color: #999;
          }
      }
    }
  }
</style>
