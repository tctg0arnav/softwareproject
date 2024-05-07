import React from "react";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

import { app } from "../firebase";
import { handlesignout } from "../signout";
import { useRouter } from "next/router";

const Navbar = ({ logged }) => {
  const router = useRouter();
  const signingout = async () => {
    await handlesignout();
    setlogged_in(false);

    router.push("/");
  };
  const auth = getAuth(app);
  console.log("HELLO");
  console.log(auth.currentUser);
  const [logged_in, setlogged_in] = useState(logged ? true : false);

  useEffect(() => {
    if (auth.currentUser) {
      setlogged_in(true);
    }
  }, [auth.currentUser]);

  return (
    <div className="shadow-sm h-20 text-red-200 bg-orange-200 flex justify-between items-center">
      <Link href="/">
        <div className="ml-5">
          <img src="/logo.png" width={150} alt="logo" />
        </div>
      </Link>
      <div className="flex gap-10 ">
        <Link href="/">
          <div className="font-semibold text-xl text-red-400 hover:text-red-800">
            Home
          </div>
        </Link>
        <Link href="/contest">
          <div className="font-semibold text-xl text-red-400 hover:text-red-800 ">
            Contests
          </div>
        </Link>
        <Link href={"/about"}>
          <div className="font-semibold text-xl text-red-400 hover:text-red-800">
            About
          </div>
        </Link>
        {logged_in ? (
          <Link href={`/progress/${auth.currentUser.uid}`}>
            <div className="font-semibold text-xl text-red-400 hover:text-red-800">
              Progress
            </div>
          </Link>
        ) : (
          <></>
        )}
      </div>

      <div className="flex gap-15 p-10 mt-2">
        {!logged_in ? (
          <>
            <Link href="/login">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </button>
            </Link>
            <Link href="/signup">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  SignUp
                </span>
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={signingout}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Out
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
