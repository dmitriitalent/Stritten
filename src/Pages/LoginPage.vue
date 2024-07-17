<template>
	<div class="login work-space">
		<div class="login__field">
			<div class="field__description">Login:</div>
			<UIInput v-model="LoginData.Login" class="field__input"></UIInput>
		</div>
		<div class="login__field">
			<div class="field__description">Password:</div>
			<UIInput v-model="LoginData.Password" class="field__input"></UIInput>
		</div>
		<UIButton @click="Submit(LoginData)">Log in</UIButton>
		<router-link to="/registration"><div class="login__link">don't have a profile?</div></router-link>

	</div>
</template>


<script lang="ts" setup>
import { LoginDTO } from '../Dtos/Login.dto';
import { useAuthStore } from '../Stores/AuthStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const { LoginSubmit } = useAuthStore();

const LoginData = ref<LoginDTO>({
        Login: "",
	    Password: ""
});

const Submit = (data: LoginDTO) => {
	LoginSubmit(data).then(() => {
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
	transform: translate(-50%, -100%);
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
.login__link {
	margin: auto;
	width: fit-content;
	margin-top: 20px;
	font-size: $font-size-smaller;
}



</style>