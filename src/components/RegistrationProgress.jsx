import React from "react";
import { CheckCircle, FileText, UserCheck, Upload, Shield } from "lucide-react";

function RegistrationProgress({ currentStep }) {
  const steps = [
    { number: 1, name: "Terms & Conditions", icon: FileText },
    { number: 2, name: "Personal Details", icon: UserCheck },
    { number: 3, name: "Verify OTP", icon: Shield },
    { number: 4, name: "Upload Documents", icon: Upload },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center font-medium ${
                  currentStep >= step.number ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-200 mx-2">
                <div
                  className={`h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ${
                    currentStep > step.number ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default RegistrationProgress;