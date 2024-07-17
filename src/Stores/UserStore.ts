import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue";
import axios from "axios";
import { appConfig } from "../appConfig";
import { User, Role } from "../Entities/User";
import { useAuthStore } from "./AuthStore";
import * as jose from "jose";
import { GetUserDTO } from "../Dtos/GetUser.dto";
import Cookies from "ts-cookies";

export const useUserStore = defineStore('User', () => {
    const User = ref<User>({
        Id: null,
        Login: null,
        Password: null,
        Role: null,
        Profile: {
            Id: null,
            Name: null,
            Surname: null,
            Email: null,
            UserId: null,
            User: null,
        },
        OrganizedEvents: [],
        VisitedEvents: []
    })
    
    const GetProfile = (Id: number) => {
        return axios.get(appConfig.apiUrl + "user/getProfile?Id=" + Id)
    }

    const GetUser = (Id: number) => {
        return axios.get(appConfig.apiUrl + "user/getUser?Id=" + Id)
    }
    
    const SetUserState = (token: string) => {

        GetUser(Number(jose.decodeJwt(token).Id))
        .then((response) => {
            const user: GetUserDTO = response.data;
            User.value.Id = user.Id;
            User.value.Login = user.Login;
            User.value.Role = user.Role as Role;
            User.value.Profile.Name = user.Profile.Name;
            User.value.Profile.Surname = user.Profile.Surname;
            User.value.Profile.Email = user.Profile.Email;
            User.value.Profile.Id = user.Profile.Id;
        })
        .then(() => {
            useAuthStore().IsAuth = true;
        })
        .catch(() => {
            useAuthStore().IsAuth = false;
        })
    }

    const GetVisitedEvents = (UserId: number) => {
		return axios.get(appConfig.apiUrl + "user/getVisitedEvents?Id=" + UserId)
	}

    return { User, GetProfile, SetUserState, GetVisitedEvents };
})

