"use client";
import React, { useEffect, Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export const dynamic = "force-dynamic"; // 👈 Add this

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
        <p>Sign in AS {session.user.email}</p>
        <p>Name {session.user.name}</p>
        <p>Role: {session.user.role}</p>
        <p>Id: {session.user.id}</p>
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
    <Suspense fallback={<p>Loading...</p>}>
      <LoginContent />
    </Suspense>
  );
}
