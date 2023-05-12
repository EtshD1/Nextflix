import Navbar from "@/components/navbar";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <div className="p-8 bg-neutral-900 rounded-lg">
            <div className="w-full md:w-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-8">
                  <h2 className="font-bold text-2xl">
                    Log in or Sign up to continue
                  </h2>
                  <div className="relative flex flex-col gap-4 group">
                    <label
                      className={`transition-all ease-in ${
                        email
                          ? "-top-4 scale-75"
                          : "top-1 group-focus-within:scale-75 group-focus-within:-top-4"
                      } absolute ${
                        email === ""
                          ? "opacity-70 group-focus-within:opacity-100"
                          : "opacity-100"
                      }
                    left-2 bg-neutral-900 px-2 py-1 z-10`}
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      className={`transition-all ease-in bg-neutral-900 p-2 border-white border border-solid border-opacity-50 outline-none rounded-md ${
                        email === ""
                          ? "opacity-70 group-focus-within:opacity-100"
                          : "opacity-100"
                      }`}
                    />
                    <button className="bg-red-600 py-2 font-bold text-lg rounded-lg">
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
