<template>
	<div>
		<HeaderComponent></HeaderComponent>
		<div class="profile work-space">
			<div class="profile__header">
				<img src="@/Assets/temp0.jpg" class="header__picture"/>
				<img src="@/Assets/temp1.jpg" class="header__avatar header__avatar1">
				<img src="@/Assets/temp2.jpg" class="header__avatar header__avatar2">
				<img src="@/Assets/temp3.jpg" class="header__avatar header__avatar3">
				<img src="@/Assets/temp4.jpg" class="header__avatar header__avatar4">
			</div>
			<div class="profile__menu">
				<div class="menu__info">
					<div class="menu__name">
						{{ User.Profile.Surname + " " + User.Profile.Name }}
					</div>
				</div>
				<div class="menu__bar">
					<UISidebarButton v-for="tab in tabs" @click="openTab(tab)" class="bar__tab bar__events"> {{ tab }} </UISidebarButton>
				</div>
			</div>
			<div class="profile__tabs" v-if="User != undefined">
				<div v-show="tab == 'Events'" class="tabs__tab tabs__events">
					<EventsComponent class="events__visited" :events="VisitedEvents"></EventsComponent>
				</div>
				<div v-show="tab == 'Photos'" class="tabs__tab tabs__photos">
					{{ User.Login }}
				</div>
				<div v-show="tab == 'Friends'" class="tabs__tab tabs__friends">
					{{ User.Role }}
				</div>
				<div v-show="tab == 'Files'" class="tabs__tab tabs__files">
					{{ User.Id + " " +  User.Role }}
				</div>
				<div v-show="tab == 'Info'" class="tabs__tab tabs__info">
					{{ User.Login + " " + User.Id}}
				</div>
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import HeaderComponent from "@/Components/HeaderComponent.vue";
import EventsComponent from "@/Components/EventsComponent.vue";
import { onBeforeMount, ref, watch } from "vue";
import { useEventStore } from "../Stores/EventStore";
import { useUserStore } from "../Stores/UserStore";
import { storeToRefs } from "pinia";

const { User } = storeToRefs(useUserStore());
const { GetVisitedEvents } = useUserStore();

type Tab = "Events" | "Photos" | "Friends" | "Files" | "Info" | "Settings";
const tabs = ref<Tab[]>(["Events", "Photos", "Friends", "Files", "Info"]);
const tab = ref<Tab>("Events");
const openTab = (_tab: Tab) => {
	tab.value = _tab;
};

const VisitedEvents = ref([])
onBeforeMount(() => {
	if(User.value.Id != null) {
		GetVisitedEvents(User.value.Id)
		.then(response => {
			VisitedEvents.value = response.data;
		})
	}
});

watch(User, (newValue) => {
	GetVisitedEvents(User.value.Id)
	.then(response => {
		   VisitedEvents.value = response.data;
	})
},
{
	deep: true
});

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.profile__header {
	width: 100%;
	height: 200px;
	position: relative;
	box-shadow: $box-shadow;
	border-radius: $border-radius;
}
.header__picture {
	object-fit: cover;
	width: 100%;
	height: 100%;
	border-radius: $border-radius;
}
.header__avatar {
	position: absolute;
	height: 170px;
	width: 170px;
	border-radius: 170px;
	object-fit: cover;
	border: 5px solid $color-bg;
	box-sizing: border-box;
}
.header__avatar1 {
	left: 50px;
	top: -20px;
	
}
.header__avatar2 {
	left: 300px;
	top: 40px;
}
.header__avatar3 {
	right: 320px;
	top: -10px;
}
.header__avatar4 {
	right: 30px;
	top: 20px;
}
.profile__tabs {
	margin-top: 10px
}
.profile__menu {
	display: flex;
	justify-content: space-between;
	height: fit-content;
	margin-top: 10px;
}
.menu__bar {
	display: flex;
	justify-content: end;
}
.menu__name {
	height: 100%;
	line-height: 30px;
	font-size: $font-size-larger;
}
.bar__tab {
	margin-left: 5px;
}
.tabs__tab {
	margin-top: 10px;
}
.events__visited {
	margin: auto;
}

</style>