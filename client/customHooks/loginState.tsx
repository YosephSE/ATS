import { useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/store";
import { UserSlice } from "../../types/users.types";

interface returnValue{
    state: UserSlice
    redirect: string
}
function useLoginState(status: boolean): returnValue{
    const candidateState = useAppSelector((state: RootState) => state.user)
    const adminState = useAppSelector((state: RootState) => state.admin)
    if (status){
        return { state: candidateState, redirect: '/jobs'}
    }else{
        return {state: adminState, redirect: '/alljobs'}
    }
}