import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { RegistrationDTO } from "../Dtos/Registration.dto";
import { LoginDTO } from "../Dtos/Login.dto";
import axios from "axios";
import { appConfig } from "../appConfig";
import Cookies from "ts-cookies";

import { useUserStore } from "./UserStore";

export const useAuthStore = defineStore('Auth', () => {
    const IsAuth = ref(false);
    const { SetUserState } = useUserStore();


    const RegistrationSubmit = (data: RegistrationDTO) => {
        return axios.post(appConfig.apiUrl + "auth/registration", data, { withCredentials: true })
        .then(response => {
            Cookies.set("AccessToken", response.data);
            SetUserState(response.data);
        })
    } 

    const LoginSubmit = (data: LoginDTO) => {
        return axios.post(appConfig.apiUrl + "auth/login", data, { withCredentials: true })
        .then(response => {
            Cookies.set("AccessToken", response.data);
            SetUserState(response.data)
        })
    } 

    const Refresh = () => {
        return axios.post(appConfig.apiUrl + "auth/refresh", {}, { withCredentials: true })
        .then(response => {
            Cookies.set("AccessToken", response.data);
            SetUserState(response.data)
        })
    }

    return { RegistrationSubmit, LoginSubmit, Refresh, IsAuth };
})

