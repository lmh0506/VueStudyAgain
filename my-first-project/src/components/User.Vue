<template>
    <div>
        user: {{$route.params.id}}
        <router-link :to="{name:'profile',params:{id:$route.params.id}}">profile</router-link >
        <router-link :to="{name:'posts',params:{id:$route.params.id}}">posts</router-link >
        <router-view></router-view>
        <router-view name='left'></router-view>
        <router-view name='right'></router-view>
        <!--可以在界面中拥有多个单独命名的视图  而不是只有一个单独的出口  如果router-view没有设置名字 默认为default-->
    </div>
    <!--一个路径参数使用冒号：标记  当匹配到一个路由时  参数会被设置到this.$route.params
     可以在每个组件中使用 于是我们可以更新user模板 输出当前用户的ID-->
     
</template>
<script>
    export default {
        name: 'user'
    }
</script>