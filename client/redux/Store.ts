import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";

export const store = configureStore({
    reducer: {
        modal: ModalReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;