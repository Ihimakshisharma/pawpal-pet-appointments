import { useEffect, useState, useCallback } from "react";
import { auth } from "./store";
import type { User } from "./types";

/** Reactive current user – re-renders on login/logout/profile update. */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setUser(auth.currentUser());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
    const onAuth = () => refresh();
    window.addEventListener("pawpal:auth", onAuth);
    window.addEventListener("pawpal:change", onAuth);
    window.addEventListener("storage", onAuth);
    return () => {
      window.removeEventListener("pawpal:auth", onAuth);
      window.removeEventListener("pawpal:change", onAuth);
      window.removeEventListener("storage", onAuth);
    };
  }, [refresh]);

  return { user, ready, refresh, logout: auth.logout };
}

/** Subscribes to any change event – useful to re-read lists. */
export function useStoreVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const bump = () => setV((x) => x + 1);
    window.addEventListener("pawpal:change", bump);
    window.addEventListener("pawpal:auth", bump);
    return () => {
      window.removeEventListener("pawpal:change", bump);
      window.removeEventListener("pawpal:auth", bump);
    };
  }, []);
  return v;
}
