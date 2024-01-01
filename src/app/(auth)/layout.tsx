"use client";
import SwitchLanguages from "@/components/core/SwitchLanguage";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <div className="justify-end p-3 bg-transparent fixed bottom-0 w-screen flex items-center">
        <SwitchLanguages color="black" />
      </div>
    </>
  );
};
export default AuthLayout;
