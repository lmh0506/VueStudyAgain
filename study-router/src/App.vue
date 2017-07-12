<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>导航</h1>
    <p>{{$route.name}}</p>
    <ol>
      <li><router-link to="/">home</router-link></li>
      <li><router-link to="/first">first</router-link></li>
      <ol>
        <li>
          <router-link :to="{name:'Home-First-First',params:{id:123}}">firstfirst</router-link>
        </li>
        <li>
          <router-link to="/first/second">firstsecond</router-link>
        </li>
      </ol>
      <li><router-link to="/second">second</router-link></li>
    </ol>
    <router-view></router-view>
    <router-view name="left" style="width:300px;height:300px;background:red;float:left;"></router-view>
    <router-view name="right" style="width:300px;height:300px;background:red;float:right;"></router-view>
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