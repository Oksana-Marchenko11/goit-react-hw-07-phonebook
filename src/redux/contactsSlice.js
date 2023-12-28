import { createSlice, nanoid } from "@reduxjs/toolkit";
import { contactsInitialState } from '../data/contacts.js'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
    name: "contacts",
    initialState: contactsInitialState,
    reducers: {
        addContact: {
            reducer(state, action) {
                const nameInContacts = state.contacts.some(
                    ({ name }) => name.toLowerCase() === action.payload.name.toLowerCase()
                );
                if (nameInContacts) {
                    alert(`${action.payload.name} is already in contacts`);
                    return;
                }

                const numberInContacts = state.contacts.some(
                    ({ number }) => number === action.payload.number
                );
                if (numberInContacts) {
                    alert(`${action.payload.number} is already in contacts`);
                    return;
                }

                state.contacts.push(action.payload);
            },
            prepare(name, number) {
                return {
                    payload: {
                        number,
                        name,
                        id: nanoid(),
                    }
                }
            }
        },
        deleteContact(state, action) {
            const index = state.contacts.findIndex(contact => contact.id === action.payload);
            state.contacts.splice(index, 1)
        }
    }
})

const persistConfig = {
    key: 'contacts',
    storage,
}

export const contactsReducer = contactsSlice.reducer;
export const persistedContactsReducer = persistReducer(persistConfig, contactsReducer)

export const { addContact, deleteContact } = contactsSlice.actions;
