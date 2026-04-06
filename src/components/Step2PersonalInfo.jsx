import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Mail, Phone, Lock, Calendar, MapPin, Home, IndianRupee, Clock, ChevronDown } from "lucide-react";

function Step2PersonalInfo({ formData, updateFormData, onNext, onBack, setLoading, setUserId, setOtpSent, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPremiumDropdown, setShowPremiumDropdown] = useState(false);
  const [showTenureDropdown, setShowTenureDropdown] = useState(false);

  const premiumOptions = [
    { value: 500, label: "₹ 500/month" },
    { value: 2000, label: "₹ 2,000/month" },
    { value: 5000, label: "₹ 5,000/month" },
    { value: 10000, label: "₹ 10,000/month" },
    { value: "custom", label: "Custom Amount" }
  ];

  const tenureOptions = [
    { value: 12, label: "12 months (1 year)" },
    { value: 24, label: "24 months (2 years)" },
    { value: 36, label: "36 months (3 years)" },
    { value: 60, label: "60 months (5 years)" }
  ];

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName || formData.fullName.trim() === "") {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    // Email validation
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation
    if (!formData.mobile || formData.mobile.trim() === "") {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least 1 number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // ID Type validation
    if (!formData.idType) {
      newErrors.idType = "Please select ID type";
    }

    // ID Number validation
    if (!formData.idNumber || formData.idNumber.trim() === "") {
      newErrors.idNumber = "Government ID number is required";
    } else if (formData.idType === "aadhar" && !/^\d{12}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Please enter a valid 12-digit Aadhar number";
    } else if (formData.idType === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.idNumber)) {
      newErrors.idNumber = "Please enter a valid PAN card number (e.g., ABCDE1234F)";
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const age = calculateAge(formData.dateOfBirth);
      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      } else if (age > 75) {
        newErrors.dateOfBirth = "Maximum age limit is 75 years";
      }
    }

    // Address validation
    if (!formData.address || formData.address.trim() === "") {
      newErrors.address = "Residential address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    // City validation
    if (!formData.city || formData.city.trim() === "") {
      newErrors.city = "City is required";
    }

    // Pincode validation
    if (!formData.pincode || formData.pincode.trim() === "") {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    // Premium Amount validation
    if (!formData.premiumAmount) {
      newErrors.premiumAmount = "Please select preferred premium amount";
    }

    // Tenure validation
    if (!formData.tenure) {
      newErrors.tenure = "Please select preferred tenure";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to calculate age
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Handle Next with validation
  const handleNextClick = () => {
    console.log("Validating form...");
    
    if (validateForm()) {
      console.log("Validation passed! Moving to Step 3");
      const tempUserId = Date.now();
      setUserId(tempUserId);
      setOtpSent(true);
      onNext();
    } else {
      console.log("Validation failed!", errors);
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle field change with real-time error clearing
  const handleFieldChange = (field, value) => {
    updateFormData({ [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-indigo-500 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        <p className="text-blue-100 mt-1">Step 2 of 4 - Tell us about yourself</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="As per government ID"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Father's Name</label>
            <input
              type="text"
              value={formData.fatherName}
              onChange={(e) => handleFieldChange('fatherName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Father's full name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mother's Name</label>
            <input
              type="text"
              value={formData.motherName}
              onChange={(e) => handleFieldChange('motherName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Mother's full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleFieldChange('mobile', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.mobile ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="9876543210"
                maxLength="10"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Create Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.idType}
              onChange={(e) => handleFieldChange('idType', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.idType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select ID Type</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="voter">Voter ID</option>
              <option value="passport">Passport</option>
            </select>
            {errors.idType && (
              <p className="text-red-500 text-xs mt-1">{errors.idType}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Government ID Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={(e) => handleFieldChange('idNumber', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.idNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={formData.idType === "aadhar" ? "12-digit Aadhar number" : "ID number"}
              maxLength={formData.idType === "aadhar" ? 12 : 50}
            />
            {errors.idNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                max="2008-07-01"
                min="1951-07-01"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Residential Address <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            rows="2"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="House No., Street, Area, Landmark"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="City"
              />
            </div>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleFieldChange('pincode', e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6-digit pincode"
                maxLength="6"
              />
            </div>
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Insurance Preferences with Dropdowns */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Preferences</h3>
          
          {/* Premium Amount Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Premium Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowPremiumDropdown(!showPremiumDropdown);
                  setShowTenureDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${
                  errors.premiumAmount ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  <IndianRupee className="h-4 w-4 text-gray-400 mr-2" />
                  {formData.premiumAmount 
                    ? premiumOptions.find(opt => opt.value === formData.premiumAmount)?.label || `₹ ${formData.premiumAmount}/month`
                    : "Select premium amount"}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showPremiumDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showPremiumDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {premiumOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        handleFieldChange('premiumAmount', option.value);
                        setShowPremiumDropdown(false);
                        if (option.value === "custom") {
                          const customAmount = prompt("Enter custom premium amount (₹):", "5000");
                          if (customAmount && !isNaN(customAmount) && parseInt(customAmount) > 0) {
                            handleFieldChange('premiumAmount', parseInt(customAmount));
                          } else {
                            handleFieldChange('premiumAmount', "");
                          }
                        }
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.premiumAmount && (
              <p className="text-red-500 text-xs mt-1">{errors.premiumAmount}</p>
            )}
          </div>

          {/* Tenure Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Tenure <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowTenureDropdown(!showTenureDropdown);
                  setShowPremiumDropdown(false);
                }}
                className={`w-full px-4 py-2 text-left bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${
                  errors.tenure ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <span className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  {formData.tenure 
                    ? tenureOptions.find(opt => opt.value === formData.tenure)?.label || `${formData.tenure} months`
                    : "Select tenure"}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showTenureDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showTenureDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  {tenureOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        handleFieldChange('tenure', option.value);
                        setShowTenureDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.tenure && (
              <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>
            )}
          </div>
        </div>

        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 font-semibold mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside text-sm text-red-600">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="px-8 py-2 bg-gradient-to-r from-gray-900 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <span>Next →</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2PersonalInfo;