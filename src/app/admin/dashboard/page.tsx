"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Only allow access if sessionStorage flag is set
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("admin_logged_in");
      if (!isLoggedIn) {
        router.replace("/admin/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_logged_in");
    }
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-8 text-gray-700">Welcome, Admin! You are logged in.</p>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 