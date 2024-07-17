<template>
	<div class="sidebar">
        <slot></slot>
    </div>
</template>


<script lang="ts" setup>

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.sidebar {
    min-width: 250px;
    max-width: 250px;
    box-shadow: $box-shadow;
    border-radius: $border-radius;
    padding: 5px;
}

</style>
