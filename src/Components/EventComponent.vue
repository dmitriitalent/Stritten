<template>
    <div class="event" @click="router.push('/event/' + event.Id)">
        <img src="../Assets/temp0.jpg" class="event__img"/>
        <div class="event__data">
            <div class="event__name">
                {{ event.General.Name }}
            </div>
            <div class="event__description">    
                {{ event.General.Description }}
            </div>
            <div class="description__shadow"></div>
        </div>
        <div class="event__menu">
            <div class="menu__tools">
                <UIButton class="tools__button">Visit</UIButton>
                <div class="menu__info">Date: {{ EventDate }}</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { onBeforeMount, ref, watch } from "vue";
import { useEventStore } from "../Stores/EventStore";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps([
    "event"
])

const EventDate = ref("");

const { FormDate } = useEventStore();
onBeforeMount(() => {
    EventDate.value = FormDate(props.event.General.Date);
})

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.event {
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    transition: $transition-fast;
}
.event:hover {
    transform: scale(1.02);
}
.event__img {
    width: 100%;
    display: block;
    border-top-left-radius: $border-radius-small;
    border-top-right-radius: $border-radius-small;
}
.event__data {
    padding: 5px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    height: 200px;
}
.event__name {
    font-size: $font-size-large;
    margin: 10px 0px;
    width: 100%;
}
.event__description {
    text-indent: 30px;
    width: 100%;
    overflow: hidden;
    height: 150px;
    position: relative;
    text-align: justify
}
.description__shadow {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 20%;
    background: linear-gradient(#ffffff00, $color-bg);
}
.event__menu {
    width: 100%;
}
.menu__tools {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.tools__button {
    height: 24px;
    width: 80px;
    text-align: center;
    border-radius: $border-radius-small;
    font-size: $font-size-small;
    background-color: $color-attention;
}

</style>