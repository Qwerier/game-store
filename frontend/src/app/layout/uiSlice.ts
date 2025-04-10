import { createSlice } from "@reduxjs/toolkit";

export const getDarkMode = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return !storedDarkMode ? true : JSON.parse(storedDarkMode);
}

// stateful component of app's UI
export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        isDarkMode: getDarkMode()
    },
    reducers: {
        startLoading: (state) =>{
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        },
        toggleDarkMode: (state) => {
            localStorage.setItem('darkMode', JSON.stringify(!state.isDarkMode))
            state.isDarkMode = !state.isDarkMode
        }
    }
});


export const {startLoading, stopLoading, toggleDarkMode} = uiSlice.actions;