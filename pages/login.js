import Image from "next/image";
import { Inter, Work_Sans } from "next/font/google";
import Login from "@/Component/Login";

const inter = Inter({ subsets: ["latin"] });
const work_sans = Work_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${work_sans.className} flex justify-center text-black h-screen bg-cover`}
      style={{ backgroundImage: `url('/login-bg.png')` }}
    >
      <Login />
    </main>
  );
}
