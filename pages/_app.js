import "@/styles/globals.css";
import Navbar from "./navbar";
import { getAuth, updateCurrentUser } from "firebase/auth";
import { app } from "../firebase";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const auth = getAuth(app);
  const loggedin = auth.currentUser ? true : false;
  console.log("beufieb");
  console.log(auth.currentUser);
  return (
    <>
      <Navbar logged={loggedin}></Navbar>
      <Component {...pageProps} />
    </>
  );
}
