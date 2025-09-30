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

    if (res.ok) {
      router.push("/shop-managment");
    } else {
      alert("Clave incorrecta");
    }
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


/*

export default function Unlogged({setPassword}){
    return(<>
            <div className="flex h-screen items-center justify-center">
                <form className="flex flex-col w-1/3" onSubmit={(e)=>{
                    e.preventDefault();
                    setPassword(e.target.elements[0].value);
                }}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Login
                    </button>
                </form>
            </div>
            </>)
}*/