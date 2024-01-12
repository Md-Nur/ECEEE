"use client";

import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useState,
  SetStateAction,
  useEffect,
} from "react";
interface UserContextProps {
  userAuth: any;
  setUserAuth: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<UserContextProps>({
  userAuth: {},
  setUserAuth: () => {},
});

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [userAuth, setUserAuth] = useState<any>(null);
  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((jData) => {
        if (jData.statusCode < 400) setUserAuth(jData.data);
      });
  }, []);
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserAuth = () => {
  const data = useContext(UserContext);
  if (data === undefined) {
    throw new Error("useUserAuth must be used within an AuthProvider");
  }
  return data;
};
