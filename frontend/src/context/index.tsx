import React, { useContext, useEffect, useMemo, useState } from "react";
import { cashKickProps, contextValueProps } from "../utils/constants";
import { getCashkicks } from "../services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = React.createContext<any>({});

export const useAppContext = () => {
  return useContext<contextValueProps>(AppContext);
};

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ ...props }: ContextProviderProps) => {
  const [userId, setUserId] = useState<number>(0);
  const [creditBalance, setCreditBalance] = useState<number>(880000.0);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (userId > 0) {
      getCashkicks(userId).then((res: cashKickProps[]) => {
        if (Array.isArray(res)) {
          const cashKicksPaymentAmount = res.reduce(
            (total, row) => total + row.totalFinanced,
            0
          );
          setCreditBalance(880000 - cashKicksPaymentAmount);
        }
      });
    }
  }, [userId]);

  const contextValue = useMemo(
    () => ({
      userId,
      setUserId,
      creditBalance,
      setCreditBalance,
      userName,
      setUserName,
    }),
    [userId, setUserId, creditBalance, setCreditBalance, userName, setUserName]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
