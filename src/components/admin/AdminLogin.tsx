import React, { useState } from "react";
import { Shield, Lock, Mail, Eye, EyeOff, LogIn, Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminLoginProps {
  onLogin?: (success: boolean) => void;
}

function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo credentials
    if (email === "admin@fairshare.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminEmail", email);
      
      if (onLogin) {
        onLogin(true);
      } else {
        navigate("/admin/dashboard");
      }
    } else {
      setError("Invalid credentials. Use admin@fairshare.com / admin123");
    }
    setLoading(false);
  };

  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 relative">
      
      {/* Back to Home Button - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={goBackToHome}
          className="flex items-center space-x-2 px-3 py-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all duration-200 text-gray-700 hover:text-sky-600 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* LEFT SIDE - Welcome & Admin Image */}
            <div className="bg-gradient-to-br from-gray-900 to-indigo-500 p-6 lg:p-8 flex flex-col justify-center items-center text-center">
              
              {/* Logo */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  Welcome Admin
                </h1>
                <p className="text-sky-100 text-sm mt-2">
                  Fair Share Cooperative Insurance
                </p>
              </div>

              {/* Large Admin Image */}
              <div className="mt-4 w-full">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=350&fit=crop" 
                  alt="Admin Dashboard" 
                  className="rounded-xl shadow-lg border border-white/30 w-full object-cover h-48 lg:h-56"
                />
              </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="p-8 lg:p-10 bg-white">
              <div className="max-w-sm mx-auto w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-900 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <LogIn className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Admin Sign In</h2>
                  <p className="text-gray-500 text-sm mt-1">Access your admin portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm"
                        placeholder="admin@fairshare.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <p className="text-red-600 text-xs text-center">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-gray-900 to-indigo-500 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                      </>
                    )}
                  </button>
                </form>

                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;