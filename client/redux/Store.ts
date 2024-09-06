import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";
import UserReducer from "./slices/UserSlice";
import AdminReducer from "./slices/AdminSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            modal: ModalReducer,
            user: UserReducer,
            admin: AdminReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']