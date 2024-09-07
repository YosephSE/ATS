import { useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { UserSlice } from "../../types/users.types";
import { useEffect, useState } from "react";

interface ReturnValue {
    currentState: UserSlice;
    redirect: string;
}

function useLoginState(status: boolean): ReturnValue {
    const candidateState = useAppSelector((state: RootState) => state.user);
    const adminState = useAppSelector((state: RootState) => state.admin);
    const [currentStatus, setCurrentStatus] = useState<ReturnValue>({
        currentState: candidateState,
        redirect: status ? '/jobs' : '/alljobs'
    });

    useEffect(() => {
        setCurrentStatus({
            currentState: status ? candidateState : adminState,
            redirect: status ? '/jobs' : '/alljobs'
        });
    }, [candidateState, adminState]);

    return currentStatus;
}

export default useLoginState;
