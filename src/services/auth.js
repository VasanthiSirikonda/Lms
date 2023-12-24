import axios from "../axiosConfig";

export const verifyAuth = async(credentials)=>{
    return await axios.post('auth/login',credentials)
}

export const registerUser = async(userData) =>{
    return await axios.post('auth/register',userData)
}

export const userForgotPasswordMail = async(userData) =>{
    return await axios.post('auth/forgotPassword',userData)
}

export const resetPassword = async(userData) =>{
    return await axios.post('auth/resetPassword',userData)
}