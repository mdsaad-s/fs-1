import React, { useState } from "react";
import { Mail, Phone, ArrowLeft, Send, CheckCircle, AlertCircle, Shield, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [contactMethod, setContactMethod] = useState<"email" | "mobile">("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate OTP sending
    setTimeout(() => {
      if (contactMethod === "email" && email) {
        const users = JSON.parse(localStorage.getItem("registrations") || "[]");
        const userExists = users.some((u: any) => u.email === email);
        
        if (!userExists) {
          setError("No account found with this email address");
          setLoading(false);
          return;
        }
        
        setOtpSent(true);
        setMessage(`OTP sent to ${email}`);
        startResendTimer();
        setStep(2);
      } else if (contactMethod === "mobile" && mobile) {
        const users = JSON.parse(localStorage.getItem("registrations") || "[]");
        const userExists = users.some((u: any) => u.mobile === mobile);
        
        if (!userExists) {
          setError("No account found with this mobile number");
          setLoading(false);
          return;
        }
        
        setOtpSent(true);
        setMessage(`OTP sent to ${mobile}`);
        startResendTimer();
        setStep(2);
      }
      setLoading(false);
    }, 1000);
  };

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate OTP verification (demo OTP: 123456)
    setTimeout(() => {
      if (otp === "123456") {
        setMessage("OTP verified successfully!");
        setStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Update password in localStorage
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("registrations") || "[]");
      const updatedUsers = users.map((user: any) => {
        if (contactMethod === "email" && user.email === email) {
          return { ...user, password: newPassword };
        }
        if (contactMethod === "mobile" && user.mobile === mobile) {
          return { ...user, password: newPassword };
        }
        return user;
      });
      localStorage.setItem("registrations", JSON.stringify(updatedUsers));
      
      setMessage("Password reset successfully!");
      setTimeout(() => {
        navigate("/member/login");
      }, 2000);
      setLoading(false);
    }, 1000);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError("");
    } else {
      navigate("/member/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="mb-4 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
            <p className="text-blue-100 text-sm mt-1">
              {step === 1 && "Enter your email or mobile to reset password"}
              {step === 2 && "Enter the OTP sent to your registered contact"}
              {step === 3 && "Create a new password"}
            </p>
          </div>

          <div className="p-6">
            {/* Step 1: Contact Selection */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reset via
                  </label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setContactMethod("email")}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        contactMethod === "email"
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-600 hover:border-blue-300"
                      }`}
                    >
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod("mobile")}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        contactMethod === "mobile"
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-600 hover:border-blue-300"
                      }`}
                    >
                      <Phone className="h-4 w-4 inline mr-2" />
                      Mobile
                    </button>
                  </div>
                </div>

                {contactMethod === "email" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your registered email"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your registered mobile number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 inline mr-2" />
                      Send OTP
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Demo OTP: <span className="font-mono font-bold">123456</span>
                  </p>
                </div>

                {message && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                    <p className="text-green-600 text-xs text-center">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={resendTimer > 0}
                    className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Min 6 characters"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm your new password"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="showPassword" className="text-sm text-gray-600">
                    Show password
                  </label>
                </div>

                {message && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                    <p className="text-green-600 text-xs text-center flex items-center justify-center gap-1">
                      <CheckCircle className="h-4 w-4" /> {message}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                    <p className="text-red-600 text-xs text-center">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Remember your password?{" "}
          <a href="/member/login" className="text-blue-600 hover:text-blue-700">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;