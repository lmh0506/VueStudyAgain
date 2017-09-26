<template>
  <div>
    <div class="buy-store-container clear-fix">
      <div class="item-container float-left">
        <button :class="{'selected': isStore}" @click="store">{{isStore ? '已收藏' : '收藏'}}</button>
      </div>
      <div class="item-container float-right">
        <button  @click="buy">购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        id: this.$route.params.id
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      isStore () {
        let storeSet = this.userInfo.storeList
        if (storeSet) {
          return storeSet.has(this.id)
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapMutations([
        'toggleStore'
      ]),
      loginCheck () {
        if (!this.userInfo.userName) {
          this.$router.push({path: '/login', query: {back: true}})
          return false
        }
        return true
      },
      buy () {
        if (this.loginCheck()) {
          this.$router.push('/User')
        }
      },
      store () {
        if (this.loginCheck()) {
          this.toggleStore(this.id)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .buy-store-container {
    border-top: 1px solid #f1f1f1;
    background-color: #fff;
    padding: 10px 0;

    .item-container {
      width: 50%;
      text-align: center;

      button {
        font-size: 16px;
        width: 100px;
        background-color: #f1f1f1;
        color: #666;
        border: 1px solid #666;
        padding: 5px 0;
      }

      button.selected {
        color: rgb(233, 32, 61);
        border: 1px solid rgb(233, 32, 61);
      }
    }
  }
</style>
