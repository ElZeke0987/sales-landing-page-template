"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/enter-shop-managment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (data?.success==false) {
        alert("Clave incorrecta");
        setPassword("");
        return;
    }
        alert("Bienvenido");
       router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Clave"

      />
      <button type="submit">Entrar</button>
    </form>
  );
}



