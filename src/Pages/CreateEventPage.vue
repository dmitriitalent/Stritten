<template>
	<div>
		<HeaderComponent></HeaderComponent>
		<div class="content work-space">
			<SidebarComponent>
				<UISidebarButton class="sidebar__button" v-for="tab in tabs" @click="openTab(tab)"> {{ tab }} </UISidebarButton>
				<UIHr></UIHr>
				<UISidebarButton @click="CreateEvent" class="sidebar__button sidebar__create">Create</UISidebarButton>
			</SidebarComponent>
			<div class="content__tab content__general" v-show="tab == 'General'">
				<UITable class="content__table">
					<tr>
						<td class="table__left">Event`s name</td>
						<td class="table__right"><UIInput v-model="EventData.General.Name" class="table__input"></UIInput></td>
					</tr>
					<tr>
						<td class="table__left">Description</td>
						<td class="table__right"><UITextarea v-model="EventData.General.Description" class="table__input table__textarea"></UITextarea></td>
					</tr>
				</UITable>
				<UIHr></UIHr>
				<UITable class="content__table">
					<tr>
						<td class="table__left">Private</td>
						<td class="table__right"><UICheckbox :defaultValue="EventData.General.Private" v-model="EventData.General.Private"></UICheckbox></td>
					</tr>
					<tr>
						<td class="table__left">Hide date</td>
						<td class="table__right"><UICheckbox :defaultValue="EventData.General.HideDate" v-model="EventData.General.HideDate"></UICheckbox></td>
					</tr>
					<tr>
						<td class="table__left">Hide place</td>
						<td class="table__right"><UICheckbox :defaultValue="EventData.General.HidePlace"  v-model="EventData.General.HidePlace"></UICheckbox></td>
					</tr>
					<tr>
						<td class="table__left">Fundraising</td>
						<td class="table__right"><UICheckbox :defaultValue="EventData.General.Fundraising" v-model="EventData.General.Fundraising"></UICheckbox></td>
					</tr>
				</UITable>
				<UIHr></UIHr>
				<UITable class="content__table">
					<tr>
						<td class="table__left">Date</td>
						<td class="table__right"><UIDatePicker :defaultValue="new Date(EventData.General.Date)" v-model="EventData.General.Date"></UIDatePicker></td>
					</tr>
					<tr>
						<td class="table__left">Place</td>
						<td class="table__right"><UIInput v-model="EventData.General.Place"></UIInput></td>
					</tr>
				</UITable>
			</div>
			<div class="content__tab" v-show="tab == 'Additionals'">
				<UITable class="additionals__table">
					<tr v-for="i in createIds(EventData.Additionals.length)">
						<td class="table__left"><UIInput v-model="EventData.Additionals[i]['Key']"></UIInput></td>
						<td class="table__right"><UIInput v-model="EventData.Additionals[i]['Value']"></UIInput></td>
					</tr>
				</UITable>
				<UIButton @click="AddRow()">Add</UIButton>
			</div>
			<div class="content__tab" v-show="tab == 'Premium'">
				asdf
			</div>
			<div class="content__tab" v-show="tab == 'Invite'">
				000
			</div>
		</div>
	</div>
	
</template>

<script setup lang="ts">
import HeaderComponent from "@/Components/HeaderComponent.vue";
import SidebarComponent from "@/Components/SidebarComponent.vue";
import { onBeforeMount, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEventStore } from "../Stores/EventStore";
import { CreateEventDTO } from "../Dtos/CreateEvent.dto";
import { useRouter } from "vue-router";
import { UnauthorizedException } from "../Exceptions/Unauthorized.exception";

const EventData = ref<CreateEventDTO>({
    General: {
        Name: "",
        Description: "",
        Private: false,
        HideDate: false,
        HidePlace: false,
        Fundraising: false,
        Date: new Date(),
        Place: ""
    },
    Additionals: [],
    OrganizerId: 0,
});

const router = useRouter();

type Tab = "General" | "Additionals" | "Premium" | "Invite";
const tabs = ref<Tab[]>(["General", "Additionals", "Premium", "Invite"]);
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
const AddRow = () => {
	EventData.value.Additionals.push({Key: "", Value: ""});
}
const { SaveEventData, GetEventData, AddEvent } = useEventStore();
onBeforeMount(() => {
	EventData.value = GetEventData();
})
watch(EventData, (newValue) => {
	SaveEventData(EventData.value);
},
{ deep: true })

const CreateEvent = () => {
	try { 
		AddEvent(EventData.value);
	}
	catch (error) {
		if(error instanceof UnauthorizedException)
		{
			router.push("/registration");
		}
	}
}

</script>


<style lang="scss" scoped>
@import "@/global.scss";

header { 
	width: 100%;
	height: 100px;
}
.content {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.sidebar__button {
	margin-bottom: 2px;
}
.sidebar__create {
	background-color: $color-attention;
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
}
.additionals__table {
	width: 100%;
}
.table__input {
	width: 400px;
	resize: vertical;
}
.table__textarea {
	border: $color-border solid 1px;
}
.table__right {
	width: 70%;
}

		
</style>