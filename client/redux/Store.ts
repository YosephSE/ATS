import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            modal: ModalReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']