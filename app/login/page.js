"use client";
import React, { useEffect, Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

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
        <p>Signed in as {session.user?.email}</p>
        <p>Name: {session.user?.name}</p>
        {/* role & id require custom session config */}
        <p>Role: {session.user?.role}</p>
        <p>Id: {session.user?.id}</p>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("google")}>Login</button>
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
