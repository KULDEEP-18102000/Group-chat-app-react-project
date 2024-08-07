import { createSlice } from "@reduxjs/toolkit";

const initialAuthStore={
    isAuthenticated:!!localStorage.getItem('token'),
    token:null,
    email:localStorage.getItem('email')?.split('@')[0],
    loggedInUsers:[],
    adminGroups:[],
    restUsers:[],
    presentUsers:[],
    baseURL:"http://localhost:3000"
}

const authSlice=createSlice({
    name:'Authentication',
    initialState:initialAuthStore,
    reducers:{
        login(state,action){
            // console.log(state)
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('email',action.payload.email)
            state.email=action.payload.email.split('@')[0]
            // console.log(state.email)
        setTimeout(()=>{
            console.log("settomeoutcalled")
            localStorage.clear('token')
        },300000)
        state.token=action.payload.token
        state.isAuthenticated=true
        state.userId=action.payload.userId
        console.log(state)
        },
        logOut(state){
            localStorage.clear('token')
            localStorage.clear('email')
            state.token=null
            state.isAuthenticated=false
            state.email=null
        },
        updateLoggedInUsers(state,action){
            // console.log(action)
            state.loggedInUsers=action.payload
        },
        updateAdminGroups(state,action){
            console.log(action)
            state.adminGroups=action.payload
            // console.log(state)
        },
        updateRestUsers(state,action){
            // console.log(action)
            state.restUsers=action.payload
        },
        updatePresentUsers(state,action){
            // console.log(action)
            state.presentUsers=action.payload
        }
    }
})

export const authReducer=authSlice.reducer
export const authActions=authSlice.actions