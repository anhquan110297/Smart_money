import {EMAIL_REGEX, PASSWORD_REGEX, USERNAME_REGEX} from "@/constants";

const usernameValidate = (input) => {
    if (!USERNAME_REGEX.test(input)) {
        return {
            message: "Username should be have 5-16 characters and don't have special character",
            status: true
        };
    } else {
        return {
            message: "",
            status: false
        }
    }
}
const emailValidate = (email) => {
    if (!EMAIL_REGEX.test(email)) {
        return {
            message: "Email is invalid",
            status: true
        }
    } else {
        return {
            message: "",
            status: false
        }
    }
}
const passwordValidate = (password) => {
    if (!PASSWORD_REGEX.test(password)) {
        return {
            message: "Password at least one special characters, uppercase characters, number",
            status: true
        }
    } else {
        return {
            message: "",
            status: false
        }
    }
}

export default {emailValidate, passwordValidate, usernameValidate}

