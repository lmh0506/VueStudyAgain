<template>
  <div>
    <base-header :isBack='!!this.userInfo.userName'>
      <h1>用户中心</h1>
    </base-header>
    <div class="userinfo-container">
      <p>
        <i class="icon-user"></i>
        &nbsp;
        <span>{{userInfo.userName}}</span>
      </p>
      <p>
        <i class="icon-map-marker"></i>
        &nbsp;
        <span>{{cityName}}</span>
      </p>
    </div>
    <div class="order-list-container">
      <h2>您的订单</h2>
      <div class="order-item-container" v-for="(item, index) in orderList" :key="index">
        <div class="clear-fix">
          <div class="order-item-img float-left">
            <img :src="item.img" alt="">
          </div>
          <div class="order-item-comment float-right">
            <button v-if="item.commentState === 0" @click="showComment(item)" class="btn">评价</button>
            <button v-else-if="item.commentState === 2" class="btn unseleted-btn">已评价</button>
          </div>
          <div class="order-item-content">
            <span>商店：{{item.title}}</span>
            <span>数量：{{item.count}}</span>
            <span>价格：￥{{item.price}}</span>
          </div>
        </div>
        <div class="comment-text-container" v-show="item.commentState === 1">
          <textarea style="width:100%;height:80px" class="comment-text" ref="comment"></textarea>
          <div style="paddingTop:10px;paddingBottom:10px">
            <star :edit='true' @editStar='setStar($event, item)' :num='item.num ? item.num : 0'></star>
          </div>
          <button class="btn" @click="submitComment(index, item)">提交</button>
          &nbsp;
          <button class="btn unselected-btn" @click="hideComment(item)">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getOrderList} from 'fetch/orderlist/orderlist'
  import {ERR_OK} from 'fetch/config'
  import BaseHeader from '@/base/BaseHeader/BaseHeader'
  import Star from '@/base/Star/Star'
  import axios from 'axios'

  export default {
    data () {
      return {
        orderList: []
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'cityName'
      ])
    },
    components: {
      BaseHeader,
      Star
    },
    methods: {
      getOrderList () {
        getOrderList(this.userInfo.userName).then(res => {
          if (res.data.error === ERR_OK) {
            this.orderList = res.data.data
          }
        })
      },
      showComment (item) {
        item.commentState = 1
      },
      hideComment (item) {
        item.commentState = 0
      },
      setStar (num, item) {
        this.$set(item, 'num', num)
      },
      submitComment (index, item) {
        let val = this.$refs.comment[index].value
        axios.post('/api/submitComment', {comment: val}).then(res => {
          if (res.data.error === ERR_OK) {
            item.commentState = 2
          }
        })
      }
    },
    created () {
      if (!this.userInfo.userName) {
        this.$router.push('/login')
      }
    },
    mounted () {
      this.getOrderList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  h1 {
    display: inline;
    font-size: 16px;
    line-height: 1;
  }

  .userinfo-container{
    background-color: #fff;
    padding: 10px;

    p{
      line-height: 1.5;
      color: #666;
    }
  }

  .order-list-container {
    margin-top: 15px;
    background-color: #fff;
    padding: 10px 10px 0 10px;

    h2 {
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 10px;
    }
  }

  .order-item-container {
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;

    .btn {
      width: 100px;
      text-align: center;
      background-color: rgb(233, 32, 61);
      color: #fff;
      padding: 5px 0;
      border: 0;
      font-size: 16px;
    }
    .unseleted-btn {
      background-color: #999;
    }

    .order-item-img {
      width: 120px;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .order-item-comment {
      width: 100px;
      text-align: right;

      button {
        margin-top: 25px;
      }
    }

    .order-item-content {
      margin: 0 80px 0 120px;

      span {
        color: #666;
        display: block;
        text-align: left;
        line-height: 1.5;
      }
    }

    .comment-text-container {
      margin-top: 10px;

      .comment-text {
        border: 1px solid #f1f1f1;
      }
    }
}
</style>
