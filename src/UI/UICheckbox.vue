<template>
    <div class="checkboxWrapper">
        <input @change="updateInput" v-model="defaultValue" type="checkbox" class="checkbox">
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  defaultValue: [Boolean]
})

const defaultValue = ref(props.defaultValue || false);

const emit = defineEmits();
const updateInput = (event: any) => {
    emit("update:modelValue", event.target.checked);
}

</script>


<style lang="scss" scoped>
@import "@/global.scss";    

.checkboxWrapper .checkbox {
  appearance: none;
  background-color: #dfe1e4;
  border-radius: calc(72px * 1.3);
  border-style: none;
  flex-shrink: 0;
  height: calc(20px * 1.3);
  margin: 0;
  position: relative;
  width: calc(30px * 1.3);
}
.checkboxWrapper .checkbox::before {
  bottom: calc(-6px * 1.3);
  content: "";
  left: calc(-6px * 1.3);
  position: absolute;
  right: calc(-6px * 1.3);
  top: calc(-6px * 1.3);
}
.checkboxWrapper .checkbox,
.checkboxWrapper .checkbox::after {
  transition: all 100ms ease-out;
}
.checkboxWrapper .checkbox::after {
  background-color: #fff;
  border-radius: 50%;
  content: "";
  height: calc(14px * 1.3);
  left: calc(3px * 1.3);
  position: absolute;
  top: calc(3px * 1.3);
  width: calc(14px * 1.3);
}
.checkboxWrapper input[type=checkbox] {
  cursor: default;
}
.checkboxWrapper .checkbox:hover {
  background-color: #c9cbcd;
  transition-duration: 0s;
}
.checkboxWrapper .checkbox:checked {
  background-color: #6e79d6;
}
.checkboxWrapper .checkbox:checked::after {
  background-color: #fff;
  left: calc(13px * 1.3);
}
.checkboxWrapper :focus:not(.focus-visible) {
  outline: 0;
}
.checkboxWrapper .checkbox:checked:hover {
  background-color: #535db3;
}


</style>