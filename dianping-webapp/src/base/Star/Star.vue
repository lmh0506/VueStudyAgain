<template>
  <div class="star-container">
    <i v-for="(item, index) in max" :key="index" class="icon-star" :class="{'light': item <= num}" @click="editStar(index)"></i>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        max: [1, 2, 3, 4, 5]
      }
    },
    props: {
      num: {
        type: Number,
        default: 0
      },
      edit: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      editStar (index) {
        if (this.edit) {
          this.$emit('editStar', index + 1)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .star-container {
    display: inline-block;

    i {
      color: #999;
      margin: 0 1.5px;
    }

    .light {
      color: rgb(233, 32, 61);
    }
  }
</style>
