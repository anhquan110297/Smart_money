<script setup>
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import validator from "@/utils/validator";
import axios from "axios";
import {getTokenFromCookies} from "@/utils/getTokenFromCookies";

const router = useRouter();
let user = reactive({
    email: '',
    password: '',
});
let error = reactive({
    email: {
        message: '',
        status: false,
    },
    password: {
        message: '',
        status: false,
    },
});
let errorMessageFromResponse = ref('');
const onSubmit = () => {
    error.email = validator.emailValidate(user.email);
    error.password = validator.passwordValidate(user.password);
    let result = Object.values(error).map(e => e.status);
    if (!result.includes(true)) {
        axios.post('http://localhost:3000/login', {
            email: user.email,
            password: user.password
        })
            .then(response => {
                if (response.status === 200) {
                    const now = new Date();
                    document.cookie = `Token=${response.data.token}`;

                }
            })
            .catch(error => {
                console.log(error.response.data);
                return errorMessageFromResponse.value = error.response.data;
            })
        router.push('/dashboard');
    }
}
</script>

<template>
    <section class="flex h-screen ">
        <div class="wrapper m-auto">
            <img src="../assets/images/logo.png" alt="logo image" class="logo">
            <form class="form" @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="email" class="block input-label">Email Address</label>
                    <input type="email" placeholder="domain@example.com" id="email" class="input"
                           v-model="user.email"
                           :class="{error : error.email.status}"
                    >
                    <p v-if="error.email.status" class="error-message">{{ error.email.message }}</p>
                </div>
                <div class="form-group">
                    <label for="password" class="block input-label">Password</label>
                    <input type="password" placeholder="Password" id="password" class="input"
                           v-model="user.password"
                           :class="{error : error.password.status}"
                    >
                    <p v-if="error.password.status" class="error-message">{{ error.password.message }}</p>
                </div>
                <button type="submit" class="submit-btn">Login</button>
            </form>
            <p class="text-center mt-3 mb-3">
                Or
            </p>
            <button class="oauth2-btn">
                <img src="../assets/images/google.png" class="oauth2-brand-logo" alt="google">
                Continue with Google
            </button>
            <router-link
                    :to="{name : 'register'}"
                    class="router-link-text login-footer mt-4"
            >
                Create an account
            </router-link>
        </div>
    </section>
</template>

<style scoped>
.wrapper {
    width: 400px;
}

.login-footer {
    display: flex;
    justify-content: center;
}

.logo {
    border-radius: 50%;
    margin-left: 38%;
    width: 100px;
    height: 100px;

}

.form {
    margin-top: 24px;
}

.form-group ~ .form-group {
    margin-top: 8px;
}

.input-label {
    font-size: 16px;
    font-weight: 600;
}

.input {
    min-width: 100%;
    border-radius: 6px;
    padding: 8px;
    border: solid #9f9f9f 0.5px;
    margin-top: 8px;
    outline: none;
}

.input.error {
    border: solid red 0.5px;
}

.term-service-text > a {
    color: var(--primary-color);
    text-decoration: none;
}

.submit-btn {
    color: white;
    text-align: center;
    background-color: #299d91;
    min-width: 100%;
    border-radius: 6px;
    margin-top: 12px;
    padding: 8px 0;
}

.oauth2-brand-logo {
    width: 24px;
    height: 24px;
    display: inline;
}

.oauth2-btn {
    background-color: #f3f3f3;
    color: #191919;
    text-align: center;
    padding: 8px;
    border-radius: 6px;
    min-width: 100%;
}

.error-message {
    color: red;
    font-size: 14px;
}

</style>