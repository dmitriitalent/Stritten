<template>
    <div class="template">
        <div class="line"></div>
        <div class="text">
            <slot></slot>
        </div>
        <div class="line"></div>
    </div>
</template>


<script lang="ts">
export default {
    name: "UIHr",
    setup() {
        
    }
}


</script>


<style lang="scss" scoped>
@import "@/global.scss";    

.line {
    width: 100%;
    margin: auto;
    height: 1px;
    border-radius: $border-radius;
    background-color: $color-shadow;
    margin: 3px 0px;
}
.text {
    font-size: $font-size-smallest;
    line-height: $font-size-smallest;
    width: fit-content;
    white-space: nowrap;
}
.template {
    width: calc(100% - 5px);
    display: flex;
}

</style>