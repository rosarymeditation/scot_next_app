import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SIGN_IN_URL, TOKEN, getCookieAsync } from "../../utils/global";
export const LoginChecker = () => {
  const router = useRouter();
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const token = await getCookieAsync(TOKEN);
   
    if (!token) {
      console.log("Not token ----------------------");
      router.push(SIGN_IN_URL);
    } 
  };
  return <div></div>;
};
