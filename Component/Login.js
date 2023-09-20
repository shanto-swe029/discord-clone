import Link from "next/link";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userdata = { email, password };
  // console.log(userdata);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userdata }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data.message); // Successful login
    } else {
      console.error(data.message); // Invalid credentials
    }
  };

  return (
    <div className="m-auto bg-[#313338] text-white rounded-lg p-5 min-w-[485px] md:w-[500px]">
      <div>
        <div className="text-center pb-3">
          <p className="font-semibold text-2xl">Welcome back!</p>
          <p className=" text-[#b4b9c0] text-md">
            We&apos;re so excited to see you again!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="text-sm">
            <div className="pt-3">
              <p className="font-bold text-[#b4b9c0] py-2">EMAIL</p>
              <input
                className="min-w-full rounded-sm bg-[#1e1f22] p-3"
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-3">
              <p className="font-bold text-[#b4b9c0] py-2">PASSWORD</p>
              <input
                className="min-w-full rounded-sm bg-[#1e1f22] p-3"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="pt-2 pb-2">
              <Link
                href="/register"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button className="bg-[#5865f2] w-full rounded py-3 text-sm mt-4 mb-2">
            Log In
          </button>
        </form>
        <div className="text-sm">
          <span className="text-gray-400">Need an account?&nbsp;</span>
          <Link href="/register/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Login;
