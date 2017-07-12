<template>
  <div class="hello">
    <h1>Hello App</h1>
    
    <!--路由出口-->
    <!--路由匹配到的组件将渲染在这里-->
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'hello'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>