"use client";

import { setCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TwoFactor() {
  const [code, setCode] = useState("");
  const router = useRouter();

  function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code === "123456") {
      setCookie("admin_2fa", "true");
      router.push("/admin/dashboard");
    }
  }

  return (
    <form onSubmit={verify} className="min-h-screen flex items-center justify-center">
      <input onChange={e=>setCode(e.target.value)} placeholder="2FA Code" />
    </form>
  );
}
