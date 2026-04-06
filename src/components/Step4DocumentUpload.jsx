import React, { useState } from "react";
import { ChevronLeft, Upload, CheckCircle, XCircle, FileImage, CreditCard, User, PenTool, Loader2, Clock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Step4DocumentUpload({ formData, updateFormData, userId, setLoading, loading }) {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState({
    aadharFront: null,
    aadharBack: null,
    panCard: null,
    photo: null,
    signature: null,
  });
  const [uploadStatus, setUploadStatus] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleFileUpload = (field, file) => {
    if (!file) return;
    
    // Validations
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (!validTypes.includes(file.type)) {
      alert("Please upload JPG or PNG file");
      return;
    }
    
    if (file.size > maxSize) {
      alert("File size should be less than 2MB");
      return;
    }
    
    setUploadedFiles(prev => ({ ...prev, [field]: file }));
    updateFormData({ [field]: file });
  };

  const handleSubmit = async () => {
    // Check all files uploaded
    const requiredFiles = ['aadharFront', 'aadharBack', 'panCard', 'photo', 'signature'];
    const missingFiles = requiredFiles.filter(f => !uploadedFiles[f]);
    
    if (missingFiles.length > 0) {
      alert("Please upload all required documents");
      return;
    }
    
    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("userId", userId);
    formDataObj.append("aadharFront", uploadedFiles.aadharFront);
    formDataObj.append("aadharBack", uploadedFiles.aadharBack);
    formDataObj.append("panCard", uploadedFiles.panCard);
    formDataObj.append("photo", uploadedFiles.photo);
    formDataObj.append("signature", uploadedFiles.signature);
    
    try {
      const response = await fetch("http://localhost:9090/api/auth/upload-documents", {
        method: "POST",
        body: formDataObj,
      });
      
      if (response.ok) {
        setSubmissionSuccess(true);
        setShowPopup(true);
      } else {
        alert("Document upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login");
  };

  const uploadSections = [
    {
      id: "aadharFront",
      title: "Aadhar Card (Front)",
      icon: CreditCard,
      accept: "image/*",
      required: true,
    },
    {
      id: "aadharBack",
      title: "Aadhar Card (Back)",
      icon: CreditCard,
      accept: "image/*",
      accept: "pdf/*",
      required: true,
    },
    {
      id: "panCard",
      title: "PAN Card",
      icon: FileImage,
      accept: "image/*",
      accept: "pdf/*",
      required: true,
    },
    {
      id: "photo",
      title: "Passport Size Photo",
      icon: User,
      accept: "image/*",
      accept: "pdf/*",
      required: true,
    },
    {
      id: "signature",
      title: "Signature",
      icon: PenTool,
      accept: "image/*",
      accept: "pdf/*",
      required: true,
    },
  ];

  // Check if all files are uploaded
  const allFilesUploaded = Object.values(uploadedFiles).every(file => file !== null);
  const uploadedCount = Object.values(uploadedFiles).filter(file => file !== null).length;
  const totalRequired = uploadSections.length;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-indigo-500 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Document Upload</h2>
          <p className="text-blue-100 mt-1">Step 4 of 4 - Upload required documents</p>
        </div>

        <div className="p-6">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Upload Progress</span>
              <span className="text-sm font-semibold text-blue-600">{uploadedCount}/{totalRequired} Uploaded</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(uploadedCount / totalRequired) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Please upload clear, readable copies of your documents. 
              Maximum file size: 2MB. Accepted formats: JPG, PNG.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uploadSections.map((section) => (
              <div key={section.id} className={`border-2 rounded-lg p-4 transition-all ${uploadedFiles[section.id] ? 'border-green-400 bg-green-50' : 'border-dashed border-gray-300 hover:border-blue-400'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <section.icon className={`h-5 w-5 ${uploadedFiles[section.id] ? 'text-green-500' : 'text-gray-500'}`} />
                    <label className="font-semibold text-gray-700">{section.title}</label>
                    {section.required && <span className="text-red-500 text-xs">*</span>}
                  </div>
                  {uploadedFiles[section.id] && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                
                <label className="cursor-pointer">
                  <div className={`rounded-lg p-4 text-center transition-colors ${uploadedFiles[section.id] ? 'bg-green-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${uploadedFiles[section.id] ? 'text-green-500' : 'text-gray-400'}`} />
                    <p className="text-sm text-gray-600 truncate">
                      {uploadedFiles[section.id] 
                        ? uploadedFiles[section.id].name 
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG (Max 2MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept={section.accept}
                    onChange={(e) => handleFileUpload(section.id, e.target.files[0])}
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !allFilesUploaded}
              className={`px-8 py-2 rounded-lg font-semibold transition-all flex items-center space-x-2 ${
                loading || !allFilesUploaded
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  
                  <span>Complete Registration</span>
                </>
              )}
            </button>
          </div>

          {/* Upload Status Message */}
          {!allFilesUploaded && (
            <div className="mt-4 text-center">
              <p className="text-sm text-orange-600">
                ⚠️ Please upload all {totalRequired} required documents to complete registration
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Success Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform animate-slideUp">
            <div className="text-center p-6">
              {/* Success Animation */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <ShieldCheck className="h-10 w-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Submitted!</h3>
              
              <div className="bg-blue-50 rounded-lg p-4 my-4">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-800 font-semibold">Waiting for Admin Approval</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Your application has been submitted successfully. Our admin team will review your documents and approve your registration within 24-48 hours.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Next Steps:</span>
                </p>
                <ul className="text-sm text-gray-500 mt-2 space-y-1">
                  <li>✓ Admin will verify your documents</li>
                  <li>✓ You'll receive email/SMS notification</li>
                  <li>✓ Login after approval confirmation</li>
                </ul>
              </div>
              
              <button
                onClick={handleClosePopup}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
}

export default Step4DocumentUpload;