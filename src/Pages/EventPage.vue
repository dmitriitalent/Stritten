<template>
	<div>
		<HeaderComponent></HeaderComponent>
		<div class="content work-space">
			<SidebarComponent>
				<UISidebarButton class="sidebar__button" v-for="tab in tabs" @click="openTab(tab)">{{ tab }}</UISidebarButton>
				<div class="sidebar__tools">
					<UIHr></UIHr>
					<UISidebarButton v-if="!IsVisiter" @click="AddVisiterToEvent(User.Id, Number(route.params.Id))" class="sidebar__button sidebar__tool">Visit</UISidebarButton>
					<UISidebarButton v-if="IsVisiter" @click="RemoveVisiterFromEvent(User.Id, Number(route.params.Id))" class="sidebar__button sidebar__tool">Leave</UISidebarButton>
					<div class="tools__admin" v-if="EventData.OrganizerId == User.Id">
						<UIHr></UIHr>
						<UISidebarButton @click="EditMode = true" v-if="!EditMode" class="sidebar__button">Edit mode</UISidebarButton>
						<!-- <UISidebarButton @click="EditEvent(Number(route.params.Id)); EditMode = false" v-if="EditMode" class="sidebar__button sidebar__tool">Save</UISidebarButton> -->
						<UISidebarButton @click="ReturnEvent(); EditMode = false" v-if="EditMode" class="sidebar__button sidebar__tool">Return</UISidebarButton>
					</div>
				</div>
			</SidebarComponent>
			<div class="content__tab content__general" v-show="tab == 'General'">
				<UITable class="content__table">
					<tr>
						<td class="table__left">Event`s name</td>
						<td class="table__right" v-if="!EditMode">{{ EventData.General.Name }}</td>
						<td class="table__right" v-if="EditMode"><UIInput v-model="EventData.General.Name"></UIInput></td>
					</tr>
					<tr>
						<td class="table__left">Description</td>
						<td class="table__right" v-if="!EditMode">{{ EventData.General.Description }}</td>
						<td class="table__right" v-if="EditMode"><UITextarea v-model="EventData.General.Description"></UITextarea></td>
					</tr>
					<tr>
						<td class="table__left">Place</td>
						<td class="table__right" v-if="!EditMode">{{ EventData.General.Place }}</td>
						<td class="table__right" v-if="EditMode"><UIInput v-model="EventData.General.Place"></UIInput></td>
					</tr>
					<tr>
						<td class="table__left">Date</td>
						<td class="table__right" v-if="!EditMode">{{ FormDate(String(EventData.General.Date)) }}</td>
						<td class="table__right" v-if="EditMode"><UIDatePicker v-model="EventData.General.Date"></UIDatePicker></td>
					</tr>
				</UITable>
			</div>
			<div class="content__tab content__additionals" v-show="tab == 'Additionals'">
				<UITable class="content__table">
					<tr v-for="i in createIds(EventData.Additionals.length)">
						<td class="table__left"  v-if="!EditMode">{{ EventData.Additionals[i]['Key'] }}</td>
						<td class="table__left"  v-if="EditMode"><UIInput v-model="EventData.Additionals[i]['Key']"></UIInput></td>
						<td class="table__right" v-if="!EditMode">{{ EventData.Additionals[i]['Value'] }}</td>
						<td class="table__right" v-if="EditMode"><UIInput v-model="EventData.Additionals[i]['Value']"></UIInput></td>
					</tr>
				</UITable>
			</div>
			<div class="content__tab content__visiters" v-show="tab == 'Visiters'">
				<div v-for="visiter in EventData" class="visiters__visiter">
					
				</div>
			</div>
			<div class="content__tab content__music" v-show="tab == 'Music'">
				asdf3
			</div>
			<div class="content__tab content__news" v-show="tab == 'News'">
				asdf4
			</div>
			<div class="content__tab content__chat" v-show="tab == 'Chat'">
				asdf5
			</div>
		</div>
	</div>
</template>


<script lang="ts" setup>
import HeaderComponent from "@/Components/HeaderComponent.vue";
import SidebarComponent from "@/Components/SidebarComponent.vue";
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEventStore } from "../Stores/EventStore";
import { useRoute } from "vue-router";
import UIDatePicker from "../UI/UIDatePicker.vue";
import UITextarea from "../UI/UITextarea.vue";
import UISidebarButton from "../UI/UISidebarButton.vue";
import { Event } from "../Entities/Event";
import { useUserStore } from "../Stores/UserStore";
import * as jose from "jose";
import Cookies from "ts-cookies";

const { GetEvent, FormDate, EditEvent, AddVisiterToEvent, RemoveVisiterFromEvent } = useEventStore();
const { User } = storeToRefs(useUserStore());
const EventData = ref<Event>(new Event())
const route = useRoute();

type Tab = "General" | "Additionals" | "Music" | "News" | "Chat" | "Visiters";
const tabs = ref<Tab[]>(["General", "Additionals", "Visiters", "Music", "News", "Chat"]);
const tab = ref<Tab>(tabs.value[0]);

const openTab = (_tab: Tab) => {
	tab.value = _tab;
}

const createIds = (count: number): number[] => {
	let result = [];
	for (let i = 0; i < count; i++) {
		result.push(i);		
	}
	return result;
}

onBeforeMount(() => {
	GetEvent(Number(route.params.Id))
	.then(response => {
		EventData.value = response.data;
		IsVisiter.value = CheckVisiter((jose.decodeJwt(Cookies.get("AccessToken")) as any).Id , EventData.value);
	})
})

const IsVisiter = ref(false);
const CheckVisiter = (UserId: number, Event: Event) => {
	if(Event.Visiters.length == 0) {
		throw new Error("Visiters array is empty.");
	} 
	for (let i = 0; i < Event.Visiters.length; i++) {
		if(Event.Visiters[i].Id == UserId) {
			Event.Visiters[i].Id
			console.log(123)
			return true;
		}       
	}
	return false;
}

const EditMode = ref(false);
const ReturnEvent = () => {
	GetEvent(Number(route.params.Id))
	.then(response => {
		EventData.value = response.data;
	})
}

</script>


<style lang="scss" scoped>
@import "@/global.scss";

.content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.content__tab { 
	width: 100%;
	box-sizing: border-box;
	padding: 0px 10px;
}
.content__table {
	width: 100%;
}
.content__table>tr>.table__right {
	width: 400px;
	text-align: justify;
}
.sidebar__button {
	margin: 2px 0px;
}
.sidebar__tool {
	background-color: $color-attention;
}

</style>