import React, { useRef, useState, Dispatch, SetStateAction } from "react";

type Props = {
  loginWithGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  submitLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
};

export default function LoginForm({
  setUsername,
  setPassword,
  loginWithGoogle,
  submitLogin,
}: Props) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function inputUsername() {
    setUsername(usernameRef.current?.value);
  }

  function inputPassword() {
    setPassword(passwordRef.current?.value);
  }

  return (
    <section className="flex flex-col w-[90%] items-center">
      <div className="w-full text-4xl text-center text-slate-300 font-bold mb-10">
        Log In
      </div>
      <label className="w-full text-left text-slate-300 font-semibold">
        Username
      </label>
      <input
        type="text"
        className="w-full p-1 mb-10 rounded-md border-2"
        ref={usernameRef}
        onChange={inputUsername}
      ></input>
      <label className="w-full text-left text-slate-300 font-semibold">
        Password
      </label>
      <input
        type="password"
        className="w-full p-1 mb-16 rounded-md border-2"
        ref={passwordRef}
        onChange={inputPassword}
      ></input>
      <div className="flex md:flex-row flex-col w-full justify-evenly">
        <button
          type="submit"
          className="flex md:w-[45%] w-full items-center justify-evenly text-slate-300 bg-slate-800 p-2 border-0 rounded-md mb-5"
          onClick={submitLogin}
        >
          Log In
        </button>
        <button
          className="flex md:w-[45%] w-full items-center justify-evenly text-slate-300 bg-slate-800 p-2 border-0 rounded-md mb-5"
          onClick={loginWithGoogle}
          type="button"
        >
          <img
            className="w-5"
            alt="google logo"
            src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
          />
          Sign In With Google
        </button>
      </div>
    </section>
  );
}
