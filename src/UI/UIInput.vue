<template>
    <input @input="updateInput" v-model="vmodel" type="text" class="input">
</template>


<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: [String]
})

const vmodel = ref(props.modelValue);

const emit = defineEmits();
const updateInput = (event: any) => {
    emit("update:modelValue", event.target.value);
}

</script>


<style lang="scss" scoped>
@import "@/global.scss";    

input {
    background-color: inherit;
    border: none;
    border-bottom: solid 1px $color-border;
    outline: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    padding-bottom: 1px;
}


</style>