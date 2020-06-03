<template>
    <div>
        <common-header></common-header>
        11111This is Home Page !!!123123123asdasdasdasdasd
        <img src="@/assets/upload_img_done.png" alt="">
        <img src="@/assets/img_t03_carbody.jpg" alt="">
        <svg-icons icon-class='bars'/>
        <img src="@/assets/bars.svg" alt="">
        <p>{{msg}}11111</p>
        <Other/>
    </div>
</template>

<script>
import Other from './other'
export default {
    data () {
        return {
            msg: 'hello'
        }
    },
    components: {
        Other
    }
}
</script>

<style lang="scss" scoped>
div{
    background: #f00;
}
</style>
