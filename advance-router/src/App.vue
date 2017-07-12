<template>
  <div id="app">
    <h1>Transtions</h1>
    <ul>
      <li><router-link to="/">home</router-link></li>
      <li><router-link to="/parent">parent</router-link></li>
      <li><router-link to="/parent/foo">foo</router-link></li>
      <li><router-link to="/parent/bar">bar</router-link></li>
      <li><router-link to="/parent/bar#anchor">bar#anchor</router-link></li>
      <li><router-link to="/data">data</router-link></li>
    </ul>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>