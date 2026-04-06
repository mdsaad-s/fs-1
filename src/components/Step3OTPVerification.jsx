import React, { useState, useEffect } from "react";
import { ChevronLeft, Smartphone, Shield, RefreshCw, CheckCircle, Clock, AlertCircle } from "lucide-react";

function Step3OTPVerification({ formData, updateFormData, onNext, onBack, userId, setLoading, loading, otpSent }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [demoOtp, setDemoOtp] = useState("");

  // Generate a random demo OTP when component loads
  useEffect(() => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(randomOtp);
    console.log("📱 Demo OTP for testing:", randomOtp);
    
    // Show alert with OTP for demo
    setTimeout(() => {
      alert(`📱 Demo Mode - Your OTP is: ${randomOtp}\n\n(For testing, enter this OTP to verify)`);
    }, 500);
  }, []);

  useEffect(() => {
    if (otpSent) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");
    
    // Auto-submit when all 6 digits are entered
    if (value && index === 5) {
      const fullOtp = [...newOtp.slice(0, index), value].join("");
      if (fullOtp.length === 6) {
        setTimeout(() => handleVerify(fullOtp), 100);
      }
    }
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (otpValue = null) => {
    const enteredOtp = otpValue || otp.join("");
    
    if (enteredOtp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    
    // Demo validation - Check if OTP matches the generated demo OTP
    setTimeout(() => {
      if (enteredOtp === demoOtp) {
        setIsVerified(true);
        updateFormData({ isVerified: true, otp: enteredOtp });
        
        // Save verification status
        localStorage.setItem('otpVerified', 'true');
        localStorage.setItem('userMobile', formData.mobile);
        
        // Show success and move to step 4 after 1.5 seconds
        setTimeout(() => {
          console.log("OTP Verified! Moving to Step 4");
          onNext();
        }, 1500);
      } else {
        setError(`Invalid OTP! Demo OTP is: ${demoOtp}`);
        setIsVerifying(false);
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtp(newOtp);
    setTimer(120);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    alert(`📱 New OTP sent: ${newOtp}\n\n(Enter this OTP to verify)`);
    console.log("📱 New Demo OTP:", newOtp);
    
    // Reset timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Verify Mobile Number</h2>
        <p className="text-blue-100 mt-1">Step 3 of 4 - OTP Verification</p>
      </div>

      <div className="p-8">
        {/* Demo Mode Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-6">
          <p className="text-yellow-800 text-sm text-center">
            🔧 <strong>Demo Mode:</strong> Your OTP is <strong className="text-lg">{demoOtp}</strong>
            <br />
            <span className="text-xs">(Enter this code to verify)</span>
          </p>
        </div>

        {!isVerified ? (
          <>
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Smartphone className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Enter Verification Code</h3>
              <p className="text-gray-600 mt-2">
                We've sent a 6-digit verification code to
              </p>
              <p className="font-semibold text-blue-600 text-lg mt-1">
                {formData.mobile || "9876543210"}
              </p>
            </div>

            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white shadow-sm"
                  maxLength="1"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Timer & Resend */}
            <div className="text-center mb-8">
              {timer > 0 ? (
                <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <p className="text-gray-700">
                    Resend code in <span className="font-bold text-blue-600">{formatTime(timer)}</span>
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Resend OTP</span>
                </button>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || otp.join("").length !== 6}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Verify & Continue</span>
                </>
              )}
            </button>

            {/* Quick Fill Button for Demo */}
            <button
              onClick={() => {
                const otpArray = demoOtp.split('');
                setOtp(otpArray);
              }}
              className="w-full mt-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200 transition-all"
            >
              🔧 Quick Fill Demo OTP: {demoOtp}
            </button>
          </>
        ) : (
          // Success State
          <div className="text-center py-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Verified Successfully!</h3>
            <p className="text-gray-600">Your mobile number has been verified.</p>
            <p className="text-gray-500 text-sm mt-2">Redirecting to document upload...</p>
          </div>
        )}

        {/* Navigation Buttons - Only show when not verifying */}
        {!isVerified && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onBack}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="text-sm text-gray-500 flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Demo OTP: {demoOtp}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Step3OTPVerification;