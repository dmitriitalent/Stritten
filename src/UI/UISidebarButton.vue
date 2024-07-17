<template>
    <div class="template">
        <button><slot></slot></button>
    </div>
</template>


<script lang="ts">
export default {
    name: "UISidebarButton",

    setup() {
        
    }
}


</script>


<style lang="scss" scoped>
@import "@/global.scss";    
button {
    width: 100%;
    height: 30px;
    outline: none;
    border-radius: $border-radius-small;
    box-sizing: border-box;
    background-color: inherit;
    border: none;
    font-family: Montserrat;
    font-weight: 400;
    font-size: $font-size-small;
    transition: $transition-fast;
    text-align: left;
}
button:hover {
    background-color: $color-shadow;
}
.template {
    border-radius: $border-radius-small;
}

</style>