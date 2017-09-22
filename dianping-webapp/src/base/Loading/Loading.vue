<template>
  <div v-show="isShow">
    <img src="../../assets/image/loading-spinning-bubbles.svg">
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  div {
    margin: 5px auto;
    text-align: center;
  }
</style>
