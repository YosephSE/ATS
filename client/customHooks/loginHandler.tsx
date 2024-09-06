import { useAppDispatch } from "@/redux/Hooks";
import { login as loginCandidate } from "@/redux/slices/UserSlice";
import { login as loginAdmin } from "@/redux/slices/AdminSlice";
import { LoginUserPayload } from "../../types/users.types";

function useLoginHandler(status: boolean, user: LoginUserPayload) {
    const dispatch = useAppDispatch()
    if(status){
        dispatch(loginCandidate(user))
    } else{
        dispatch(loginAdmin(user))
    }
}

export default useLoginHandler;