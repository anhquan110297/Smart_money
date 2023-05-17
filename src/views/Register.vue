<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import validator from "@/utils/validator";

let user = reactive({
    name: '',
    email: '',
    password: '',
});

let error = reactive({
    username: {
        message: '',
        status: false,
    },
    email: {
        message: '',
        status: false,
    },
    password: {
        message: '',
        status: false,
    },
    confirmPassword: {
        message: '',
        status: false
    }
});
let confirmPassword = ref('');
let errorMessageFromResponse = ref('');
const onSubmit = () => {
    error.username = validator.usernameValidate(user.name);
    error.email = validator.emailValidate(user.email);
    error.password = validator.passwordValidate(user.password);
    if (user.password !== confirmPassword.value) {
        error.confirmPassword = {
            message: "Confirm password does not match the original password",
            status: true
        }
    } else {
        error.confirmPassword = {
            message: "",
            status: false
        }
    }

    let result = Object.values(error).map(e => e.status);
    if (!result.includes(true)) {
        axios.post('http://localhost:3000/user/register', {
            name: user.name,
            email: user.email,
            password: user.password
        })
            .then(response => console.log(response.data))
            .catch(error => {
                console.log(error.response.data);
                return errorMessageFromResponse.value = error.response.data;
            })
    }
}
</script>

<template>
    <section class="flex h-screen ">
        <div class="wrapper m-auto">
            <img src="../assets/images/logo.png" alt="logo image" class="logo">
            <h1 class="title">Create an account</h1>
            <form class="form" @submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="username" class="block input-label">Name</label>
                    <input type="text" placeholder="Name" id="username" class="input"
                           v-model="user.name"
                           :class="{error : error.username.status}">
                    <p v-if="error.username.status" class="error-message">{{ error.username.message }}</p>
                </div>
                <div class="form-group">
                    <label for="email" class="block input-label">Email</label>
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
                <div class="form-group">
                    <label for="confirmPassword" class="block input-label">Confirm password</label>
                    <input type="password" placeholder="Password" id="confirmPassword" class="input"
                           v-model="confirmPassword"
                           :class="{error : error.confirmPassword.status}"
                    >
                    <p v-if="error.confirmPassword.status" class="error-message">{{ error.confirmPassword.message }}</p>
                </div>
                <div class="term-service-text">By continuing , you agree to out
                    <router-link :to="{path : '#'}"
                                 class="router-link-text">
                        term of service
                    </router-link>
                </div>
                <button type="submit" class="submit-btn">Sign up</button>
            </form>
            <p class="text-center mt-3 mb-3">
                Or
            </p>
            <button class="oauth2-btn">
                <img src="../assets/images/google.png" class="oauth2-brand-logo">
                Continue with Google
            </button>
            <div class="term-service-text">
                Already have an account ?
                <router-link
                    :to="{name : 'login'}"
                    class="router-link-text">
                    Sign in there
                </router-link>
            </div>
        </div>
    </section>
</template>

<style scoped>
.wrapper {
    width: 400px;
}

.title {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    margin: 8px 0;
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

.term-service-text {
    color: #9f9f9f;
    margin-top: 8px;
    text-align: center;
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