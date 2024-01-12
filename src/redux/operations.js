import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65996befa20d3dc41cefb6be.mockapi.io";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/contacts");
            return response.data;
        }
        catch (e) { return thunkAPI.rejectWithValue(e.message) }
    }

);
export const addContacts = createAsyncThunk(
    "contacts/addContacts",
    async (contact, thunkAPI) => {
        try {
            const response = await axios.post("/contacts", contact);
            return response.data;
        }
        catch (e) { return thunkAPI.rejectWithValue(e.message) }
    }

)

export const deleteContacts = createAsyncThunk(
    "contacts/deleteContacts",
    async (taskId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${taskId}`);
            return response.data;
        }
        catch (e) { return thunkAPI.rejectWithValue(e.message) }
    }

)