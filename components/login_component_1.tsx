"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LiaUnlinkSolid } from "react-icons/lia";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
const LoginComponent = () => {
  function loginGithub(provider: "github") {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  function loginGoogle(provider:"google"){
    signIn(provider,{
      callbackUrl:DEFAULT_LOGIN_REDIRECT
    })
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <LiaUnlinkSolid className="text-2xl " />
        <CardTitle>Sign In to The App</CardTitle>
        <CardDescription>Welcome back! Sign in to continue</CardDescription>

        <Button
          className="w-full my-2 cursor-pointer"
          variant="secondary"
          onClick={() => {
            loginGithub("github");
          }}
        >
          <FaGithub />
          <span>Github</span>
        </Button>

        <Button
          className="w-full my-2 cursor-pointer"
          variant="secondary"
          onClick={() => {
            loginGoogle("google");
          }}
        >
          <FcGoogle />
          <span>Google</span>
        </Button>
      </CardHeader>
    </Card>
  );
};

export default LoginComponent;