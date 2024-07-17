<template>
    <div>
		<HeaderComponent></HeaderComponent>
		<div class="content work-space">
            <SidebarComponent>
                <div class="sidebar__tools">
                    <div class="tools__search">
                        <UISearch placeholder="Search for name" class="search__name"></UISearch>
                        <UIDatePicker class="tools__tool search__date"></UIDatePicker>
                    </div>
                    <UIButton class="tools__tool tools__clear">Clear</UIButton>
                </div>
            </SidebarComponent>
            <div class="content__events">
                <EventsComponent :events="events"></EventsComponent>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import HeaderComponent from "@/Components/HeaderComponent.vue";
import EventsComponent from "@/Components/EventsComponent.vue";
import SidebarComponent from "@/Components/SidebarComponent.vue";
import { useEventStore } from "../Stores/EventStore";
import { onBeforeMount, ref } from "vue";

const { GetEvents } = useEventStore();
const page = ref(1);
const events = ref(null);

onBeforeMount(() => {
    GetEvents(30, page.value)
    .then((response: any) => {
        events.value = response.data;
        page.value++;
    });
})

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}
.tools__tool {
    margin-top: 10px
}
.search__name {
    height: 32px;
	margin: auto;
}
.tools__clear {
    height: 36px;
    background-color: $color-attention;
}


</style>