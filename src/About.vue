<template>
    <div>
        This is About Page !!! 新增一个测测
        <img src="@/assets/upload_img_done.png" alt="">
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
        }
    }
</script>

<style lang="scss" scoped>
div{
    background: #00f;
}
</style>