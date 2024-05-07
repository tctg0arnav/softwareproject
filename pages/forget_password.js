import React from "react";
import Link from "next/link";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
import { useRouter } from "next/router";

const Fp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const auth = getAuth(app);
  const handlereset = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(
          "Sent reset password link email on registered email address: " + email
        );
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/user-not-found).") {
          alert("User not found");
        }
        if (errorMessage === "Firebase: Error (auth/invalid-email).") {
          alert("Invalid Email");
        }

        // ..
      });
  };
  return (
    <>
      <div className=" flex flex-col  justify-start">
        <section className="bg-gray-50 h-screen ">
          <div className="flex flex-col items-center justify-center px-6  mx-auto mt-16 lg:py-0">
            <Link
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
            >
              <img className="w-64 h-32 mr-2" src="/logo.png" alt="logo" />
            </Link>
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                  Reset Account Password
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

                  <div className="flex items-end justify-between"></div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="inline-block bg-red-300 rounded-full   px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100  focus:ring-0 active:border-primary-accent-200 "
                      data-te-ripple-init
                      onClick={handlereset}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Fp;
