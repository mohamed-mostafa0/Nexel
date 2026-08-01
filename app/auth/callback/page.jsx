"use client";
import { Suspense } from "react";
import CallbackHandler from "./CallbackHandler";

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <CallbackHandler />
    </Suspense>
  );
}