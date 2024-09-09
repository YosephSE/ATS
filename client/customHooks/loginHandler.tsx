import { useAppDispatch } from "@/redux/Hooks";
import { login as loginCandidate } from "@/redux/slices/UserSlice";
import { changepassword, login as loginAdmin } from "@/redux/slices/AdminSlice";
import { LoginUserPayload, passwordPayload } from "../../types/users.types";

type TState = "candidate" | "admin";

interface Data {
  email?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
}

function useLoginHandler(state: TState) {
  const dispatch = useAppDispatch();

  return ({ email, password, oldPassword, newPassword }: Data, firstTime: any) => {
    if (state === "candidate" && email && password) {
      dispatch(loginCandidate({ email, password }));
    } else {
      if (firstTime && oldPassword && newPassword) {
        dispatch(changepassword({ oldPassword, newPassword }))
      } else{
        if ( email && password){
          dispatch(loginAdmin({ email, password }));
        }
      }
    }
  };
}

export default useLoginHandler;
