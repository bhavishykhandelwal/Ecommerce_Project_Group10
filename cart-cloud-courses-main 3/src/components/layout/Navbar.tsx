
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Menu, ShoppingCart, User, X, Shield } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl text-primary"
            onClick={closeMenu}
          >
            <GraduationCap size={24} />
            <span>IIITCourses</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-slate-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-slate-700"
                }`
              }
            >
              Courses
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/my-courses"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-slate-700"
                  }`
                }
              >
                My Courses
              </NavLink>
            )}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary flex items-center ${
                    isActive ? "text-primary" : "text-slate-700"
                  }`
                }
              >
                <Shield className="mr-1 h-4 w-4" /> Admin
              </NavLink>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-slate-700">
                  Hello, {currentUser?.name}
                  {isAdmin && <span className="ml-1 text-primary font-medium">(Admin)</span>}
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <Link
              to="/"
              className="block py-2 text-slate-700 hover:text-primary"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="block py-2 text-slate-700 hover:text-primary"
              onClick={closeMenu}
            >
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-courses"
                className="block py-2 text-slate-700 hover:text-primary"
                onClick={closeMenu}
              >
                My Courses
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center py-2 text-slate-700 hover:text-primary"
                onClick={closeMenu}
              >
                <Shield className="mr-2 h-4 w-4" /> Admin
              </Link>
            )}
            <div className="pt-3 border-t border-slate-200">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-slate-700 mb-2">
                    Hello, {currentUser?.name}
                    {isAdmin && <span className="ml-1 text-primary font-medium">(Admin)</span>}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleLogout}
                  >
                    <User className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full justify-start mb-2"
                    onClick={() => {
                      navigate("/login");
                      closeMenu();
                    }}
                  >
                    <User className="mr-2 h-4 w-4" /> Log In
                  </Button>
                  <Button
                    variant="default"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/signup");
                      closeMenu();
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
