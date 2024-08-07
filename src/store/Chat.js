import { createSlice } from "@reduxjs/toolkit";

const initialChatStore={
    groupId:null
}

const chatSlice=createSlice({
    name:'Chat',
    initialState:initialChatStore,
    reducers:{
        setGroup(state,action){
            state.groupId=action.payload
        }
    }
})

export const chatReducer=chatSlice.reducer
export const chatActions=chatSlice.actions