import React, { useState } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Step1Terms from "./Step1Terms";
import Step2PersonalInfo from "./Step2PersonalInfo";
import Step3OTPVerification from "./Step3OTPVerification";
import Step4DocumentUpload from "./Step4DocumentUpload";
import RegistrationProgress from "./RegistrationProgress";

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    agreedToTerms: false,
    fullName: "",
    fatherName: "",
    motherName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    idType: "aadhar",
    idNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    pincode: "",
    premiumAmount: "",
    tenure: "",
    otp: "",
    isVerified: false,
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    photo: null,
    signature: null,
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const goToNextStep = () => {
    console.log("Moving to next step. Current:", currentStep);
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    console.log("Moving to previous step. Current:", currentStep);
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const goBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Back to Home Button - Top Left */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={goBackToHome}
          className="flex items-center space-x-2 px-3 py-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-all duration-200 text-gray-700 hover:text-blue-600 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3 shadow-lg">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Fair Share Cooperative
          </h1>
          <p className="text-gray-600 mt-2">Join our community for secure financial future</p>
        </div>

        <RegistrationProgress currentStep={currentStep} />

        {/* DEBUG - Shows current step number */}
        <div className="bg-yellow-100 p-2 mb-4 rounded text-center font-bold">
          Current Step: {currentStep}
        </div>

        <div className="mt-8">
          {currentStep === 1 && (
            <Step1Terms
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              loading={loading}
            />
          )}
          
          {currentStep === 2 && (
            <Step2PersonalInfo
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
              setLoading={setLoading}
              setUserId={setUserId}
              setOtpSent={setOtpSent}
              loading={loading}
            />
          )}
          
          {currentStep === 3 && (
            <Step3OTPVerification
              formData={formData}
              updateFormData={updateFormData}
              onNext={goToNextStep}
              onBack={goToPreviousStep}
              userId={userId}
              setLoading={setLoading}
              loading={loading}
              otpSent={otpSent}
            />
          )}
          
          {currentStep === 4 && (
            <Step4DocumentUpload
              formData={formData}
              updateFormData={updateFormData}
              userId={userId}
              setLoading={setLoading}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;