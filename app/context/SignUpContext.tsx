// context/GlobalStateContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// SUBSCRIPTIONS INTERFACES
interface IDES {
  id: number;
  value: string;
}
interface ISubscription {
  subscriptionId: number;
  subscriptionType: string;
  name: string;
  price: number;
  shopCount: number;
  des: IDES[];
  paymentLInk: string;
}

interface SignUp {
  subscriptionDetails: ISubscription | undefined;
  setSubscriptionDetails: Dispatch<SetStateAction<ISubscription | undefined>>;
}

const SignUpContext = createContext<SignUp | undefined>(undefined);

const SignUpContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subscriptionDetails, setSubscriptionDetails] =
    useState<ISubscription>();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setSubscriptionDetails(JSON.parse(storedData));
    }
  }, []);

  const value: SignUp = {
    subscriptionDetails,
    setSubscriptionDetails,
  };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};

const useSignUpContext = (): SignUp => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { SignUpContextProvider, useSignUpContext };
