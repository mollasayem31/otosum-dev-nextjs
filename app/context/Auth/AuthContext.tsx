"use client";

// context/GlobalStateContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Children,
} from "react";
import { usePathname, useRouter } from "next/navigation";

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

const AuthContext = createContext<IAuthValues | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const [userData, setUserData] = useState<IUser | undefined>();
  const [businessName, setBusinessName] = useState<string | undefined>();

  useEffect(() => {
    const userLocalData = localStorage.getItem("user");
    const businessNameLocalData = localStorage.getItem("businessName");
    if (userLocalData && businessNameLocalData) {
      setUserData(JSON.parse(userLocalData));
      setBusinessName(businessNameLocalData);
    } else {
      router.push("/auth/sign-in");
    }
  }, [router]);

  if (pathName !== "/shop/pos") {
    () => localStorage.removeItem("posAccess");
  }

  const value: IAuthValues = {
    userData,
    businessName,
  };

  return (
    <AuthContext.Provider value={value}>
      {userData && businessName ? children : null}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): IAuthValues => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
