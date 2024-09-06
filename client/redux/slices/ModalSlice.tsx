import { createSlice } from "@reduxjs/toolkit"

interface ModalState{
    value: "closed" | "signin" | "signup" | "contact"
    user: "admin" | "candidate"
}

const initialState: ModalState = {
    value: "closed",
    user: "candidate"
}

const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setLoginAdmin: (state) => {
            state.value = "signin"
            state.user = "admin"
        },
        setLoginCandidate: (state) => {
            state.value = "signin"
            state.user = "candidate"
        },
        setRegister: (state) =>{
            state.value = "signup"
        },
        setContact: (state) => {
            state.value = "contact"
        }, 

        setClosed: (state) => {
            state.value = "closed"
        }


    }
})

export const { setClosed, setRegister, setLoginAdmin, setLoginCandidate, setContact} = ModalSlice.actions

export default ModalSlice.reducer;