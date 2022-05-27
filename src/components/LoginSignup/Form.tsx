import React, { useState, useRef, useContext } from "react";
import { db, auth, googlePopup } from "../../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "../../context/AuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type Error = {
  title: string;
  message: string;
};

export default function Form() {
  const [loginBool, setLoginBool] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();

  const [username, setUsername] = useState<string>();

  const currentUser = useAuth;

  const [errorMessage, setErrorMessage] = useState<Error>();

  function loginWithGoogle() {
    googlePopup().then(() => {
      console.log("pog");
    });
  }

  function loginWithUsername() {
    const user = {
      username: username,
      password: password,
    };
    console.log(user);
  }

  function signupWithEmail(email: string, password: string, userName: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        return updateProfile(result.user, {
          displayName: userName,
        }).then(() => {
          updateProfile(result.user, {
            photoURL:
              "https://cdn.clipartsfree.net/vector/medium/70605-profile-images.png",
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="flex flex-col bg-slate-500 md:w-[600px] min-h-[400px] w-full h-fit justify-between pt-5 pr-5 pl-5 rounded-lg">
      <section className="flex flex-col items-center justify-evenly">
        {loginBool ? (
          <LoginForm
            setPassword={setPassword}
            setUsername={setUsername}
            loginWithGoogle={loginWithGoogle}
            submitLogin={loginWithUsername}
          />
        ) : (
          <SignupForm
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
            setUsername={setUsername}
            loginWithGoogle={loginWithGoogle}
            submitSignup={signupWithEmail}
          />
        )}
      </section>
      <section className="flex flex-row items-center justify-evenly mt-10">
        <button
          className={
            loginBool
              ? "flex w-full items-center justify-evenly text-slate-300 bg-slate-900 p-2 border-0 rounded-tl-md"
              : "flex w-full items-center justify-evenly text-slate-300 bg-slate-600 p-2 border-0 rounded-tl-md"
          }
          onClick={() => setLoginBool(true)}
        >
          Login
        </button>
        <button
          className={
            loginBool
              ? "flex w-full items-center justify-evenly text-slate-300 bg-slate-600 p-2 border-0 rounded-tr-md"
              : "flex w-full items-center justify-evenly text-slate-300 bg-slate-900 p-2 border-0 rounded-tr-md"
          }
          onClick={() => setLoginBool(false)}
        >
          Signup
        </button>
      </section>
    </div>
  );
}
