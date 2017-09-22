<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
  @import './assets/css/common.scss';
  @import './assets/css/font.css';
  
  .swiper-pagination-bullet-active {
    background: rgb(233, 32, 61) !important;
  }
</style>
