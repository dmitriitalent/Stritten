<template>
    <textarea @input="updateTextarea" v-model="defaultValue" type="text" class="input"></textarea>
</template>


<script lang="ts" setup>
import { ref } from 'vue';


const props = defineProps({
    modelValue: [String]
})
const defaultValue = ref(props.modelValue);

const emit = defineEmits();
const updateTextarea = (event: any) => {
    emit("update:modelValue", event.target.value);
}


</script>


<style lang="scss" scoped>
@import "@/global.scss";    

textarea {
    border-radius: $border-radius-small;
    border: $border;
    outline: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    background-color: inherit;
}


</style>