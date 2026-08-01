"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Exchanging OAuth code for token...");
  const ran = useRef(false);

  useEffect(() => {
    const code = params.get("code");
    const oauthError = params.get("error");
    console.log(code);
    

    if (oauthError) { 
      setError(`OAuth Error: ${oauthError}`); 
      return; 
    }
    
    if (!code) return;

    if (ran.current) return;  
    ran.current = true;

    console.log("Found OAuth code in URL:", code);
    setStatus("Contacting authentication server...");

    fetch(`https://vercel-production-d3aa.up.railway.app/api/auth/exchange`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Exchange API failed:", res.status, errorText);
          throw new Error(`Server returned ${res.status}: ${errorText || res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Backend response received:", data);
        const token = data.token || data.accessToken || data.access_token || data.jwt;
        
        if (!token) {
          throw new Error(`Token missing in server response: ${JSON.stringify(data)}`);
        }

        localStorage.setItem("token", token);
        console.log("Token successfully saved to localStorage!", token);
        setStatus("Success! Redirecting to dashboard...");
        router.replace("/dashboard");
      })
      .catch((err) => {
        console.error("OAuth exchange error:", err);
        setError(err.message || "Login failed. Please try again.");
      });
  }, [params, router]);

  if (error) {
    return (
      <div className="p-6 text-center font-sans">
        <p className="text-rose-500 font-semibold mb-2">Login failed: {error}</p>
        <p className="text-xs text-zinc-400">Check your browser console (F12) for network logs or CORS issues.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 text-center font-sans">
      <p className="text-zinc-300 font-medium animate-pulse">{status}</p>
    </div>
  );
}
