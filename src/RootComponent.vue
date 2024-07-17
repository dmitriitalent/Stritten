<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from './Stores/AuthStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
const { Refresh } = useAuthStore();
const { IsAuth } = storeToRefs(useAuthStore());

onMounted(() => {
    try {
        Refresh();
    }
    catch {
        IsAuth.value = false;
    }
})

let message = ref("Init");


</script>

<style lang="scss">
@import "@/global.scss";

body {
    background-color: $color-bg;
    margin: 0px;
    padding: 0px;
    font-family: Montserrat;
    font-weight: 400;
    font-size: $font-size-medium;
}
button {
    font-family: Montserrat;
    font-weight: 400;
    font-size: $font-size-medium;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}
input {
    font-family: Montserrat;
    font-weight: 400;
    font-size: $font-size-small;
}
textarea {
    font-family: Montserrat;
    font-weight: 400;
    font-size: $font-size-small;
}
a {
    color: black;
    text-decoration: none;
    font-size: $font-size-small;
}

.work-space {
	width: 1200px;
	margin: auto;
}

.unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}

</style>