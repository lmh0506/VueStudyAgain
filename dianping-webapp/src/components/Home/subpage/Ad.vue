<template>
  <div>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
      }
    },
    methods: {
      getAdData () {
        axios.get('/api/homead').then(res => {
          if (res.data.error === 0) {
            console.log(res.data.data)
          }
        })
      }
    },
    mounted () {
      this.getAdData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
