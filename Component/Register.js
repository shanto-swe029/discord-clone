import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function Register() {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState(null);

  const router = useRouter();

  const credentials = {email, displayName, username, password, dob};
  // console.log(credentials);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credentials }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Successful registration
      router.push("/login")
    } else {
      // Check for duplicate email error
      if (response.status === 400 && data.error === 'Email already exists') {
        setError('This email is already registered. Please use a different email.');
        // alert('This email is already registered. Please use a different email.');
      } else {
        console.error(data.error); // Other error
      }
    }
  };
  
  const label =
    "(Optional) It's okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time.";
  return (
    <div className="m-auto bg-[#313338] text-white p-5 min-w-[400px] md:w-[475px] max-w-[475px] rounded-lg">
      <h2 className="text-2xl text-center">Create an account</h2>
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mt-4">
          {error}
        </div>
      )}
      <div className="text-sm">
        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">EMAIL</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-2"
              type="email"
              required name="email" 
              onChange={(e)=>{
                setEmail(e.target.value)
                setError(null)
              }}
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">DISPLAY NAME</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="text" name="displayName" onChange={(e)=>setDisplayName(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">USERNAME</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="text"
              required name="userName" onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">PASSWORD</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="password"
              required name="password" onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="pt-3">
            <p className="font-bold text-[#b4b9c0] py-2">DATE OF BIRTH</p>
            <input
              className="min-w-full rounded-md bg-[#1e1f22] p-3"
              type="date"
              required name="dob" onChange={(e)=>setDob(e.target.value)}
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
          <Link href="/login" className=" text-blue-500 text-sm hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
