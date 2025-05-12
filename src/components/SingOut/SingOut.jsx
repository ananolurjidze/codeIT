"use client";

import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.replace("/");
  };
  return  <button onClick={handleSignOut} 
  style={{
        border:"1px solid black",
        borderRadius:"10px",
        width:"70px",
        height:"30px"
   }}
      >Sign Out</button>;
};

export default SignOut;
