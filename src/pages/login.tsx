import Navbar from "@/components/navbar";
import Head from "next/head";
import Image from "next/image";
import { useReducer } from "react";
import emailReducer, { INIT_EMAIL_STATE } from "@/reducers/login_page/reducer";
import EmailDispatcher from "@/reducers/login_page/actions";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const [{ email, isValid, warnUser }, d] = useReducer(
    emailReducer,
    INIT_EMAIL_STATE
  );

  const dispatcher = EmailDispatcher(d);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isValid ? console.log(email) : dispatcher.WarnUser();
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                  <h2 className="font-bold text-2xl">
                    Log in or Sign up to continue
                  </h2>
                  <div className="relative flex flex-col gap-10">
                    <div className="flex flex-col relative group">
                      <label
                        htmlFor="email"
                        className={`transition-all ease-in absolute ${
                          email !== ""
                            ? "-top-4 scale-75"
                            : "top-1 group-focus-within:scale-75 group-focus-within:-top-4"
                        } ${
                          warnUser ? "text-red-600" : ""
                        } left-2 bg-neutral-900 px-2 py-1 z-10`}
                      >
                        <span
                          className={`${
                            warnUser || email !== ""
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
                          dispatcher.ChangeEmail(e.target.value);
                        }}
                        onBlur={() => dispatcher.CheckValidity()}
                        type="text"
                        className={`transition-all ease-in bg-neutral-900 p-2 border-white border border-solid border-opacity-50 outline-none rounded-md ${
                          warnUser
                            ? "text-red-600 border-red-600 outline-red-600"
                            : ""
                        } ${
                          email === ""
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
                              Invalid Email
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <button
                      className={`${
                        warnUser ? "bg-neutral-600 opacity-70" : "bg-red-600"
                      } py-2 transition-all ease-in shadow-black shadow-lg font-bold text-lg rounded-lg`}
                    >
                      Continue
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
