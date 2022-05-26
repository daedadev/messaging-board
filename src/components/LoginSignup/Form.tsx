import React, { useState, useRef } from "react";
import { googlePopup } from "../../config/firebase";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Form() {
  const [login, setLogin] = useState<boolean>(false);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();

  const [username, setUsername] = useState<string>();

  function loginWithGoogle() {
    googlePopup().then(() => {
      console.log("pog");
    });
  }

  return (
    <div className="flex flex-col bg-slate-500 md:w-[600px] min-h-[400px] w-full h-fit justify-between pt-5 pr-5 pl-5 rounded-lg">
      <section className="flex flex-col items-center justify-evenly">
        {login ? (
          <LoginForm
            setEmail={setEmail}
            setPassword={setPassword}
            loginWithGoogle={loginWithGoogle}
          />
        ) : (
          <SignupForm
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordConfirm={setPasswordConfirm}
            setUsername={setUsername}
            loginWithGoogle={loginWithGoogle}
          />
        )}
      </section>
      <section className="flex flex-row items-center justify-evenly mt-10">
        <button
          className={
            login
              ? "flex w-full items-center justify-evenly text-slate-300 bg-slate-900 p-2 border-0 rounded-tl-md"
              : "flex w-full items-center justify-evenly text-slate-300 bg-slate-600 p-2 border-0 rounded-tl-md"
          }
          onClick={() => setLogin(true)}
        >
          Login
        </button>
        <button
          className={
            login
              ? "flex w-full items-center justify-evenly text-slate-300 bg-slate-600 p-2 border-0 rounded-tr-md"
              : "flex w-full items-center justify-evenly text-slate-300 bg-slate-900 p-2 border-0 rounded-tr-md"
          }
          onClick={() => setLogin(false)}
        >
          Signup
        </button>
      </section>
    </div>
  );
}
