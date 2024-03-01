import { UserButton } from "@clerk/nextjs";
import './globals.css'
import RootLayout from "./layout";
 
export default function Home() {
  return (
    <div className="h-screen">
      <UserButton /><h1>ああ</h1>
    </div>
  )
}