import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export const useProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);
};