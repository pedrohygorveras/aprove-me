"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading";

const Home: React.FC = () => {
  const router = useRouter();
  router.replace("/login");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default Home;
