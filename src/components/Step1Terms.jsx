import React, { useState } from "react";
import { ChevronRight, Shield, Users, DollarSign, TrendingUp, Scale, FileText as FileIcon, Lock } from "lucide-react";

function Step1Terms({ formData, updateFormData, onNext, loading }) {
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [agreed, setAgreed] = useState(formData.agreedToTerms || false);

  const handleAgree = () => {
    setAgreed(true);
    updateFormData({ agreedToTerms: true });
  };

  const handleNext = () => {
    if (agreed) {
      onNext();
    }
  };

  const termsSections = [
    {
      icon: Users,
      title: "Membership & Eligibility",
      content: "• Must be 18+ years, Indian citizen or NRI, up to 75 years\n• Valid ID proof required\n• Membership subject to approval\n• Nominee registration mandatory"
    },
    {
      icon: DollarSign,
      title: "Premium Contribution",
      content: "• Periodic premiums as decided by society\n• Options: Monthly, Quarterly, Half-Yearly, Annually\n• Interest-free contributions\n• Non-payment leads to suspension"
    },
    {
      icon: TrendingUp,
      title: "Fund Pool & Investments",
      content: "• 30% reserve in Gold\n• 50% for Insurance Claims, 20% for Business Investment\n• Ethical, interest-free investments only\n• No prohibited activities"
    },
    {
      icon: Shield,
      title: "Coverage & Claims",
      content: "• Coverage as per policy agreement\n• Claims with documents within timeframe\n• Verification from common fund\n• Fraud leads to termination"
    },
    {
      icon: Scale,
      title: "Surplus Distribution",
      content: "• Profit distributed fairly\n• Formula: Profit × (Premium/Total Fund)\n• Surplus refunded or reduces premiums"
    },
    {
      icon: FileIcon,
      title: "Governance",
      content: "• Members participate in meetings\n• 'One member, one vote' principle\n• Extra amount requires Gold/Certificates as collateral"
    },
    {
      icon: Lock,
      title: "Data Protection",
      content: "• Personal information confidential\n• No third-party sharing except legal requirements"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-500 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Member Terms & Conditions</h2>
        <p className="text-blue-100 mt-1">Please read carefully before proceeding</p>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {termsSections.slice(0, 4).map((section, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <section.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowFullTerms(!showFullTerms)}
          className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-flex items-center"
        >
          {showFullTerms ? "Hide" : "Show"} Full Terms & Conditions
          <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${showFullTerms ? "rotate-90" : ""}`} />
        </button>

        {showFullTerms && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Manual</h3>
            <p className="text-gray-600 mb-4">
              Welcome to our Cooperative & Mutual Insurance Platform. By becoming a member or policyholder, you agree to the following Terms and Conditions. Please read carefully before proceeding.
            </p>
            
            {termsSections.map((section, idx) => (
              <div key={idx} className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">{idx + 1}. {section.title}</h4>
                <p className="text-gray-600 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
            
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-bold text-yellow-800">Important Notes:</h4>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
                <li>Insurance Categories: Life Insurance, Health Insurance, Girls Insurance</li>
                <li>Voluntary withdrawal: 80% funds will not be returned</li>
                <li>Dispute resolution through arbitration</li>
                <li>Operates under Insurance Act 1938, Cooperative Societies Act 1912</li>
              </ul>
            </div>
          </div>
        )}

        {/* Agreement Checkbox */}
        <div className="border-t pt-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                if (e.target.checked) handleAgree();
                else setAgreed(false);
              }}
              className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="text-gray-700">
                I confirm that I have read, understood, and agree to all the Terms & Conditions, 
                including membership rules, premium contributions, claim policies, and data protection guidelines.
              </span>
              <p className="text-sm text-gray-500 mt-1">
                By checking this box, you are entering into a legally binding agreement with Fair Share Cooperative.
              </p>
            </div>
          </label>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleNext}
            disabled={!agreed || loading}
            className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
              agreed && !loading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>I Agree & Continue</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step1Terms;