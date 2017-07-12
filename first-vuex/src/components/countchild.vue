<template>
    <div>
        {{count}}
        <br/>
        doneTodosCount :  {{doneTodosCount}}
    </div>
</template>
<script>
    export default {
        name: 'countchild',
        computed: {
            count() {
                //通过根实例注册store选项  该store实例会注入到根组件下的所有子组件中  
                //子组件能通过this.$store访问到
                return this.$store.state.count
            },
            doneTodosCount() {
                return this.$store.getters.doneTodosCount
            }
        },
        methods: {

        }
    }
</script>