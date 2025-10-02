"use client";
import React from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import style from "./page.module.css";

const dashboard = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      toast(`Welcome back ${session.user.name}`);
    }
  }, [session]);

  return (
    <>
      <div className={style.container}>
        <div className={style.left}></div>
        <div className={style.right}>
          <h1>Dashboard</h1>
          <br />
          <div className={style.about}>
            <div className={`${style.reve}  ${style.gh}`}>reve</div>
            <div className={`${style.sale}  ${style.gh}`}>Sales</div>
            <div className={`${style.users}  ${style.gh}`}>Users</div>
            <div className={`${style.admins}  ${style.gh}`}>admins</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default dashboard;
