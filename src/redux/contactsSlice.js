import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContacts, deleteContacts } from "./operations";

export const initstate = {
    contacts: {
        items: [],
        isLoading: false,
        error: null,
    },
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState: initstate,

    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, (state) => { state.contacts.isLoading = true })
            .addCase(fetchContacts.fulfilled, (state, action) => { state.contacts.isLoading = false; state.contacts.items = action.payload })
            .addCase(fetchContacts.rejected, (state, action) => { state.contacts.isLoading = false; state.contacts.error = action.payload })
            .addCase(addContacts.pending, (state) => { state.contacts.isLoading = true })
            .addCase(addContacts.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                state.contacts.items.push(action.payload)
            })
            .addCase(addContacts.rejected, (state, action) => { state.contacts.isLoading = false; state.contacts.error = action.payload })
            .addCase(deleteContacts.pending, (state) => { state.contacts.isLoading = true })
            .addCase(deleteContacts.fulfilled, (state, action) => {
                state.contacts.isLoading = false;
                const index = state.contacts.items.findIndex(contact => contact.id === action.payload.id)
                state.contacts.items.splice(index, 1);
                console.log(state.contacts.items);
            })
            .addCase(deleteContacts.rejected, (state, action) => { state.contacts.isLoading = false; state.contacts.error = action.payload })
    }
})


export const contactsReducer = contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;

