<template>
    <div class="post">
        <div class="post" v-if='loading'>
            loading...
        </div>
        <div class="error" v-if='error'>
            {{error}}
        </div>
        <div class="content" v-if='content' v-for='post in content'>
            <h2>{{post.title}}</h2>
            <p>{{post.content}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                laoding: false,
                error: null,
                content: null
            }
        },
        created() {
            //组件创建完成后获取数据
            //此时data已经被 observed了
            this.fetchData();
        },
        watch: {
            //如果路由有变化  会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.error = this.post = null;
                this.loading = true;

                this.$http.get('/api/data').then((res) => {
                    this.loading = false;
                    res = res.body.data;
                    if (res) {
                        this.content = res;
                    } else {
                        this.error = '服务出错';
                        l
                    }
                })
            }
        }
    }
</script>