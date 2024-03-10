"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import './globals.css';
import App from "./components/page";

export default function Home() {
  const [userName, setUserName] = useState("ゲストさん");
  const { isLoaded, user } = useUser();


  if (isLoaded == false) {
    return <div>ローディング中</div>
  }
  if (user == null) {
    return (<>
      <div className="logins">
        <a href="/sign-up" className="sign">会員登録</a>
        <a href="/sign-in" className="sign">ログイン</a>
        <p className="greeting">こんにちは、ゲストさん！</p>
      </div>
      <App />
    </>)
  } else { 
    return (
      <>
      <div className="logins">
        <UserButton />
        <p className="greeting">{user.fullName}'s To-Do</p>
      </div>
      <App />
      </>
    )}
}
