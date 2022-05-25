import { configureStore, createSlice } from "@reduxjs/toolkit";

// persist
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, createMigrate } from "redux-persist";
import thunk from "redux-thunk";

import cardData from "../assets/card.json";

const migrations = {
    0: (state) => {
        let newCards = [...state.cards];
        cardData.map((v, i) => {
            newCards[i].acquisition = [...v.acquisition];
        });
        state.cards = [...newCards];

        return {
            ...state,
            cards: [
                ...state.cards
            ]
        };
    }
};

// create cards state
let cards = createSlice({
    name: "cards",
    initialState: cardData,
    reducers: {
        changeAwaken(state, action) {
            state.find(element => element.name === action.payload.name).awaken = action.payload.awaken;
        },
        changeReserve(state, action) {
            state.find(element => element.name === action.payload.name).reserve = action.payload.reserve;
        }
    }
});
export let { changeAwaken, changeReserve } = cards.actions;

// persist
const reducers = combineReducers({
    cards: cards.reducer
});
const persistConfig = {
    key: "root",
    version: 0,
    storage,
    migrate: createMigrate(migrations, { debug: false })
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