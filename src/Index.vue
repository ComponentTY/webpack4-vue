<template>
    <div>
        <router-link to='/'>首页</router-link>
        <router-link to='/about'>关于</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    mounted () {
    }
}
</script>

<style lang="scss" scoped>
.green{
    color: #00f;
}
</style>
