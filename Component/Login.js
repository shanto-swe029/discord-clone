import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div className="m-auto bg-[#313338] text-white rounded p-5 min-w-[485px] md:w-[680px]">
      <div>
        <div className="text-center pb-3">
          <p className="font-semibold text-lg">Welcome back!</p>
          <p className=" text-[#b4b9c0] text-xs">
            We&apos;re so excited to see you again!
          </p>
        </div>
        <div className="text-[0.6rem]">
          <div className="pt-2">
            <p className="font-bold text-[#b4b9c0] py-1">EMAIL</p>
            <input
              className="min-w-full rounded-sm bg-[#1e1f22] p-2"
              type="email"
            />
          </div>
          <div className="pt-2">
            <p className="font-bold text-[#b4b9c0] py-1">PASSWORD</p>
            <input
              className="min-w-full rounded-sm bg-[#1e1f22] p-2"
              type="password"
            />
          </div>
          <div className="pt-1">
            <Link
              href="/register"
              className="text-blue-500 hover:underline text-[0.65rem]"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <button className="bg-[#5865f2] w-full rounded py-2 text-xs mt-4 mb-2">
          Log In
        </button>
        <div className="text-[0.65rem]">
          <span>Need an account?&nbsp;</span>
          <Link href="/register/" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default Login;
