"use client";

import { useRouter } from "next/navigation";
import { setCookie, setRole } from "@/lib/auth";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 1000));

    if (email && password) {
      setCookie("admin_session", "true");
      setRole("SUPER_ADMIN");
      router.push("/admin/two-factor");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="bg-neutral-900 p-6 rounded space-y-4">
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </div>
    </form>
  );
}
