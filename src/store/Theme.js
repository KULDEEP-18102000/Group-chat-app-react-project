import { createSlice } from "@reduxjs/toolkit";

const initialThemeStore={
    isDarkTheme:false,
    isThemeActivated:false
}

const ThemeSlice=createSlice({
    name:'Theme',
    initialState:initialThemeStore,
    reducers:{
        setDarkTheme(state){
            state.isDarkTheme=true
        },
        setLightTheme(state){
            state.isDarkTheme=false
        },
        setThemeActivated(state){
            state.isThemeActivated=true
        },
        setThemeDeactivated(state){
            state.isThemeActivated=false
        }
    }
})

export const ThemeReducer=ThemeSlice.reducer
export const ThemeActions=ThemeSlice.actions