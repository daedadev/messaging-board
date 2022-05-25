import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password, userName) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return result.user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            result.user.updateProfile({
              photoURL:
                "https://cdn.clipartsfree.net/vector/medium/70605-profile-images.png",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
