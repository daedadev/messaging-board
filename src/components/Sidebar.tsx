import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [channels, setChannels] = useState<string[] | null>(null);

  const currentUser = useAuth();

  useEffect(() => {
    async function returnChannels() {
      if (currentUser) {
        const channelDataRef = doc(
          db,
          "channels",
          currentUser?.displayName as string
        );

        const channelDataSnap = await getDoc(channelDataRef);

        if (channelDataSnap) {
          console.log(channelDataSnap.data());
        }
      }
    }

    returnChannels();
  }, [currentUser]);

  return (
    <div className="flex flex-col w-60 bg-slate-700 justify-between">
      <section>
        <article>
          <h1 className="text-slate-200 font-semibold text-center">Side Bar</h1>
        </article>
        <article></article>
      </section>
      <section className="flex flex-col w-full bg-slate-400 h-28 items-center justify-around">
        <h1>Username: {currentUser?.displayName}</h1>
        <div className="flex flex-row w-full justify-evenly">
          <Link
            to="/login"
            className="bg-slate-800 rounded-md text-slate-200 p-3 w-[45%] text-center"
          >
            Login
          </Link>
          <button className="bg-slate-800 rounded-md text-slate-200 p-3 w-[45%] text-center">
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
