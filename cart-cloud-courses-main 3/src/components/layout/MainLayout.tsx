
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/contexts/AuthContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-slate-100 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-slate-600">
          <p>© 2025 IIITCourses. All rights reserved.</p>
          <p className="mt-2">A demo project for course management.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
