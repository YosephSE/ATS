import { createSlice } from "@reduxjs/toolkit"

interface ModalState{
    value: "closed" | "signin" | "signup" | "contact"
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
        setContact: (state) => {
            state = {
                value: "contact"
            }

            return state
        }, 

        setClosed: (state) => {
            state = {
                value: "closed"
            }

            return state
        }


    }
})

export const { setClosed, setRegister, setLogin, setContact} = ModalSlice.actions

export default ModalSlice.reducer;