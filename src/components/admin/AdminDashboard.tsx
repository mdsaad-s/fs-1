import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, Users, CheckCircle, FileText, LogOut, 
  Shield, UserCheck, Clock, DollarSign, TrendingUp, 
  Search, Eye, XCircle, Download, Bell, Menu, User,
  Mail, Phone, MapPin, Calendar, IndianRupee, Heart,
  Activity, Home, Smartphone, CreditCard, AlertCircle,
  Plus, Filter, ChevronDown, ChevronRight, Star, Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [policyRequests, setPolicyRequests] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [newClaim, setNewClaim] = useState({
    memberName: "",
    memberId: "",
    claimType: "",
    amount: "",
    description: "",
  });
  const navigate = useNavigate();

  // Initialize demo member data
  const getInitialDemoMember = () => {
    return {
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
    };
  };

  // Load data from localStorage or initialize with demo data
  useEffect(() => {
    loadData();
    loadPolicyRequests();
  }, []);

  const loadData = () => {
    let registrations = JSON.parse(localStorage.getItem("registrations") || "[]");
    const savedClaims = JSON.parse(localStorage.getItem("claims") || "[]");
    
    // If no registrations exist, add demo member
    if (registrations.length === 0) {
      registrations = [getInitialDemoMember()];
      localStorage.setItem("registrations", JSON.stringify(registrations));
    }
    
    setMembers(registrations);
    setClaims(savedClaims);
  };

  const loadPolicyRequests = () => {
    const requests = JSON.parse(localStorage.getItem("policyRequests") || "[]");
    setPolicyRequests(requests);
  };

  const saveData = (registrations: any[], claimsData: any[]) => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
    localStorage.setItem("claims", JSON.stringify(claimsData));
    setMembers(registrations);
    setClaims(claimsData);
  };

  // Stats calculations
  const stats = {
    totalMembers: members.filter(m => m.status === "active").length,
    pendingApprovals: members.filter(m => m.status === "pending").length,
    activeMembers: members.filter(m => m.status === "active").length,
    rejectedMembers: members.filter(m => m.status === "rejected").length,
    totalClaims: claims.length,
    pendingClaims: claims.filter(c => c.status === "pending").length,
    approvedClaims: claims.filter(c => c.status === "approved").length,
    rejectedClaims: claims.filter(c => c.status === "rejected").length,
    totalPremiumCollected: members.reduce((sum, m) => sum + (m.premiumAmount || 0), 0),
  };

  // Member functions
  const handleApproveMember = (member: any) => {
    const updated = members.map(m =>
      m.userId === member.userId ? { ...m, status: "active", approvedAt: new Date().toISOString() } : m
    );
    saveData(updated, claims);
    alert(`✅ ${member.fullName} has been approved!`);
  };

  const handleRejectMember = (member: any) => {
    if (window.confirm(`Reject ${member.fullName}?`)) {
      const updated = members.map(m =>
        m.userId === member.userId ? { ...m, status: "rejected", rejectedAt: new Date().toISOString() } : m
      );
      saveData(updated, claims);
      alert(`❌ ${member.fullName} has been rejected.`);
    }
  };

  // Claim functions
  const handleApproveClaim = (claim: any) => {
    const updated = claims.map(c =>
      c.id === claim.id ? { ...c, status: "approved", approvedAt: new Date().toISOString() } : c
    );
    saveData(members, updated);
    alert(`✅ Claim #${claim.id} approved!`);
  };

  const handleRejectClaim = (claim: any) => {
    if (window.confirm(`Reject claim #${claim.id}?`)) {
      const updated = claims.map(c =>
        c.id === claim.id ? { ...c, status: "rejected", rejectedAt: new Date().toISOString() } : c
      );
      saveData(members, updated);
      alert(`❌ Claim #${claim.id} rejected.`);
    }
  };

  const handleAddClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const newClaimObj = {
      id: Date.now(),
      ...newClaim,
      amount: parseFloat(newClaim.amount),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const updated = [...claims, newClaimObj];
    saveData(members, updated);
    setNewClaim({ memberName: "", memberId: "", claimType: "", amount: "", description: "" });
    alert("✅ Claim submitted successfully!");
  };

  // Policy Request functions
  const handleApprovePolicy = (request: any) => {
    const updated = policyRequests.map((r: any) =>
      r.id === request.id ? { ...r, status: "approved", approvedDate: new Date().toISOString() } : r
    );
    localStorage.setItem("policyRequests", JSON.stringify(updated));
    setPolicyRequests(updated);
    alert(`✅ Policy request #${request.id} approved! Member can now make payment.`);
  };

  const handleRejectPolicy = (request: any) => {
    if (window.confirm(`Reject policy request #${request.id}?`)) {
      const updated = policyRequests.map((r: any) =>
        r.id === request.id ? { ...r, status: "rejected" } : r
      );
      localStorage.setItem("policyRequests", JSON.stringify(updated));
      setPolicyRequests(updated);
      alert(`❌ Policy request #${request.id} rejected.`);
    }
  };

  const handleVerifyPayment = (request: any) => {
    if (window.confirm(`Verify payment for policy #${request.id}?`)) {
      const updated = policyRequests.map((r: any) =>
        r.id === request.id ? { ...r, status: "payment_verified", paymentStatus: "verified" } : r
      );
      localStorage.setItem("policyRequests", JSON.stringify(updated));
      setPolicyRequests(updated);
      alert(`✅ Payment verified! Policy #${request.id} is now ACTIVE.`);
    }
  };

  // ✅ Fixed Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Mobile", "Status", "Premium", "Joined"];
    const csvData = filteredMembers.map(m => [
      m.fullName, m.email, m.mobile, m.status, m.premiumAmount,
      new Date(m.timestamp).toLocaleDateString()
    ]);
    const csv = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredMembers = members.filter(m =>
    m.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mobile?.includes(searchTerm)
  );

  const pendingMembers = members.filter(m => m.status === "pending");
  const pendingClaimsList = claims.filter(c => c.status === "pending");
  const pendingPolicyCount = policyRequests.filter(r => r.status === "pending" || r.status === "payment_pending").length;

  const statCards = [
    { title: "Total Members", value: stats.totalMembers, icon: Users, color: "blue", change: "+12%" },
    { title: "Pending Approvals", value: stats.pendingApprovals, icon: Clock, color: "yellow", change: `${stats.pendingApprovals} waiting` },
    { title: "Active Members", value: stats.activeMembers, icon: UserCheck, color: "green", change: "+8%" },
    { title: "Premium Collected", value: `₹${(stats.totalPremiumCollected / 100000).toFixed(1)}L`, icon: DollarSign, color: "purple", change: "+23%" },
    { title: "Total Claims", value: stats.totalClaims, icon: FileText, color: "orange", change: `${stats.pendingClaims} pending` },
    { title: "Approved Claims", value: stats.approvedClaims, icon: TrendingUp, color: "emerald", change: "85% success" },
  ];

  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard, color: "blue" },
    { id: "members", label: "All Members", icon: Users, color: "green" },
    { id: "approvals", label: "Pending Approvals", icon: CheckCircle, color: "yellow", badge: pendingMembers.length },
    { id: "claims", label: "Claims", icon: FileText, color: "purple", badge: pendingClaimsList.length },
    { id: "policy-requests", label: "Policy Requests", icon: FileText, color: "indigo", badge: pendingPolicyCount },
  ];

  // Demo member credentials info
  const demoMemberInfo = {
    email: "rajesh@fairshare.com",
    password: "demo123",
    memberId: "FS-M-1001"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-500 text-white">
      {/* Floating Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float-delay"></div>
      </div>

      

      {/* Sidebar */}
      <div className={`fixed left-0 top-10 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl transition-all duration-300 z-20 ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-4 border-b border-gray-700 mt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            {isSidebarOpen && (
              <div>
                <h1 className="text-white font-bold text-lg">Fair Share</h1>
                <p className="text-gray-400 text-xs">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/50"
              } ${!isSidebarOpen && "justify-center"}`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </div>
              {isSidebarOpen && item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* ✅ Logout Button - Now properly positioned and functional */}
        <button
          onClick={handleLogout}
          className={`absolute bottom-12 left-0 right-0 mx-4 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all flex items-center space-x-3 ${!isSidebarOpen ? "justify-center" : ""}`}
        >
          <LogOut className="h-5 w-5" />
          {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 mt-10 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-10 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none focus:outline-none ml-2 text-sm w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {(pendingMembers.length + pendingClaimsList.length + pendingPolicyCount) > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Super Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Dashboard Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Demo Member Info Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div>

                    </div>
                  </div>
                  <div className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
                  
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {statCards.map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${card.color}-50 rounded-xl`}>
                        <card.icon className={`h-6 w-6 text-${card.color}-600`} />
                      </div>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {card.change}
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Members */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Recent Members</h2>
                  </div>
                  <div className="p-4">
                    {members.slice(0, 5).map((member) => (
                      <div key={member.userId} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.fullName}</p>
                            <p className="text-xs text-gray-500">{member.email}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "active" ? "bg-green-100 text-green-700" :
                          member.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {member.status?.toUpperCase() || "PENDING"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Claims */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Recent Claims</h2>
                  </div>
                  <div className="p-4">
                    {claims.slice(0, 5).map((claim) => (
                      <div key={claim.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">{claim.memberName}</p>
                          <p className="text-xs text-gray-500">₹{claim.amount} - {claim.claimType}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          claim.status === "approved" ? "bg-green-100 text-green-700" :
                          claim.status === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Members List */}
          {activeTab === "members" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">All Members</h2>
                  <p className="text-green-100 mt-1">Total: {filteredMembers.length} members</p>
                </div>
                <button onClick={exportToCSV} className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export CSV</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Member</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Contact</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Premium</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Joined</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr key={member.userId} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{member.fullName}</p>
                              <p className="text-xs text-gray-500">ID: {member.userId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-xs text-gray-500">{member.mobile}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">₹{member.premiumAmount}/mo</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "active" ? "bg-green-100 text-green-700" :
                            member.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {member.status?.toUpperCase() || "PENDING"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(member.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => setSelectedMember(member)} className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="h-4 w-4 text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Approvals */}
          {activeTab === "approvals" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Member Approvals</h2>
                <p className="text-yellow-100 mt-1">{pendingMembers.length} members waiting for approval</p>
              </div>
              <div className="p-6">
                {pendingMembers.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">No Pending Approvals</h3>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingMembers.map((member) => (
                      <div key={member.userId} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{member.fullName}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-sm text-gray-500 flex items-center"><Mail className="h-3 w-3 mr-1" /> {member.email}</span>
                                <span className="text-sm text-gray-500 flex items-center"><Phone className="h-3 w-3 mr-1" /> {member.mobile}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button onClick={() => handleApproveMember(member)} className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4" /> <span>Approve</span>
                            </button>
                            <button onClick={() => handleRejectMember(member)} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center space-x-1">
                              <XCircle className="h-4 w-4" /> <span>Reject</span>
                            </button>
                            <button onClick={() => setSelectedMember(member)} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Claims Management */}
          {activeTab === "claims" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div><p className="text-gray-500 text-sm">Total Claims</p><p className="text-2xl font-bold">{stats.totalClaims}</p></div>
                    <FileText className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div><p className="text-gray-500 text-sm">Pending</p><p className="text-2xl font-bold text-yellow-600">{stats.pendingClaims}</p></div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div><p className="text-gray-500 text-sm">Approved</p><p className="text-2xl font-bold text-green-600">{stats.approvedClaims}</p></div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div><p className="text-gray-500 text-sm">Rejected</p><p className="text-2xl font-bold text-red-600">{stats.rejectedClaims}</p></div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </div>
              </div>

              {/* New Claim Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Submit New Claim</h3>
                <form onSubmit={handleAddClaim} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Member Name" value={newClaim.memberName} onChange={(e) => setNewClaim({...newClaim, memberName: e.target.value})} className="px-4 py-2 border rounded-lg" required />
                  <input type="text" placeholder="Member ID" value={newClaim.memberId} onChange={(e) => setNewClaim({...newClaim, memberId: e.target.value})} className="px-4 py-2 border rounded-lg" required />
                  <select value={newClaim.claimType} onChange={(e) => setNewClaim({...newClaim, claimType: e.target.value})} className="px-4 py-2 border rounded-lg" required>
                    <option value="">Select Claim Type</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Accident">Accident</option>
                  </select>
                  <input type="number" placeholder="Claim Amount" value={newClaim.amount} onChange={(e) => setNewClaim({...newClaim, amount: e.target.value})} className="px-4 py-2 border rounded-lg" required />
                  <textarea placeholder="Description" value={newClaim.description} onChange={(e) => setNewClaim({...newClaim, description: e.target.value})} className="px-4 py-2 border rounded-lg md:col-span-2" rows={3} required />
                  <button type="submit" className="md:col-span-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg">Submit Claim</button>
                </form>
              </div>

              {/* Claims List */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">All Claims</h2>
                </div>
                <div className="p-6">
                  {claims.map((claim) => (
                    <div key={claim.id} className="border border-gray-200 rounded-xl p-4 mb-4 hover:shadow-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{claim.memberName}</h3>
                          <p className="text-sm text-gray-500">#{claim.id} - {claim.claimType}</p>
                          <p className="text-lg font-bold text-gray-800 mt-1">₹{claim.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-600 mt-1">{claim.description}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            claim.status === "approved" ? "bg-green-100 text-green-700" :
                            claim.status === "rejected" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {claim.status.toUpperCase()}
                          </span>
                          {claim.status === "pending" && (
                            <div className="flex space-x-2 mt-2">
                              <button onClick={() => handleApproveClaim(claim)} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleRejectClaim(claim)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Policy Requests */}
          {activeTab === "policy-requests" && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white">Policy Requests</h2>
                <p className="text-indigo-100 mt-1">{pendingPolicyCount} requests pending action</p>
              </div>
              <div className="p-6">
                {policyRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">No Policy Requests</h3>
                    <p className="text-gray-500 mt-2">Members haven't submitted any policy requests yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {policyRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{request.memberName}</h3>
                                <p className="text-xs text-gray-500">Member ID: {request.memberId}</p>
                              </div>
                            </div>
                            <div className="ml-13 space-y-1">
                              <p className="text-sm"><span className="font-medium text-gray-700">Policy:</span> {request.policyName}</p>
                              <p className="text-sm"><span className="font-medium text-gray-700">Premium:</span> ₹{request.premiumAmount}/month</p>
                              <p className="text-sm"><span className="font-medium text-gray-700">Tenure:</span> {request.tenure} years</p>
                              <p className="text-sm"><span className="font-medium text-gray-700">Requested on:</span> {new Date(request.requestedDate).toLocaleDateString()}</p>
                              {request.paymentProof && (
                                <div className="mt-2">
                                  <a href={request.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
                                    <FileText className="h-3 w-3" /> View Payment Proof
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                              request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              request.status === "approved" ? "bg-green-100 text-green-700" :
                              request.status === "payment_pending" ? "bg-blue-100 text-blue-700" :
                              request.status === "payment_verified" ? "bg-emerald-100 text-emerald-700" :
                              "bg-red-100 text-red-700"
                            }`}>
                              {request.status === "payment_pending" ? "Payment Submitted" : 
                               request.status === "payment_verified" ? "Active" : 
                               request.status?.toUpperCase()}
                            </span>
                            
                            {request.status === "pending" && (
                              <div className="flex space-x-2 mt-2">
                                <button onClick={() => handleApprovePolicy(request)} className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                                  <CheckCircle className="h-3 w-3 inline mr-1" /> Approve
                                </button>
                                <button onClick={() => handleRejectPolicy(request)} className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors">
                                  <XCircle className="h-3 w-3 inline mr-1" /> Reject
                                </button>
                              </div>
                            )}
                            
                            {request.status === "payment_pending" && (
                              <button onClick={() => handleVerifyPayment(request)} className="mt-2 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors">
                                <CheckCircle className="h-3 w-3 inline mr-1" /> Verify Payment
                              </button>
                            )}
                            
                            {request.status === "approved" && (
                              <p className="text-xs text-green-600 mt-2">⏳ Waiting for member payment</p>
                            )}
                            
                            {request.status === "payment_verified" && (
                              <p className="text-xs text-emerald-600 mt-2">✅ Policy Active</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Member Details</h3>
            <div className="space-y-3">
              <p><strong>Full Name:</strong> {selectedMember.fullName}</p>
              <p><strong>Email:</strong> {selectedMember.email}</p>
              <p><strong>Mobile:</strong> {selectedMember.mobile}</p>
              <p><strong>ID Type:</strong> {selectedMember.idType}</p>
              <p><strong>ID Number:</strong> {selectedMember.idNumber}</p>
              <p><strong>Date of Birth:</strong> {selectedMember.dateOfBirth}</p>
              <p><strong>Address:</strong> {selectedMember.address}, {selectedMember.city}, {selectedMember.pincode}</p>
              <p><strong>Premium Amount:</strong> ₹{selectedMember.premiumAmount}/month</p>
              <p><strong>Tenure:</strong> {selectedMember.tenure} months</p>
              <p><strong>Status:</strong> {selectedMember.status}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setSelectedMember(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default AdminDashboard;