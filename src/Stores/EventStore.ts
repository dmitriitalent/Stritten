import { defineStore, storeToRefs } from "pinia"
import { ref, render } from "vue";
import { CreateEventDTO } from "../Dtos/CreateEvent.dto";
import Cookies from "ts-cookies";
import axios from "axios";
import { appConfig } from "../appConfig";
import { useAuthStore } from "./AuthStore";
import { UnauthorizedException } from "../Exceptions/Unauthorized.exception";
import { useUserStore } from "./UserStore";
import { Event } from "../Entities/Event";

export const useEventStore = defineStore('Event', () => {
	const { User } = storeToRefs(useUserStore());
	

	const GetEventData = (): CreateEventDTO | null => {
		try {
			return JSON.parse(decodeURIComponent(escape(atob(Cookies.get("EventData"))))) as CreateEventDTO;
		}
		catch {
			return null;
		}
	}
	const SaveEventData = (Event: CreateEventDTO) => {
		Cookies.set("EventData", btoa(unescape(encodeURIComponent(JSON.stringify(Event)))));
	} 
	const ResetEventData = () => {
		Cookies.remove("EventData");
	}

	const FormDate = (date: string) => {
		let tempDate = new Date(date);
		return tempDate.getDate() + "." + (tempDate.getMonth()+1) + "." + tempDate.getFullYear();
	}

	const AddEvent = (Event: CreateEventDTO) => {
		const { IsAuth } = storeToRefs(useAuthStore());
		if(!IsAuth.value) {
			throw new UnauthorizedException()
		}

		Event.OrganizerId = User.value.Id;
		console.log(Event)
		axios.post(appConfig.apiUrl + "event/create", Event)
	}

	const AddVisiterToEvent = (UserId: number, EventId: number) => {
		axios.post(appConfig.apiUrl + "event/AddVisiter", { UserId, EventId })
		.then()
	}
	const RemoveVisiterFromEvent = (UserId: number, EventId: number) => {
		axios.post(appConfig.apiUrl + "event/RemoveVisiter", { UserId, EventId })
	}

	const GetEvents = (count: number, page: number): any => {
		return axios.get(appConfig.apiUrl + "event/getEvents?" + "Count=" + count + "&" + "Page=" + page)
	}
	const GetEvent = (Id: number) => {
		return axios.get(appConfig.apiUrl + "event/getEvent?Id=" + Id)
	}

	const EditEvent = (Event: Event) => {
		const { IsAuth } = storeToRefs(useAuthStore());
		if(!IsAuth.value) {
			throw new UnauthorizedException()
		}

		const CreateEventDto: CreateEventDTO = {
			General: Event.General,
			Additionals: Event.Additionals,
			OrganizerId: User.value.Id,
		}
		axios.post(appConfig.apiUrl + "event/editEvent", { Id: Event.Id, ...CreateEventDto})
		.then(response => {
			console.log(response)
		})
	}

	

	const GetVisiters = (EventId: number) => {
		return axios.get(appConfig.apiUrl + "event/getVisiters?Id=" + EventId)
	}

	return {  
		SaveEventData,
		ResetEventData, 
		GetEventData, 
		AddEvent, 
		GetEvents, 
		GetEvent, 
		FormDate, 
		EditEvent,
		AddVisiterToEvent,
		RemoveVisiterFromEvent,
		GetVisiters
	};
})

