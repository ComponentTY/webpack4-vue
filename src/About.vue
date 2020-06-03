<template>
    <div>
        This is About Page !!! 新增一个测测
        <img @click="handleClick" src="@/assets/upload_img_done.png" alt="">
        <Other/>
    </div>
</template>

<script>
import Other from './other'
export default {
    data () {
        return {}
    },
    components: {
        Other
    },
    methods: {
        handleClick () {
            console.log(111)
            alert('hello world')
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    background: rgba(0,0,0,.3);
}
</style>
