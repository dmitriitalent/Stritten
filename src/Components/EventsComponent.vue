<template>
    <div class="events">
        <EventComponent v-for="event in events" class="events__event" :event="event"></EventComponent>
    </div>
</template>


<script lang="ts" setup>
import EventComponent from "@/Components/EventComponent.vue";

const props = defineProps({
    events: [Array<any>]
})



</script>


<style lang="scss" scoped>
@import "@/global.scss";

.events {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    width: fit-content;
}
.events__event {
    width: 290px;
}

</style>