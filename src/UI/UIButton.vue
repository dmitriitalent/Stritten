<template>
    <div class="template">
        <button><slot></slot></button>
    </div>
</template>


<script lang="ts">
export default {
    name: "UIButton",

    setup() {
        
    }
}


</script>


<style lang="scss" scoped>
@import "@/global.scss";    
button {
    width: 100%;
    height: 100%;
    outline: none;
    border-radius: inherit;
    box-sizing: border-box;
    padding: inherit;
    background-color: inherit;
    border: none;
    font-family: Montserrat;
    font-weight: 400;
    font-size: inherit;
    transition: $transition-fast;
}
button:hover {
    box-shadow: $box-shadow-small;
}
.template {
    border-radius: $border-radius;
    font-size: $font-size-medium;
}

</style>