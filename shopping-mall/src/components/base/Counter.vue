<template>
    <div class="counter-component">
        <div class="counter-btn" @click='minus'>-</div>
        <div class="counter-show">
            <input type="text" v-model='number' @keyup='fixNumber'>
        </div>
        <div class="counter-btn" @click='add'>+</div>
    </div>
</template>
<script>
    export default {
        props: {
            max: {
                type: Number,
                default: 5
            },
            min: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                number: this.min
            }
        },
        watch: {
            number() {
                this.$emit('on-change', this.number)
            }
        },
        methods: {
            minus() {
                this.number - 1 < this.min ? this.min : this.number--
            },
            add() {
                this.number + 1 > this.max ? this.max : this.number++
            },
            fixNumber() {
                if (isNaN(this.number)) {
                    this.number = this.min
                }
                if (this.number > this.max) {
                    this.number = this.max
                    return;
                }
                if (this.number < this.min) {
                    this.number = this.min
                    return;
                }
            }
        }
    }
</script>
<style scoped>
    .counter-component {
        position: relative;
        display: inline-block;
        overflow: hidden;
        vertical-align: middle;
    }
    
    .counter-show {
        float: left;
    }
    
    .counter-show input {
        border: none;
        border-top: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
        height: 23px;
        line-height: 23px;
        width: 30px;
        outline: none;
        text-indent: 4px;
    }
    
    .counter-btn {
        border: 1px solid #e3e3e3;
        float: left;
        height: 25px;
        line-height: 25px;
        width: 25px;
        text-align: center;
        cursor: pointer;
    }
    
    .counter-btn:hover {
        border-color: #4fc08d;
        background: #4fc08d;
        color: #fff;
    }
</style>