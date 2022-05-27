import React, { useRef, Dispatch, SetStateAction } from "react";

type Props = {
  loginWithGoogle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  submitSignup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setPassword: Dispatch<SetStateAction<string | undefined>>;
  setPasswordConfirm: Dispatch<SetStateAction<string | undefined>>;
  setUsername: Dispatch<SetStateAction<string | undefined>>;
};

export default function SignupForm(props: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  function createEmail() {
    props.setEmail(emailRef.current?.value);
  }

  function createPassword() {
    props.setPassword(passwordRef.current?.value);
    props.setPasswordConfirm(passwordConfirmRef.current?.value);
  }

  function createUsername() {
    props.setUsername(usernameRef.current?.value);
  }

  return (
    <section className="flex flex-col w-[90%] items-center">
      <div className="w-full text-4xl text-center text-slate-300 font-bold mb-5">
        Sign Up
      </div>
      <label className="w-full text-left text-slate-300 font-semibold">
        Email
      </label>
      <input
        type="text"
        className="flex w-full p-1 mb-5 rounded-md border-2 items-center justify-center"
        ref={emailRef}
        onChange={createEmail}
      ></input>
      <label className="w-full text-left text-slate-300 font-semibold">
        Password
      </label>
      <input
        type="password"
        className="w-full p-1 mb-5 rounded-md border-2"
        ref={passwordRef}
        onChange={createPassword}
      ></input>
      <label className="w-full text-left text-slate-300 font-semibold">
        Confirm Password
      </label>
      <input
        type="password"
        className="w-full p-1 mb-5 rounded-md border-2"
        ref={passwordConfirmRef}
        onChange={createPassword}
      ></input>
      <label className="w-full text-left text-slate-300 font-semibold">
        Username
      </label>
      <input
        type="text"
        className="w-full p-1 mb-7 rounded-md border-2"
        ref={usernameRef}
        onChange={createUsername}
      ></input>
      <div className="flex md:flex-row flex-col w-full justify-evenly">
        <button
          type="submit"
          className="flex md:w-[45%] w-full items-center justify-evenly text-slate-300 bg-slate-800 p-2 border-0 rounded-md mb-5"
          onClick={props.submitSignup}
        >
          Sign Up
        </button>
        <button
          className="flex md:w-[45%] w-full items-center justify-evenly text-slate-300 bg-slate-800 p-2 border-0 rounded-md mb-5"
          onClick={props.loginWithGoogle}
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
