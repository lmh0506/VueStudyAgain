<template>
    <div>user: {{$route.params.id}} userprofile  in  user's routeView</div>
</template>
<script>
    export default {
        name: 'userprofile'
    }
</script>
<style scoped>
    div {
        width: 100px;
        height: 100px;
        background-color: red;
        color: #fff;
        margin: 0px auto;
    }
</style>