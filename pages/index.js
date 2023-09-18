import Image from "next/image";
import { Inter, Work_Sans } from "next/font/google";
import Login from "@/Component/Login";

const inter = Inter({ subsets: ["latin"] });
const work_sans = Work_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${work_sans.className} text-black h-screen bg-cover`}
      // style={{ backgroundImage: `url('/login-bg.png')` }}
    >
      <div className="relative h-min w-full bg-gray-500 flex items-center">
        <div className="relative flex-shrink-0 w-200 bg-yellow-100 align-middle">
          <Image
            objectFit="scale-down"
            alt="logo"
            width={200}
            height={1}
            src="/discord-logo.png"
            className=" align-top bg-blue-500"
          />
        </div>
        <div className="w-auto h-auto bg-blue-500">
          <h1>Hello There</h1>
        </div>
      </div>
    </main>
  );
}
