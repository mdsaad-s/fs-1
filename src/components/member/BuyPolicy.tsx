import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Heart, 
  Users, 
  IndianRupee, 
  Clock, 
  CheckCircle, 
  XCircle,
  Upload,
  FileText,
  Calendar,
  AlertCircle,
  Loader2,
  CreditCard,
  Banknote,
  Image,
  FileCheck
} from "lucide-react";

interface Policy {
  id: string;
  name: string;
  type: string;
  description: string;
  minPremium: number;
  maxPremium: number;
  coverage: string;
  minTenure: number;
  maxTenure: number;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

interface PolicyRequest {
  id: string;
  memberId: string;
  memberName: string;
  policyId: string;
  policyName: string;
  premiumAmount: number;
  tenure: number;
  status: "pending" | "approved" | "rejected" | "payment_pending" | "payment_verified";
  requestedDate: string;
  approvedDate?: string;
  paymentProof?: string;
  paymentStatus?: "pending" | "submitted" | "verified";
}

const availablePolicies: Policy[] = [
  {
    id: "life",
    name: "Life Insurance",
    type: "Life",
    description: "Secure your family's financial future with comprehensive life coverage.",
    minPremium: 500,
    maxPremium: 50000,
    coverage: "Up to ₹1 Crore",
    minTenure: 10,
    maxTenure: 30,
    benefits: ["Death Benefit", "Maturity Benefit", "Tax Benefits", "Loan Facility"],
    icon: <Shield className="h-6 w-6" />,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "health",
    name: "Health Insurance",
    type: "Health",
    description: "Comprehensive health coverage for you and your family.",
    minPremium: 300,
    maxPremium: 25000,
    coverage: "Up to ₹25 Lakhs",
    minTenure: 1,
    maxTenure: 5,
    benefits: ["Cashless Treatment", "Preventive Care", "Wellness Benefits", "Tax Benefits"],
    icon: <Heart className="h-6 w-6" />,
    color: "from-green-500 to-green-600"
  },
  {
    id: "girls",
    name: "Girls Insurance",
    type: "Girls",
    description: "Special insurance plan for girls with lower premiums and higher benefits.",
    minPremium: 400,
    maxPremium: 30000,
    coverage: "Up to ₹50 Lakhs",
    minTenure: 15,
    maxTenure: 25,
    benefits: ["Education Benefit", "Marriage Benefit", "Scholarship", "Higher Coverage"],
    icon: <Users className="h-6 w-6" />,
    color: "from-purple-500 to-purple-600"
  }
];

const BuyPolicy = ({ memberData, onPolicyPurchased }: { memberData: any; onPolicyPurchased?: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [premiumAmount, setPremiumAmount] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "online">("bank");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [existingRequests, setExistingRequests] = useState<PolicyRequest[]>([]);

  useEffect(() => {
    loadExistingRequests();
  }, []);

  const loadExistingRequests = () => {
    const requests = JSON.parse(localStorage.getItem("policyRequests") || "[]");
    const memberRequests = requests.filter((r: PolicyRequest) => r.memberId === memberData?.userId);
    setExistingRequests(memberRequests);
  };

  const handlePolicySelect = (policy: Policy) => {
    setSelectedPolicy(policy);
    setPremiumAmount(policy.minPremium);
    setTenure(policy.minTenure);
    setStep(2);
  };

  const handleRequestSubmit = async () => {
    if (!selectedPolicy || !premiumAmount || !tenure) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    const newRequest: PolicyRequest = {
      id: Date.now().toString(),
      memberId: memberData?.userId || "DEMO001",
      memberName: memberData?.fullName || "Rajesh Kumar",
      policyId: selectedPolicy.id,
      policyName: selectedPolicy.name,
      premiumAmount: premiumAmount,
      tenure: tenure,
      status: "pending",
      requestedDate: new Date().toISOString()
    };

    const existingRequests = JSON.parse(localStorage.getItem("policyRequests") || "[]");
    existingRequests.push(newRequest);
    localStorage.setItem("policyRequests", JSON.stringify(existingRequests));

    setMessage("✅ Policy request submitted successfully! Waiting for admin approval.");
    setMessageType("success");
    setLoading(false);
    
    setTimeout(() => {
      setStep(3);
      loadExistingRequests();
      if (onPolicyPurchased) onPolicyPurchased();
    }, 2000);
  };

  const handlePaymentSubmit = async () => {
    if (!paymentProof) {
      setMessage("Please upload payment proof");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    const pendingRequest = existingRequests.find(r => r.status === "approved");
    if (pendingRequest) {
      const reader = new FileReader();
      reader.onloadend = () => {
        pendingRequest.paymentProof = reader.result as string;
        pendingRequest.paymentStatus = "submitted";
        pendingRequest.status = "payment_pending";
        
        const allRequests = JSON.parse(localStorage.getItem("policyRequests") || "[]");
        const updatedRequests = allRequests.map((r: PolicyRequest) => 
          r.id === pendingRequest.id ? pendingRequest : r
        );
        localStorage.setItem("policyRequests", JSON.stringify(updatedRequests));
        
        setMessage("✅ Payment proof submitted! Waiting for admin verification.");
        setMessageType("success");
        setShowPaymentModal(false);
        loadExistingRequests();
        setStep(4);
      };
      reader.readAsDataURL(paymentProof);
    }
    
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</span>;
      case "rejected":
        return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs flex items-center gap-1"><XCircle className="h-3 w-3" /> Rejected</span>;
      case "payment_pending":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center gap-1"><Clock className="h-3 w-3" /> Payment Pending</span>;
      case "payment_verified":
        return <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs flex items-center gap-1"><FileCheck className="h-3 w-3" /> Active</span>;
      default:
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</span>;
    }
  };

  const pendingApproval = existingRequests.find(r => r.status === "pending");
  const approvedRequest = existingRequests.find(r => r.status === "approved");
  const paymentPendingRequest = existingRequests.find(r => r.status === "payment_pending");
  const activePolicy = existingRequests.find(r => r.status === "payment_verified");

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center">
          <div className={`flex-1 text-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>1</div>
            <p className="text-xs mt-1">Select Policy</p>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex-1 text-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>2</div>
            <p className="text-xs mt-1">Submit Request</p>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex-1 text-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>3</div>
            <p className="text-xs mt-1">Admin Approval</p>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 4 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div className={`flex-1 text-center ${step >= 4 ? "text-blue-600" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>4</div>
            <p className="text-xs mt-1">Payment & Activate</p>
          </div>
        </div>
      </div>

      {/* Step 1: Select Policy */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer" onClick={() => handlePolicySelect(policy)}>
              <div className={`bg-gradient-to-r ${policy.color} p-4 text-white`}>
                <div className="flex justify-between items-center">
                  {policy.icon}
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{policy.type}</span>
                </div>
                <h3 className="text-xl font-bold mt-3">{policy.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">{policy.description}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm"><span className="text-gray-500">Coverage:</span> {policy.coverage}</p>
                  <p className="text-sm"><span className="text-gray-500">Premium:</span> ₹{policy.minPremium}/month - ₹{policy.maxPremium}/month</p>
                  <p className="text-sm"><span className="text-gray-500">Tenure:</span> {policy.minTenure}-{policy.maxTenure} years</p>
                </div>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
                  Select Policy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Customize Policy */}
      {step === 2 && selectedPolicy && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customize Your {selectedPolicy.name}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Premium Amount (₹/month)</label>
              <div className="flex items-center space-x-4">
                <IndianRupee className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min={selectedPolicy.minPremium}
                  max={selectedPolicy.maxPremium}
                  step={500}
                  value={premiumAmount}
                  onChange={(e) => setPremiumAmount(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="font-semibold text-blue-600">₹{premiumAmount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Range: ₹{selectedPolicy.minPremium} - ₹{selectedPolicy.maxPremium}/month</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure (Years)</label>
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <input
                  type="range"
                  min={selectedPolicy.minTenure}
                  max={selectedPolicy.maxTenure}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="font-semibold text-blue-600">{tenure} years</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Range: {selectedPolicy.minTenure} - {selectedPolicy.maxTenure} years</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Policy Summary</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Policy:</span> {selectedPolicy.name}</p>
                <p><span className="text-gray-500">Monthly Premium:</span> ₹{premiumAmount.toLocaleString()}</p>
                <p><span className="text-gray-500">Total Premium Payable:</span> ₹{(premiumAmount * 12 * tenure).toLocaleString()}</p>
                <p><span className="text-gray-500">Coverage:</span> {selectedPolicy.coverage}</p>
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-lg ${messageType === "success" ? "bg-green-100 text-green-600" : messageType === "error" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                {message}
              </div>
            )}

            <div className="flex space-x-3">
              <button onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Back</button>
              <button onClick={handleRequestSubmit} disabled={loading} className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50">
                {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 & 4: Request Status */}
      {(step === 3 || step === 4) && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Policy Requests</h2>
          
          {existingRequests.length === 0 && step === 3 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No policy requests yet</p>
              <button onClick={() => setStep(1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Buy New Policy</button>
            </div>
          )}

          {existingRequests.map((request) => (
            <div key={request.id} className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{request.policyName}</h3>
                  <p className="text-sm text-gray-500">Requested on: {new Date(request.requestedDate).toLocaleDateString()}</p>
                </div>
                {getStatusBadge(request.status)}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <p><span className="text-gray-500">Premium:</span> ₹{request.premiumAmount}/month</p>
                <p><span className="text-gray-500">Tenure:</span> {request.tenure} years</p>
              </div>

              {/* Payment Section for Approved Requests */}
              {request.status === "approved" && !showPaymentModal && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-green-600 text-sm mb-2">✓ Your request has been approved! Please complete payment to activate your policy.</p>
                  <button onClick={() => { setShowPaymentModal(true); setStep(4); }} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Make Payment</button>
                </div>
              )}

              {/* Payment Pending Section */}
              {request.status === "payment_pending" && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-yellow-600 text-sm">⏳ Payment proof submitted. Waiting for admin verification.</p>
                </div>
              )}

              {/* Active Policy Section */}
              {request.status === "payment_verified" && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-green-600 text-sm flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Policy is ACTIVE! You are now a verified member.</p>
                  <div className="mt-2 bg-green-50 p-2 rounded-lg">
                    <p className="text-xs text-green-700">Policy Number: POL-{request.id}</p>
                    <p className="text-xs text-green-700">Valid until: {new Date(new Date().setFullYear(new Date().getFullYear() + request.tenure)).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {!activePolicy && existingRequests.length > 0 && existingRequests.every(r => r.status !== "payment_verified") && (
            <button onClick={() => setStep(1)} className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">Request Another Policy</button>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Make Payment</h2>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Bank Details</p>
                <p className="font-mono text-sm">Bank: Fair Share Cooperative Bank</p>
                <p className="font-mono text-sm">Account No: 1234567890</p>
                <p className="font-mono text-sm">IFSC: FSFC000123</p>
                <p className="font-mono text-sm">UPI ID: fairshare@fsbank</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <div className="flex space-x-3">
                  <button onClick={() => setPaymentMethod("bank")} className={`flex-1 py-2 border rounded-lg flex items-center justify-center space-x-2 ${paymentMethod === "bank" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300"}`}>
                    <Banknote className="h-4 w-4" /> <span>Bank Transfer</span>
                  </button>
                  <button onClick={() => setPaymentMethod("online")} className={`flex-1 py-2 border rounded-lg flex items-center justify-center space-x-2 ${paymentMethod === "online" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-300"}`}>
                    <CreditCard className="h-4 w-4" /> <span>Online</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Payment Proof (Screenshot/PDF)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors" onClick={() => document.getElementById("paymentProof")?.click()}>
                  {paymentProof ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Image className="h-8 w-8 text-green-500" />
                      <p className="text-sm text-gray-600">{paymentProof.name}</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload payment proof</p>
                      <p className="text-xs text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
                    </>
                  )}
                  <input type="file" id="paymentProof" className="hidden" accept="image/*,application/pdf" onChange={(e) => setPaymentProof(e.target.files?.[0] || null)} />
                </div>
              </div>

              {message && <div className={`p-2 rounded-lg text-sm ${messageType === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{message}</div>}

              <button onClick={handlePaymentSubmit} disabled={loading} className="w-full py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium disabled:opacity-50">
                {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Submit Payment Proof"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPolicy;