// pages/index.js
import { Inter, Work_Sans } from "next/font/google";
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const work_sans = Work_Sans({ subsets: ["latin"] });

export default function Home({ userEmail }) {
  const router = useRouter();

  useEffect(() => {
    if (!userEmail) {
      router.push('/login');
    }
  }, [userEmail]);

  if (!userEmail) {
    return null; // or display a loading state while redirecting
  }

  return (
    <main
      className={`${work_sans.className} flex justify-center text-black h-screen bg-cover`}
      style={{ backgroundImage: `url('/login-bg.png')` }}
    >
      <div className='text-center w-2/3 bg-slate-900 h-3/4 m-auto rounded-lg'>
        <div className='text-center text-lg'><p className='text-white'>Hello {userEmail}</p></div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;
  let userEmail = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'your_secret_key');
      userEmail = decoded.email;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return {
    props: {
      userEmail,
    },
  };
}
