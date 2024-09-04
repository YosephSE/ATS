import { createSlice } from "@reduxjs/toolkit"

interface ModalState{
    value: "closed" | "signin" | "signup"
}

const initialState: ModalState = {
    value: "closed"
}

const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setLogin: (state) => {
            state = {
                value: "signin"
            }

            return state
        },
        setRegister: (state) =>{
            state = {
                value: "signup"
            }

            return state
        },
        setClosed: (state) => {
            state = {
                value: "closed"
            }
        }


    }
})

export const { setClosed, setRegister, setLogin} = ModalSlice.actions

export default ModalSlice.reducer;