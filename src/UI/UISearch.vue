<template>
    <div class="template">
        <input @input="updateInput" :placeholder="placeholder" v-model="vmodel" type="text" class="input">
        <img class="icon unselectable" tabindex="1" src="@/Assets/search.png"></img>
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    placeholder: [String],
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
    border-radius: inherit;
    border: none!important;
    outline: none;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 0px 0px 10px;
    background-color: inherit;
}

.template {
    border-radius: $border-radius-small;
    border: $border-unfocus;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}
.input:focus .template {
    border: $border;
}
.icon {
    width: 32px;
    height: 100%;
    display: block;
    opacity: 0.4;
    box-sizing: border-box;
    padding: 5px;
    transition: $transition-fast;
}
.icon:hover {
    opacity: 0.8;
    padding: 4px;
}
.icon:active {
    opacity: 0.8;
    padding: 5px;
}

</style>