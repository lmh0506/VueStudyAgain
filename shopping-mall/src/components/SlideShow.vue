<template>
    <div class="slide-show" @mouseover='clearInv' @mouseout='runInv'>
            <div class="slide-img">
                <a :href="slides[nowIndex].href">
                    <transition name='slide-trans' mode='out-in'>
                        <img v-if='isShow' :src="slides[nowIndex].src" alt="">
                    </transition>
                    <transition name='slide-trans-old' mode='out-in'>
                        <img v-if='!isShow' :src="slides[nowIndex].src" alt="">
                    </transition>
                </a>
            </div>
        
        <h2>{{slides[nowIndex].title}}</h2>
        <ul class='slide-pages'>
            <li @click='goto(prevIndex)'>&lt;</li>
            <li :class="{on:index==nowIndex}" v-for='(item,index) in slides' @click='goto(index)'>
                {{index+1}}
            </li>
            <li @click='goto(nextIndex)'>&gt;</li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            slides: {
                type: Array,
                default: []
            },
            invTime: {
                type: Number,
                default: 1000
            }
        },
        data() {
            return {
                nowIndex: 0,
                isShow: true
            }
        },
        computed: {
            prevIndex() { //通过计算属性来实现轮播图的前进后退  比重新写一个方法去调用更方便
                return this.nowIndex - 1 < 0 ? this.slides.length - 1 : this.nowIndex - 1
            },
            nextIndex() {
                return this.nowIndex + 1 >= this.slides.length ? 0 : this.nowIndex + 1
            }
        },
        methods: {
            goto(index) {
                this.isShow = false
                setTimeout(() => {
                    this.isShow = true
                    this.nowIndex = index
                    this.$emit('onchange', index) //$emit 触发当前实例上的事件
                }, 10)

            },
            runInv() {
                this.invId = setInterval(() => {
                    this.goto(this.nextIndex)
                }, this.invTime)
            },
            clearInv() {
                clearInterval(this.invId)
            }
        },
        mounted() { //组件渲染完毕时执行计时器函数
            this.runInv()
        }
    }
</script>
<style scoped>
    .slide-trans-enter-active {
        transition: all .5s;
    }
    
    .slide-trans-enter {
        transform: translateX(100%);
    }
    
    .slide-trans-old-leave-active {
        transition: all .5s;
        transform: translateX(-100%);
    }
    
    .slide-show {
        position: relative;
        margin: 15px 15px 15px 0;
        width: 900px;
        height: 500px;
        overflow: hidden;
    }
    
    .slide-show h2 {
        position: absolute;
        width: 100%;
        height: 100%;
        color: #fff;
        background: #000;
        opacity: .5;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        text-align: left;
        padding-left: 15px;
    }
    
    .slide-img {
        width: 100%;
    }
    
    .slide-img img {
        width: 100%;
        position: absolute;
        top: 0;
    }
    
    .slide-pages {
        position: absolute;
        bottom: 10px;
        right: 15px;
    }
    
    .slide-pages li {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        color: #fff;
    }
    
    .slide-pages li.on {
        text-decoration: underline;
    }
</style>