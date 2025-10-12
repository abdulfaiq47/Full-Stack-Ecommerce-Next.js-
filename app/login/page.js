"use client";
import React, { useEffect, Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import style from "./page.module.css";
import Image from "next/image";

function LoginContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      toast.error("You are not authorized to access that page");
    }
  }, [searchParams]);

  if (session) {
    return (
      <>
        <div className={style.container}>
        <div className={style.card}>
          <h2>Welcome 👋</h2>
          <p>Signed in as: <strong>{session.user?.email}</strong></p>
          <p>Name: {session.user?.name}</p>
          <p>Role: {session.user?.role || "User"}</p>
          <p>ID: {session.user?.id || "N/A"}</p>
          <button className={style.logoutbtn} onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </div>
    
      </>
    );
  }

  return (
    <div>
      <button className={style.googlebtn} onClick={() => signIn("google")}>
        {" "}
        <Image
          src="/googlelogo.svg"
          height={30}
          width={40}
          style={{ marginLeft: "-9px" }}
          alt="Google Logo"
        ></Image>{" "}
        Sign in with Google
      </button>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
