<template>
  <div class="ratingSelect">
    <div class="rating-type border-1px">
      <span @click='select(2,$event)' class='block positive' :class='{"active": selectType === 2}'>{{desc.all}}<span class='count'>{{ratings.length}}</span></span>
      <span @click='select(0,$event)' class='block positive' :class='{"active": selectType === 0}'>{{desc.positive}}<span class='count'>{{positives}}</span></span>
      <span @click='select(1,$event)' class='block negative' :class='{"active": selectType === 1}'>{{desc.negative}}<span class='count'>{{negatives}}</span></span>
    </div>
    <div class="switch" :class='{"on":onlyContent}'>
      <span @click='toggleContent' class="icon-check_circle"></span>
      <span class='text'>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default{
    props: {
      ratings: {
        type: Array,
        deafult () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        }).length
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        }).length
      }
    },
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        this.$emit('select', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('toggleContent', !this.onlyContent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .ratingSelect .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    border-1px(rgba(7,17,27,.1))
  }
  .ratingSelect .rating-type .block{
    display:inline-block;
    padding:8px 12px;
    border-radius:1px;
    margin-right:8px;
    color:rgb(77,85,93);
    font-size:12px;
  }
  .ratingSelect .rating-type .block.active{
    color:#fff;
  }
  .ratingSelect .rating-type .block .count{
    font-size: 8px;
    margin-left: 2px;
  }
  .ratingSelect .rating-type .positive{
    background-color:rgba(0,160,220,.2)
  }
  .ratingSelect .rating-type .positive.active{
    background-color:rgb(0,160,220)
  }
  .ratingSelect .rating-type .negative{
    background-color:rgba(77,85,93,.2)
  }
  .ratingSelect .rating-type .negative.active{
    background-color:rgb(77,85,93)
  }
  .ratingSelect .switch{
    padding: 12px 18px;
    line-height: 24px;
    color:rgb(147,153,159);
    border-bottom:1px solid rgba(7,17,27,.1);
    font-size: 0px;
  }
  .ratingSelect .switch .icon-check_circle{
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    margin-right: 4px;
  }
  .ratingSelect .switch.on .icon-check_circle{
    color:#00c850;
  }
  .ratingSelect .switch .text{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
  }
</style>
