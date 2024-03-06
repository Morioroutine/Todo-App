"use client"

import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import './globals.css';
import App from "./components/page";

export default function Home() {
  const [userName, setUserName] = useState("ゲストさん");
  const { isLoaded, user } = useUser();

  //Style 
  const container = {
    margin: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  };
  const greeting = {
    margin: "5px",
    padding: "5px",
  };
  const sign = {
    margin: "2px",
    padding: "2px",
  };

  if (isLoaded == false) {
    return <div>ローディング中</div>
  }
  if (user == null) {
    return (<>
      <div style={container}>
        <a href="/sign-up" style={sign}>会員登録</a>
        <a href="/sign-in" style={sign}>ログイン</a>
        <p style={greeting}>Hello ゲストさん!</p>
      </div>
      <App />
    </>)
  } else { 
    return (
      <>
      <div style={container}>
        <UserButton />
        <p style={greeting}>Hello {user.fullName}!</p>
      </div>
      <App />
      </>
    )}

    

  return (
    <div style={container}>
      <UserButton />
      <p style={greeting}>Hello {userName}!</p>
      <a href="/sign-up">会員登録</a>
      <a href="/sign-in">ログイン</a>
    </div>
  );
}
