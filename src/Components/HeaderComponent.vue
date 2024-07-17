<template>
	<div>
		<header>
			<router-link to="/">
				<img class="header__logo" src="@/Assets/logo.png"/>
			</router-link>
			<UISearch class="header__search" placeholder="type invite-code"></UISearch>
			<nav class="header__nav">
				<router-link to="/events">
					<UIButton class="header__button">Events</UIButton>
				</router-link>
				<router-link to="/create">
					<UIButton class="header__button">Create</UIButton>
				</router-link>
				<router-link to="/login" v-if="!IsAuth">
					<UIButton class="header__button header__signin">Sign in</UIButton>
				</router-link>
				<router-link to="/profile" v-if="IsAuth">
					<UIButton class="header__button header__signin">Profile</UIButton>
				</router-link>
			</nav>
		</header>
	</div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../Stores/AuthStore';

const { IsAuth } = storeToRefs(useAuthStore());

</script>


<style lang="scss" scoped>
@import "@/global.scss";
header {
	width: 100%;
	height: 150px;
	box-shadow: $box-shadow;
	position: relative;
	box-sizing: border-box;
	padding: 43px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}
.header__logo {
	width: 64px;
	height: 64px;
	display: block;
}
.header__search {
	height: 32px;
	margin: auto;
}
@media (min-width: 1100px) {
	.header__search {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
.header__nav {
	height: 64px;
	display: flex;
	justify-content: end;
	box-sizing: border-box;
}
.header__button {
	margin-left: 10px;
	height: calc(100% - 20px);
	margin-top: 10px;
	width: 120px;
}
.header__signin {
	background-color: $color-attention;
	width: 100px;
	margin-left: 20px;
}


</style>