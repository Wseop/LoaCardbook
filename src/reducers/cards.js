import { configureStore, createSlice } from "@reduxjs/toolkit";
import cardData from "../assets/card.json";

let cards = createSlice({
    name: "cards",
    initialState: cardData,
    reducers: {
        changeCount(state, action) {
            state.find(element => element.name === action.payload.name).count = action.payload.count;
        }
    }
});

export let { changeCount } = cards.actions;

export default configureStore({
    reducer: {
        cards: cards.reducer
    }
});