import Link from "next/link";
import React from "react";

function Register() {
  const label =
    "(Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.";
  return (
    <div className="m-auto bg-[#313338] text-white p-5 min-w-[400px] md:w-[475px] max-w-[475px] rounded-lg">
      <h2 className="text-2xl text-center">Create an account</h2>
      <div className="text-sm">
        <form>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">EMAIL</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-2"
              type="email"
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">DISPLAY NAME</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="text"
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">USERNAME</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="text"
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">PASSWORD</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="password"
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">DATE OF BIRTH</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="date"
            />
          </div>
          <div className="py-3 max-w-[400px] flex gap-2 pl-0">
            <input
              className="h-6 w-6 border-s-2 text-[0.5rem] border-red-500 accent-blue-700"
              name="acceptTerms"
              type="checkbox"
            />
            <p className=" text-xs text-gray-400">{label}</p>
          </div>
          <button className=" bg-blue-600 hover:bg-blue-800 w-full rounded-md py-3 text-sm mt-3 mb-2">
            Continue
          </button>
        </form>
        <div className="text-xs">
          <span className="text-gray-400">
            By registering, you agree to Discord&apos;s&nbsp;
          </span>
          <span>
            <Link href="/tos" className="text-blue-700 hover:underline">
              Terms of Service
            </Link>
          </span>
          <span className="text-gray-400">&nbsp;and&nbsp;</span>
          <span>
            <Link href="/pp" className="text-blue-700 hover:underline">
              Privacy Policy
            </Link>
          </span>
          <span className="text-gray-400">.</span>
        </div>
        <div className="pt-3">
          <Link href="/" className=" text-blue-500 text-sm hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
