<template>
  <section class="toast-container">
    <transition name="fade">
      <div class="toast" v-if="visible">
        <span>{{message}}</span>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        message: ''
      }
    }
  }
</script>

<style lang='scss'>
  .toast-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
      .toast{
        width: 180px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: rgba(0, 0, 0, .61);
        border-radius: 10px;
        color: white;
      }
      .fade-enter-active, .fade-leave-active{
        transition: all 0.3s;
      }
      .fade-enter, .fade-leave-to{
        opacity: 0;
        transform: scale(0.7);
      }
  }

</style>

