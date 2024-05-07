import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
import Link from "next/link";

let auth = getAuth(app);

const Login = () => {
  const [logged_in, setlogged_in] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (logged_in) {
      router.push("/");
    }
  }, [logged_in]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(auth.currentUser));

      setlogged_in(true);
    } catch (error) {
      const err1 = String(error);
      const err = err1.substring(37, err1.length - 2);
      alert("Error: " + err);
    }
  };

  return (
    <div className=" flex flex-col  justify-start">
      <section className="bg-gray-50 h-screen ">
        <div className="flex flex-col items-center justify-center px-6  mx-auto mt-16 lg:py-0">
          <Link
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
          >
            <img className="w-64 h-32 mr-2" src="/logo.png" alt="logo" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </div>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlF
                    or="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-end justify-between">
                  <Link
                    href={"/forget_password"}
                    className="text-sm items-end font-medium text-primary-600 hover:underline "
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="inline-block bg-red-300 rounded-full   px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100  focus:ring-0 active:border-primary-accent-200 "
                    data-te-ripple-init
                    onClick={handleSignIn}
                  >
                    Login
                  </button>
                </div>

                <div className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
