import { useAppDispatch } from "@/redux/Hooks";
import { login as loginCandidate } from "@/redux/slices/UserSlice";
import { login as loginAdmin } from "@/redux/slices/AdminSlice";
import { LoginUserPayload } from "../../types/users.types";

type TState = "candidate" | "admin"
function useLoginHandler(state: TState) {
  const dispatch = useAppDispatch();

  return (user: LoginUserPayload) => {
    if (state === "candidate") {
      dispatch(loginCandidate(user));
    } else {
      dispatch(loginAdmin(user));
    }
  };
}

export default useLoginHandler;
