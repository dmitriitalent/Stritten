<template>
    <table>
        <slot></slot>
    </table>
</template>


<script lang="ts">
export default {
    name: "UITable",

    setup() {
        
    }
}


</script>


<style lang="scss" scoped>
@import "@/global.scss";    

table {
    border-collapse: collapse;
}
:slotted(td) {
    padding: 10px;
}
:slotted(.table__left) {
    text-align: start;
}
:slotted(.table__right) {
    text-align: end;
}
:slotted(tr) {
    transition: $transition-fast;
}
:slotted(tr:hover) {
    background-color: $color-shadow;
}

</style>