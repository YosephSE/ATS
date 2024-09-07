import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slices/ModalSlice";
import UserReducer from "./slices/UserSlice";
import AdminReducer from "./slices/AdminSlice";
import JobReducer from "./slices/JobSlice";
import ApplicationReducer from "./slices/ApplicationSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            modal: ModalReducer,
            user: UserReducer,
            admin: AdminReducer,
            jobs: JobReducer,
            applications: ApplicationReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']