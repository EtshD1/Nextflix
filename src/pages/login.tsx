"use client";
import Navbar from "@/components/navbar";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer } from "react";
import emailReducer, { INIT_EMAIL_STATE } from "@/reducers/login_page/reducer";
import EmailDispatcher from "@/reducers/login_page/actions";
import { AnimatePresence, motion } from "framer-motion";
import magic from "@/lib/magic";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { useRouter } from "next/router";

const Login = () => {
  const [{ loading, email, isValid, warnUser, warning }, d] = useReducer(
    emailReducer,
    INIT_EMAIL_STATE
  );
  const router = useRouter();

  const { WarnUser, ChangeEmail, CheckValidity, ClearLoading, SetLoading } = EmailDispatcher(d);

  useEffect(() => {
    const handleRouteChange = () => ClearLoading()
    const handleRouteChangeError = () => {
      ClearLoading();
      window.location.reload()
    }
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeError", handleRouteChangeError);
    }
  }, [router.events]);

  const m = typeof window !== "undefined" && magic();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid)
      return WarnUser("Invalid Email");
    if (!m)
      return;
    SetLoading();
    try {
      const res = await m.auth.loginWithMagicLink({ email });
      if (res)
        router.push("/");
    } catch (error) {
      console.log(error);
      if (error instanceof RPCError) {
        switch (error.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
            WarnUser("Verification failed, please try again later.")
            console.error("Magic Link Failed Verification", { error });
            break;
          case RPCErrorCode.MagicLinkExpired:
            WarnUser("Magic link expired, please try again.")
            console.error("Magic Link Expired", { error });
            break;
          case RPCErrorCode.MagicLinkRateLimited:
            WarnUser("Verification failed, please try again later.")
            console.error("Magic Link Rate Limited", { error });
            break;
          case RPCErrorCode.UserAlreadyLoggedIn:
            WarnUser("Already logged in.")
            console.error("User Already Logged In", { error });
            break;
        }
      }
      else WarnUser("Application failure, Please try again later")
    }
  };

  return (
    <>
      <Head>
        <title>Nextflix - Magic Login</title>
        <meta
          name="description"
          content="Login in into Nextflix using a Magic Link."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <div className="relative h-screen flex justify-center items-center">
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-gradient-to-b from-[#00000099] to-transparent">
          <Image
            className="-z-10"
            src="/static/temp/login_background.jpg"
            alt="Login Background"
            fill
            sizes="100vw"
          />
        </div>
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 h-full w-full z-20 bg-black bg-opacity-40">
          <div className="p-8 bg-neutral-900 rounded-lg shadow-2xl shadow-black">
            <div className="w-full md:w-auto">
              <form onSubmit={handleSubmit} className={loading ? "opacity-70" : "opacity-100"}>
                <div className="flex flex-col gap-8">
                  <h2 className="font-bold text-2xl">
                    Log in or Sign up to continue
                  </h2>
                  <div className="relative flex flex-col gap-10">
                    <div className="flex flex-col relative group">
                      <label
                        htmlFor="email"
                        className={`transition-all ease-in absolute ${email !== ""
                          ? "-top-4 scale-75"
                          : "top-1 group-focus-within:scale-75 group-focus-within:-top-4"
                          } ${warnUser ? "text-red-600" : ""
                          } left-2 bg-neutral-900 px-2 py-1 z-10`}
                      >
                        <span
                          className={`${warnUser || email !== ""
                            ? "opacity-100"
                            : "opacity-70 group-focus-within:opacity-100"
                            } transition-all ease-in-out`}
                        >
                          Email
                        </span>
                      </label>
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => {
                          ChangeEmail(e.target.value);
                        }}
                        onBlur={() => CheckValidity()}
                        type="text"
                        className={`transition-all ease-in bg-neutral-900 p-2 border-white border border-solid border-opacity-50 outline-none rounded-md ${warnUser
                          ? "text-red-600 border-red-600 outline-red-600"
                          : ""
                          } ${email === ""
                            ? "opacity-70 group-focus-within:opacity-100"
                            : "opacity-100"
                          }`}
                      />
                      <div className="relative">
                        <AnimatePresence>
                          {warnUser && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 100 }}
                              exit={{ opacity: 0 }}
                              className="absolute flex justify-end left-0 right-0 top-2 text-red-600 text-base"
                            >
                              {warning}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <button
                      className={`${warnUser ? "bg-neutral-600 opacity-70" : "bg-red-600"
                        } py-2 transition-all ease-in shadow-black shadow-lg font-bold text-lg rounded-lg`}
                    >
                      {loading ? "Please wait..." : "Continue"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
