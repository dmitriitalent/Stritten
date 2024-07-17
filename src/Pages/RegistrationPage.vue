<template>
	<div class="login work-space">
		<div class="login__field">
			<div class="field__description">Login:</div>
			<UIInput v-model="RegistrationData.Login" class="field__input"></UIInput>
		</div>
		<div class="login__field">
			<div class="field__description">Password:</div>
			<UIInput v-model="RegistrationData.Password" class="field__input"></UIInput>
		</div>
		<div class="login__field">
			<div class="field__description">Confirm:</div>
			<UIInput v-model="RegistrationData.PasswordConfirmed" class="field__input"></UIInput>
		</div>
		<UIHr class="login__hr"></UIHr>
		<div class="login__field">
			<div class="field__description">Name:</div>
			<UIInput v-model="RegistrationData.Name" class="field__input"></UIInput>
		</div>
		<div class="login__field">
			<div class="field__description">Surname:</div>
			<UIInput v-model="RegistrationData.Surname" class="field__input"></UIInput>
		</div>
		<UIHr class="login__hr">no required</UIHr>
		<div class="login__field">
			<div class="field__description">Email:</div>
			<UIInput v-model="RegistrationData.Email" class="field__input"></UIInput>
		</div>
		<UIButton @click="Submit(RegistrationData)">Sign up</UIButton>
		<router-link to="/login"><div class="login__link">do you have a profile yet?</div></router-link>
	</div>
</template>


<script lang="ts" setup>
import { RegistrationDTO } from '../Dtos/Registration.dto';
import { useAuthStore } from '../Stores/AuthStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const { RegistrationSubmit } = useAuthStore();

const RegistrationData = ref<RegistrationDTO>({
        Login: "",
	    Password: "",
	    PasswordConfirmed: "",
	    Name: "",
	    Surname: "",
	    Email: ""
});

const Submit = (data: RegistrationDTO) => {
	RegistrationSubmit(data).then(() => {
		router.push("/profile");
	})
}
</script>


<style lang="scss" scoped>
@import "@/global.scss";

.login {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -70%);
	width: 400px;
	height: fit-content;
	box-shadow: $box-shadow;
	border-radius: $border-radius;
	padding: 10px;
	box-sizing: border-box;
}

.login__field {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}
.field__description {
	vertical-align: bottom;
	line-height: 32px;
	margin-right: 10px
}
.login__hr {
	margin-bottom: 20px;	
}
.login__link {
	margin: auto;
	width: fit-content;
	margin-top: 20px;
	font-size: $font-size-smaller;
}



</style>