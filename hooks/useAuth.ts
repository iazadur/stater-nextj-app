import { useState, useEffect } from "react";

async function useAuth(token: string) {
  try {
    const res = await fetch("https://tracev2.barikoimaps.dev/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default useAuth;
