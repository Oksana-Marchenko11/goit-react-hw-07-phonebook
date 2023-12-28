import { createSlice } from "@reduxjs/toolkit";
import { filterInitialState } from '../data/filter'



const filterSlice = createSlice({
    name: "filter",
    initialState: filterInitialState,
    reducers: {
        setFilter(state, action) {
            // state.contacts.filter(contact => contact.name.toLowerCase().includes(action.payload.toLowerCase()))
            state.filter = action.payload;
        }
    }
})

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;  