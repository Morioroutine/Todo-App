"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import './globals.css';
import App from "./components/page";

export default function Home() {
  const { isLoaded, user } = useUser();

  const renderUserSection = () => {
    if (!isLoaded) {
      return <div>Now Loading...</div>;
    }
    //非ログイン時
    if (user == null) {
      return (
        <div className="logins">
          <a href="/sign-up" className="sign">会員登録</a>
          <a href="/sign-in" className="sign">ログイン</a>
          <p className="greeting">こんにちは、ゲストさん！</p>
        </div>
      );
    }
    //ログイン時 
    return (
      <div className="logins">
        <UserButton />
        <p className="greeting">{user.fullName}&apos;s To-Do</p>
      </div>
    );
  };

  return (
    <>
      {renderUserSection()}
      <App />
    </>
  );
}
