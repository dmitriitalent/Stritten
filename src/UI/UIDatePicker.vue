<template>
    <div class="wrapper">
        <div class="datepicker unselectable" @click="toggle()">{{ date.getDate() }}.{{ date.getMonth()+1 }}.{{ date.getFullYear() }}</div>
        <div class="calendar" v-show="isOpen">
            <UICalendar v-model="date"></UICalendar>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref, watch } from "vue";
    
const isOpen = ref(false);

const props = defineProps({
    defaultValue: [Date]
}) 

const date = ref(props.defaultValue || new Date());

const emit = defineEmits();
const updateDate = (date: Date) => {
    emit("update:modelValue", date);
}

watch(date, (newValue) => {
    updateDate(newValue);
    close();
})

const open = () => {
    isOpen.value = true;
}

const close = () => {
    isOpen.value = false;
}

const toggle = () => {
    isOpen.value = !isOpen.value;
}

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.wrapper {
    position: relative;
    width: 100%;
}
.datepicker {
    width: 100%;
    height: 100%;
    box-shadow: $box-shadow-small inset;
    border-radius: $border-radius-small;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
}
.calendar {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin-top: 10px;
    background-color: $color-bg!important;
    z-index: 1;
}

</style>