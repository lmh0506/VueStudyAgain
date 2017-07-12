<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{totalPrice}}</p>
    <h2>导航</h2>
    <ul>
      <li><router-link to="/apple">to apple</router-link></li>
      <li><router-link to="/banana">to banana</router-link></li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {
            totalPrice() {
                return this.$store.state.totalPrice
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
        font-weight: normal;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
</style>