"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent } from "react";

const Login: React.FC = () => {
  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn("credentials", {
      login: "aprovame",
      password: "aprovame",
      redirect: false,
    });

    if (result?.error) return;

    console.log(result);

    // router.replace("/dashboard/assignors");
  }

  return (
    <div className="min-h-screen grid grid-cols-12 items-start sm:items-stretch">
      <div className="col-span-12 sm:col-span-5 md:col-span-7 lg:col-span-8 bg-auth py-12"></div>
      <div className="col-span-12 sm:col-span-7 md:col-span-5 lg:col-span-4 flex flex-col justify-center items-center p-8 bg-white">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-center text-2xl font-bold text-gray-700">
            Bem vindo novamente
          </h2>
          <p className="text-center text-sm text-gray-500">
            Faça seu login para continuar
          </p>

          <button onClick={handleSubmit}>Click</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
