import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((result) => {
      setAuth(result);
      if (!result) navigate("/login");
    });
  }, [navigate]);

  if (auth === null) return <div>Loading...</div>;
  return auth ? <>{children}</> : null;
}