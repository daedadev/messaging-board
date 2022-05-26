import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../config/firebase";

type Props = {
  children: JSX.Element;
};

type Value = {
  currentUser: User | null;
  signup: (email: string, password: string, userName: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => {};
};

const AuthContext = React.createContext<Value | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function signup(email: string, password: string, userName: string) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        return updateProfile(result.user, {
          displayName: userName,
          photoURL:
            "https://cdn.clipartsfree.net/vector/medium/70605-profile-images.png",
        }).catch((err: string) => {
          console.log(err);
        });
      }
    );
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signup: signup,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
