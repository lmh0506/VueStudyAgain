<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <li>
        <router-link to="/">home</router-link>
      </li>
      <li>
        <router-link to="/parent">parent</router-link>
      </li>
      <li>
        <router-link to="/params/111/222">params</router-link>
      </li>
      <li>
        <router-link to="/parame-regex/asda">parame-regex</router-link>
      </li>
      <li>
        <router-link to="/transition">transition</router-link>
      </li>
    </ul>
    <transition :name="aaa" mode="out-in">
      <router-view></router-view>
    </transition>
    
    <p>show</p>
    <pre>
      <code>
        {{JSON.stringify($route,null,2)}}
      </code>
    </pre>
  </div>
</template>

<script>
    export default {
        name: 'app',
        watch: {
            '$route' (to, from) {
                if (from.path == '/parent') {
                    this.aaa = 'fade';
                } else {
                    this.aaa = 'fade2'
                }
            }
        }
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
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s;
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    
    .fade2-enter-active,
    .fade2-leave-active {
        transition: all .5s;
    }
    
    .fade2-enter,
    .fade2-leave-active {
        transform: scale(1.5);
        opacity: 0;
    }
</style>