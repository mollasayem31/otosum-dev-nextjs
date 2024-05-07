"use client";

// context/GlobalStateContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import PosPinInputCom from "./PosPinInputCom";

// USER INTERFACES
interface IUser {
  businessName: string;
  name: string;
  email: string;
  category: string;
  role: string;
}

interface IAuthValues {
  userData: IUser | undefined;
  businessName: string | undefined;
}

const PosAuthContext = createContext<IAuthValues | undefined>(undefined);

const PosAuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  const [userData, setUserData] = useState<IUser | undefined>();
  const [businessName, setBusinessName] = useState<string | undefined>();
  const [posAccess, setPosAccess] = useState<string | null>("");
  const [load, setLoad] = useState<boolean | null>(false);

  useEffect(() => {
    const userLocalData = localStorage.getItem("user");
    const businessNameLocalData = localStorage.getItem("businessName");
    const posAccessLocal = localStorage.getItem("posAccess");
    if (userLocalData && businessNameLocalData) {
      setUserData(JSON.parse(userLocalData));
      setBusinessName(businessNameLocalData);
      setPosAccess(posAccessLocal);
    } else {
      router.push("/auth/sign-in");
    }
  }, [router, load]);

  const value: IAuthValues = {
    userData,
    businessName,
  };

  return (
    <PosAuthContext.Provider value={value}>
      {posAccess === "access granted" ? (
        children
      ) : (
        <PosPinInputCom setLoad={setLoad} />
      )}
    </PosAuthContext.Provider>
  );
};

const usePosAuthContext = (): IAuthValues => {
  const context = useContext(PosAuthContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { PosAuthContextProvider, usePosAuthContext };
