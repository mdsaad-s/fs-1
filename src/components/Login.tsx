import React, { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, Shield, Sparkles, ArrowRight, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    
    if (!email) {
      setEmailError("Email or mobile number is required");
      return false;
    }
    
    if (!emailRegex.test(email) && !mobileRegex.test(email)) {
      setEmailError("Enter valid email or 10-digit mobile number");
      return false;
    }
    
    setEmailError("");
    return true;
  };

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) validateEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) validatePassword(e.target.value);
  };

  // Function to initialize demo data if not exists
  const initializeDemoData = () => {
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    
    if (registrations.length === 0) {
      const demoData = [
        {
          userId: "DEMO001",
          fullName: "Rajesh Kumar",
          email: "rajesh@fairshare.com",
          mobile: "9876543210",
          password: "demo123",
          idType: "AADHAR",
          idNumber: "1234-5678-9012",
          dateOfBirth: "1990-01-15",
          address: "123, Main Street",
          city: "Hyderabad",
          pincode: "500001",
          state: "Telangana",
          country: "India",
          premiumAmount: 1500,
          tenure: 12,
          status: "active",
          timestamp: new Date().toISOString(),
          approvedAt: new Date().toISOString(),
          memberId: "FS-M-1001"
        },
        {
          userId: "DEMO002",
          fullName: "Priya Sharma",
          email: "priya@fairshare.com",
          mobile: "9876543222",
          password: "priya123",
          idType: "AADHAR",
          idNumber: "5678-1234-9012",
          dateOfBirth: "1995-03-20",
          address: "456, Park Avenue",
          city: "Mumbai",
          pincode: "400001",
          state: "Maharashtra",
          country: "India",
          premiumAmount: 2000,
          tenure: 24,
          status: "pending",
          timestamp: new Date().toISOString(),
          memberId: "FS-M-1002"
        }
      ];
      localStorage.setItem("registrations", JSON.stringify(demoData));
      return demoData;
    }
    return registrations;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setLoading(true);
    setError("");

    // Initialize demo data
    const registrations = initializeDemoData();
    
    // Check for member login (email or mobile)
    const user = registrations.find(
      (u: any) => (u.email === email || u.mobile === email) && u.password === password
    );

    console.log("User found:", user);

    if (user) {
      console.log("User status:", user.status);
      
      if (user.status === "active") {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", "demo-token-" + Date.now());
        localStorage.setItem("memberId", user.userId);
        localStorage.setItem("memberEmail", user.email);
        localStorage.setItem("memberName", user.fullName);
        
        console.log("Redirecting to /member/dashboard");
        
        // REDIRECT TO MEMBER DASHBOARD
        navigate("/member/dashboard");
        
      } else if (user.status === "pending") {
        setError("⏳ Your account is pending admin approval. Please wait for approval.");
      } else if (user.status === "rejected") {
        setError("❌ Your account has been rejected. Please contact support.");
      } else {
        setError("⚠️ Account status unknown. Please contact support.");
      }
    } else {
      // Check for admin login
      if (email === "admin@fairshare.com" && password === "admin123") {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", email);
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please check your email/phone and password.");
      }
    }
    
    setLoading(false);
  };

  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Back Button - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <button
              onClick={goBackToHome}
              className="flex items-center space-x-2 px-3 py-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all duration-200 text-gray-700 hover:text-sky-600 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* LEFT SIDE - Welcome & Member Section */}
            <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-6 lg:p-8 flex flex-col justify-center items-center text-center">
              
              {/* Logo */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Welcome Text */}
              <div className="mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-white">
                  Member Portal
                </h1>
                <p className="text-sky-100 text-sm mt-2">
                  Fair Share Cooperative Insurance
                </p>
              </div>

              {/* Features List */}
              <div className="mt-4 w-full text-left space-y-2">
                <div className="flex items-center space-x-2 text-sky-100 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Ethical Insurance</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-100 text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Interest-Free Model</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-100 text-sm">
                  <Lock className="h-4 w-4" />
                  <span>100% Transparent Claims</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Login Form */}
            <div className="p-8 lg:p-10 bg-white">
              <div className="max-w-sm mx-auto w-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <LogIn className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">Member Sign In</h2>
                  <p className="text-gray-500 text-sm mt-1">Access your insurance dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={() => validateEmail(email)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm ${
                          emailError ? 'border-red-400 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Email or Mobile Number"
                        required
                      />
                    </div>
                    {emailError && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <p className="text-red-500 text-xs">{emailError}</p>
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() => validatePassword(password)}
                        className={`w-full pl-10 pr-12 py-2.5 bg-gray-50 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm ${
                          passwordError ? 'border-red-400 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Password"
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
                    {passwordError && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <p className="text-red-500 text-xs">{passwordError}</p>
                      </div>
                    )}
                  </div>

                  {/* Forgot Password */}
                  <div className="text-right">
                    <a href="/forgot-password" className="text-sm text-sky-600 hover:text-sky-700 hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                      <p className="text-red-600 text-xs text-center">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-sm group"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="font-semibold text-sky-600 hover:text-sky-700 hover:underline">
                      Register here
                    </a>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-3 bg-sky-50 rounded-lg border border-sky-100">
                  <p className="text-xs text-sky-700 text-center font-medium mb-2">🔐 Demo Accounts</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p className="flex justify-between">
                      <span>Active Member:</span>
                      <span className="font-mono text-sky-600">rajesh@fairshare.com / demo123</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Pending Member:</span>
                      <span className="font-mono text-orange-600">priya@fairshare.com / priya123</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Admin:</span>
                      <span className="font-mono text-purple-600">admin@fairshare.com / admin123</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;