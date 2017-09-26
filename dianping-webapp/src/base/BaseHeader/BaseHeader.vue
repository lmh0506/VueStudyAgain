<template>
  <div id="common-header">
    <span class="back-icon" @click="back">
      <i class="icon-chevron-left"></i>
    </span>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      isBack: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      back () {
        if (this.isBack) {
          this.$router.back()
        } else {
          this.$router.go(-2)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  #common-header {
    background-color: rgb(233, 32, 61);
    color: #fff;
    padding: 15px 10px;
    text-align: center;
    position: relative;

    .back-icon {
      width: 16px;
      height: 16px;
      position: absolute;
      left: 10px;
    }
  }
</style>
