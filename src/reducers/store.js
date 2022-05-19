import { configureStore, createSlice } from "@reduxjs/toolkit";

// persist
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// create cards state
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

// persist
const reducers = combineReducers({
    cards: cards.reducer
});
const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

// export default configureStore({
//     reducer: {
//         cards: cards.reducer
//     }
// });