import React, { useState, useEffect } from "react";
import { 
  User, 
  FileText, 
  Wallet, 
  Shield, 
  Edit, 
  LogOut, 
  Home,
  Bell,
  Settings,
  Menu,
  X,
  ChevronRight,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  IndianRupee,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  ShoppingCart,
  Upload,
  Calendar as CalendarIcon,
  AlertTriangle,
  Check,
  ArrowLeft,
  PieChart,
  Percent,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BuyPolicy from "./BuyPolicy";

interface MemberData {
  id: string;
  userId: string;
  memberId: string;
  fullName: string;
  email: string;
  mobile: string;
  photo?: string;
  joinDate: string;
  status: string;
  premiumAmount: number;
  tenure: number;
  totalContributions: number;
  activePolicies: number;
  claimsFiled: number;
  claimsApproved: number;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  pincode?: string;
  state?: string;
  country?: string;
  nomineeName?: string;
  nomineeRelation?: string;
}

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMemberData();
  }, []);

  const loadMemberData = () => {
    try {
      const userStr = localStorage.getItem("user");
      console.log("User from localStorage:", userStr);
      
      if (userStr) {
        const user = JSON.parse(userStr);
        
        const totalContributions = (user.premiumAmount || 1500) * (user.month || 4);
        
        setMemberData({
          id: user.userId || user.id || "DEMO001",
          userId: user.userId || user.id || "DEMO001",
          memberId: user.memberId || "FS-M-1001",
          fullName: user.fullName || "Rajesh Kumar",
          email: user.email || "rajesh@fairshare.com",
          mobile: user.mobile || "9876543210",
          joinDate: user.timestamp ? new Date(user.timestamp).toLocaleDateString() : "2026-01-15",
          status: user.status || "active",
          totalContributions: totalContributions,
          activePolicies: 1,
          claimsFiled: 0,
          claimsApproved: 0,
          premiumAmount: user.premiumAmount || 1500,
          tenure: user.tenure || 12,
          dateOfBirth: user.dateOfBirth || "1990-01-15",
          address: user.address || "123, Main Street",
          city: user.city || "Hyderabad",
          pincode: user.pincode || "500001",
          state: user.state || "Telangana",
          country: user.country || "India",
          nomineeName: user.nomineeName || "Sita Kumari",
          nomineeRelation: user.nomineeRelation || "Spouse"
        });
      } else {
        setMemberData({
          id: "DEMO001",
          userId: "DEMO001",
          memberId: "FS-M-1001",
          fullName: "Rajesh Kumar",
          email: "rajesh@fairshare.com",
          mobile: "9876543210",
          joinDate: "2024-01-15",
          status: "active",
          totalContributions: 18000,
          activePolicies: 1,
          claimsFiled: 0,
          claimsApproved: 0,
          premiumAmount: 1500,
          tenure: 12,
          dateOfBirth: "1990-01-15",
          address: "123, Main Street",
          city: "Hyderabad",
          pincode: "500001",
          state: "Telangana",
          country: "India",
          nomineeName: "Sita Kumari",
          nomineeRelation: "Spouse"
        });
      }
    } catch (error) {
      console.error("Error loading member data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberData = (updatedData: Partial<MemberData>) => {
    if (memberData) {
      const newData = { ...memberData, ...updatedData };
      setMemberData(newData);
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("memberId");
    localStorage.removeItem("memberEmail");
    localStorage.removeItem("memberName");
    navigate("/member/login");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "My Profile", icon: User },
    { id: "policies", label: "My Policies", icon: Shield },
    { id: "buy-policy", label: "Buy Policy", icon: ShoppingCart },
    { id: "contributions", label: "Contributions", icon: Wallet },
    { id: "profit-distribution", label: "Profit Distribution", icon: PieChart },
    { id: "claims", label: "Claims", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview memberData={memberData} setActiveTab={setActiveTab} />;
      case "profile":
        return <ProfileSection memberData={memberData} onUpdate={updateMemberData} />;
      case "policies":
        return <PoliciesSection memberData={memberData} />;
      case "buy-policy":
        return <BuyPolicy memberData={memberData} onPolicyPurchased={loadMemberData} />;
      case "contributions":
        return <ContributionsSection memberData={memberData} />;
      case "profit-distribution":
        return <ProfitDistribution memberData={memberData} />;
      case "claims":
        return <ClaimsSection memberData={memberData} setActiveTab={setActiveTab} />;
      case "raise-claim":
        return <RaiseClaim memberData={memberData} setActiveTab={setActiveTab} />;
      default:
        return <DashboardOverview memberData={memberData} setActiveTab={setActiveTab} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-500 to-indigo-100">
      {/* Top Navbar - FIXED LEFT ALIGNMENT */}
      <nav className="bg-gradient-to-r from-gray-900 to-indigo-500 shadow-lg fixed w-full z-20 top-0 border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:text-white p-2 rounded-lg hover:bg-white/10"
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center space-x-3 ml-0">
                <Shield className="h-8 w-8 text-white" />
                <span className="text-white font-bold text-xl">Member Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-blue-200 transition relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-white text-sm font-medium">{memberData?.fullName}</p>
                  <p className="text-blue-200 text-xs">ID: {memberData?.memberId}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-10 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{memberData?.fullName}</p>
              <p className="text-xs text-gray-500">Member since {memberData?.joinDate}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 pt-16 transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""}`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ memberData, setActiveTab }: { memberData: MemberData | null; setActiveTab: (tab: string) => void }) => {
  const stats = [
    { label: "Total Contributions", value: `₹${memberData?.totalContributions?.toLocaleString() || 0}`, icon: Wallet, color: "from-blue-500 to-indigo-600" },
    { label: "Active Policies", value: memberData?.activePolicies || 0, icon: Shield, color: "from-green-500 to-green-600" },
    { label: "Monthly Premium", value: `₹${memberData?.premiumAmount || 0}`, icon: IndianRupee, color: "from-purple-500 to-purple-600" },
    { label: "Claims Filed", value: memberData?.claimsFiled || 0, icon: FileText, color: "from-orange-500 to-orange-600" },
  ];

  const recentActivities = [
    { title: "Welcome to Fair Share", description: "Your membership has been activated", date: "Just now", status: "completed", icon: CheckCircle },
    { title: "First Premium Payment", description: "Monthly premium of ₹1,500 paid", date: "Today", status: "completed", icon: CheckCircle },
    { title: "Policy Active", description: "Your Life Insurance policy is active", date: "Today", status: "active", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold text-left">Welcome back, {memberData?.fullName}!</h1>
        <p className="text-blue-100 mt-1 text-left">Here's what's happening with your insurance portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm text-left">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1 text-left">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-left">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab("raise-claim")}
            className="flex items-center justify-center space-x-3 py-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Activity className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-700">Raise Claim</span>
          </button>
          <button className="flex items-center justify-center space-x-3 py-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <IndianRupee className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-gray-700">Pay Premium</span>
          </button>
          <button 
            onClick={() => setActiveTab("profit-distribution")}
            className="flex items-center justify-center space-x-3 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <PieChart className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-700">View Profit</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 text-left">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  activity.status === "completed" ? "bg-green-100" : "bg-blue-100"
                }`}>
                  <activity.icon className={`h-5 w-5 ${
                    activity.status === "completed" ? "text-green-600" : "text-blue-600"
                  }`} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800 text-left">{activity.title}</p>
                  <p className="text-sm text-gray-500 text-left">{activity.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{activity.date}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Profit Distribution Component
const ProfitDistribution = ({ memberData }: { memberData: MemberData | null }) => {
  const [year, setYear] = useState("2026");
  const [fundPool, setFundPool] = useState(500000);
  const [investmentReturn, setInvestmentReturn] = useState(12);
  const [expenses, setExpenses] = useState(150000);
  const [showCalculator, setShowCalculator] = useState(false);
  
  const investedAmount = fundPool * 0.2;
  const nonInvestedAmount = fundPool * 0.8;
  const investmentProfit = (investedAmount * investmentReturn) / 100;
  const totalProfit = investmentProfit - expenses;
  const isProfit = totalProfit > 0;
  const totalPremiumCollected = 250000;
  const memberPremiumAmount = memberData?.premiumAmount || 1500;
  const memberProfitShare = isProfit ? (totalProfit * (memberPremiumAmount / totalPremiumCollected)) : 0;
  const memberLossShare = !isProfit ? Math.abs(totalProfit * (memberPremiumAmount / totalPremiumCollected)) : 0;

  const years = ["2024", "2025", "2026", "2027"];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <PieChart className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Profit Distribution</h1>
        </div>
        <p className="text-purple-100 mt-1">Fair and transparent profit sharing based on your premium contribution</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-gray-700">Financial Year:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}-{parseInt(y)+1}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Customize Calculation</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Investment Policy</h3>
            <p className="text-sm text-gray-600 mt-1">
              FairShare invests only 20% of the fund pool in business ventures. 
              The remaining 80% is kept as reserves for claims and operational security.
              Profit/Loss is calculated based on investment returns minus annual expenses.
            </p>
          </div>
        </div>
      </div>

      {showCalculator && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">Calculation Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Total Fund Pool (₹)</label>
              <input
                type="number"
                value={fundPool}
                onChange={(e) => setFundPool(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1 text-left">Total amount after expenses</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Investment Return (%)</label>
              <input
                type="number"
                value={investmentReturn}
                onChange={(e) => setInvestmentReturn(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1 text-left">Expected return on invested amount</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Total Expenses (₹)</label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-1 text-left">Operational and claim expenses</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center text-left">
            <Percent className="h-5 w-5 mr-2 text-blue-600" />
            Fund Allocation
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Total Fund Pool</span>
              <span className="font-semibold">₹{fundPool.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Invested Amount (20%)</span>
              <span className="font-semibold text-green-600">₹{investedAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Reserve Amount (80%)</span>
              <span className="font-semibold text-blue-600">₹{nonInvestedAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Invested 20%</span>
            <span>Reserves 80%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center text-left">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            Investment Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Invested Amount</span>
              <span className="font-semibold">₹{investedAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Investment Return ({investmentReturn}%)</span>
              <span className="font-semibold text-green-600">+₹{investmentProfit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 text-left">Total Expenses</span>
              <span className="font-semibold text-red-600">-₹{expenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold text-gray-800 text-left">Net {isProfit ? 'Profit' : 'Loss'}</span>
              <span className={`font-bold text-lg ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : '-'}₹{Math.abs(totalProfit).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-md overflow-hidden ${isProfit ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'}`}>
        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-4 text-left">
            {isProfit ? 'Your Profit Share' : 'Your Share of Loss'}
          </h3>
          
          <div className="bg-white/10 rounded-lg p-4 mb-4">
            <p className="text-sm opacity-90 mb-2 text-left">Distribution Formula:</p>
            <p className="font-mono text-sm text-left">
              Your Share = {isProfit ? 'Profit' : 'Loss'} × (Your Premium / Total Premium Collected)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs opacity-80 text-left">Your Monthly Premium</p>
              <p className="text-2xl font-bold text-left">₹{memberPremiumAmount}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs opacity-80 text-left">Total Premium Collected</p>
              <p className="text-2xl font-bold text-left">₹{totalPremiumCollected.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-xs opacity-80 text-left">Your Contribution Ratio</p>
              <p className="text-2xl font-bold text-left">
                {((memberPremiumAmount / totalPremiumCollected) * 100).toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="text-center py-4 border-t border-white/20">
            <p className="text-sm opacity-80 mb-2 text-left">
              {isProfit ? 'Your Annual Profit Distribution:' : 'Your Contribution to Loss:'}
            </p>
            <p className={`text-4xl font-bold ${isProfit ? 'text-yellow-300' : 'text-orange-200'}`}>
              {isProfit ? '+' : '-'}₹{isProfit ? memberProfitShare.toLocaleString() : memberLossShare.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Important Notes:</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
              <li>Profit distribution is calculated annually based on actual investment returns</li>
              <li>Only 20% of the fund pool is invested; 80% is kept as reserves for claims</li>
              <li>Your share is proportional to your premium contribution</li>
              <li>In case of loss, it will be adjusted from future profits as per cooperative principles</li>
              <li>Distribution is subject to approval by the Board of Directors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Raise Claim Component
const RaiseClaim = ({ memberData, setActiveTab }: { memberData: MemberData | null; setActiveTab: (tab: string) => void }) => {
  const [claimData, setClaimData] = useState({
    claimType: "",
    reason: "",
    expectedDays: "",
    amount: "",
    hospitalName: "",
    doctorName: "",
    treatmentDate: "",
    description: ""
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const claimTypes = [
    { value: "health", label: "Health/Medical Claim" },
    { value: "life", label: "Life Insurance Claim" },
    { value: "accident", label: "Accident Claim" },
    { value: "critical", label: "Critical Illness Claim" },
    { value: "maternity", label: "Maternity Claim" },
    { value: "other", label: "Other" }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!claimData.claimType) newErrors.claimType = "Please select claim type";
    if (!claimData.reason) newErrors.reason = "Please provide reason for claim";
    if (!claimData.expectedDays) newErrors.expectedDays = "Please specify expected days";
    if (!claimData.amount || isNaN(Number(claimData.amount)) || Number(claimData.amount) <= 0) {
      newErrors.amount = "Please enter valid claim amount";
    }
    if (!claimData.description) newErrors.description = "Please provide detailed description";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    setTimeout(() => {
      console.log("Claim submitted:", { claimData, selectedFiles });
      setSubmitted(true);
      setSubmitting(false);
      
      setTimeout(() => {
        setActiveTab("claims");
      }, 2000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Claim Request Submitted!</h2>
        <p className="text-gray-600 mb-4">Your claim request has been sent to admin for review.</p>
        <p className="text-sm text-gray-500">Claim Reference: CLM-{Date.now()}</p>
        <button 
          onClick={() => setActiveTab("claims")}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg"
        >
          Back to Claims
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-indigo-500 px-6 py-4">
          <button 
            onClick={() => setActiveTab("claims")}
            className="text-white hover:text-blue-200 transition flex items-center space-x-2 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Claims</span>
          </button>
          <h2 className="text-2xl font-bold text-white">Raise a Claim</h2>
          <p className="text-blue-100 mt-1">Submit your insurance claim request</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Member Information</p>
                <p className="text-sm text-gray-600">Name: {memberData?.fullName}</p>
                <p className="text-sm text-gray-600">Member ID: {memberData?.memberId}</p>
                <p className="text-sm text-gray-600">Policy: Life Insurance (Active)</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Claim Type <span className="text-red-500">*</span>
            </label>
            <select
              value={claimData.claimType}
              onChange={(e) => setClaimData({...claimData, claimType: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-left ${
                errors.claimType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select claim type</option>
              {claimTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            {errors.claimType && <p className="text-red-500 text-xs mt-1">{errors.claimType}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Reason for Claim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={claimData.reason}
              onChange={(e) => setClaimData({...claimData, reason: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Hospitalization, Surgery, Accident, etc."
            />
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Expected Recovery/Claim Days <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={claimData.expectedDays}
                  onChange={(e) => setClaimData({...claimData, expectedDays: e.target.value})}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.expectedDays ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Number of days"
                />
              </div>
              {errors.expectedDays && <p className="text-red-500 text-xs mt-1">{errors.expectedDays}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Claim Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="number"
                  value={claimData.amount}
                  onChange={(e) => setClaimData({...claimData, amount: e.target.value})}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Amount claimed"
                />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Hospital/Clinic Name
              </label>
              <input
                type="text"
                value={claimData.hospitalName}
                onChange={(e) => setClaimData({...claimData, hospitalName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Name of hospital/clinic"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                Attending Doctor Name
              </label>
              <input
                type="text"
                value={claimData.doctorName}
                onChange={(e) => setClaimData({...claimData, doctorName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Doctor's full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Treatment/Hospitalization Date
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={claimData.treatmentDate}
                onChange={(e) => setClaimData({...claimData, treatmentDate: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={claimData.description}
              onChange={(e) => setClaimData({...claimData, description: e.target.value})}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please provide detailed description of the incident, diagnosis, treatment received, etc."
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              Upload Supporting Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">Health reports, medical certificates, bills, prescriptions (PDF, JPG, PNG)</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm"
              >
                Select Files
              </label>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-semibold text-gray-700 text-left">Uploaded Files:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm text-gray-600 text-left">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Declaration</p>
                <p className="text-sm text-gray-600">
                  I hereby declare that all the information provided is true and correct to the best of my knowledge. 
                  I understand that providing false information may lead to rejection of claim and termination of policy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setActiveTab("claims")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  <span>Submit Claim Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Section Component
const ProfileSection = ({ memberData, onUpdate }: { memberData: MemberData | null; onUpdate: (data: Partial<MemberData>) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    nomineeName: "",
    nomineeRelation: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (memberData) {
      setEditForm({
        fullName: memberData.fullName || "",
        email: memberData.email || "",
        mobile: memberData.mobile || "",
        address: memberData.address || "",
        city: memberData.city || "",
        pincode: memberData.pincode || "",
        state: memberData.state || "",
        nomineeName: memberData.nomineeName || "",
        nomineeRelation: memberData.nomineeRelation || ""
      });
    }
  }, [memberData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!editForm.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!editForm.email.trim()) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) newErrors.email = "Valid email is required";
    if (!editForm.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!/^[0-9]{10}$/.test(editForm.mobile)) newErrors.mobile = "10-digit mobile number required";
    if (!editForm.address.trim()) newErrors.address = "Address is required";
    if (!editForm.city.trim()) newErrors.city = "City is required";
    if (!editForm.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!/^[0-9]{6}$/.test(editForm.pincode)) newErrors.pincode = "6-digit pincode required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    setTimeout(() => {
      onUpdate(editForm);
      setIsEditing(false);
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("All password fields are required");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setPasswordSuccess("Password changed successfully!");
      setPasswordError("");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setSaving(false);
      setTimeout(() => setPasswordSuccess(""), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-300 h-24"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="md:ml-4 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl font-bold text-gray-800">{memberData?.fullName}</h1>
              <p className="text-gray-500">Member since {memberData?.joinDate}</p>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                {memberData?.status?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 text-left">Profile Information</h2>
        </div>
        
        {isEditing ? (
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Full Name <span className="text-red-500">*</span></label>
                <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Email <span className="text-red-500">*</span></label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Mobile Number <span className="text-red-500">*</span></label>
                <input type="tel" value={editForm.mobile} onChange={(e) => setEditForm({...editForm, mobile: e.target.value})} maxLength={10} className={`w-full px-4 py-2 border rounded-lg ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Member ID</label>
                <input type="text" value={memberData?.memberId} disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Address <span className="text-red-500">*</span></label>
              <textarea value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} rows={2} className={`w-full px-4 py-2 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">City <span className="text-red-500">*</span></label><input type="text" value={editForm.city} onChange={(e) => setEditForm({...editForm, city: e.target.value})} className={`w-full px-4 py-2 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`} />{errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}</div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">State</label><input type="text" value={editForm.state} onChange={(e) => setEditForm({...editForm, state: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Pincode <span className="text-red-500">*</span></label><input type="text" value={editForm.pincode} onChange={(e) => setEditForm({...editForm, pincode: e.target.value})} maxLength={6} className={`w-full px-4 py-2 border rounded-lg ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`} />{errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}</div>
            </div>
            <div className="border-t pt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Nominee Name</label><input type="text" value={editForm.nomineeName} onChange={(e) => setEditForm({...editForm, nomineeName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Relationship</label><input type="text" value={editForm.nomineeRelation} onChange={(e) => setEditForm({...editForm, nomineeRelation: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" /></div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md flex items-center space-x-2 disabled:opacity-50">
                {saving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <><Save className="h-4 w-4" /><span>Save Changes</span></>}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start space-x-3"><User className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Full Name</p><p className="font-medium text-gray-800 text-left">{memberData?.fullName}</p></div></div>
              <div className="flex items-start space-x-3"><CreditCard className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Member ID</p><p className="font-medium text-gray-800 text-left">{memberData?.memberId}</p></div></div>
              <div className="flex items-start space-x-3"><Mail className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Email</p><p className="font-medium text-gray-800 text-left">{memberData?.email}</p></div></div>
              <div className="flex items-start space-x-3"><Phone className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Mobile</p><p className="font-medium text-gray-800 text-left">{memberData?.mobile}</p></div></div>
              <div className="flex items-start space-x-3"><Calendar className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Date of Birth</p><p className="font-medium text-gray-800 text-left">{memberData?.dateOfBirth}</p></div></div>
              <div className="flex items-start space-x-3"><Shield className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Status</p><span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 mt-1">{memberData?.status?.toUpperCase()}</span></div></div>
            </div>
            <div className="border-t mt-5 pt-5"><h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center text-left"><MapPin className="h-5 w-5 mr-2 text-gray-500" />Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start space-x-3"><Home className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Address</p><p className="font-medium text-gray-800 text-left">{memberData?.address}</p></div></div>
                <div className="flex items-start space-x-3"><Building className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">City</p><p className="font-medium text-gray-800 text-left">{memberData?.city}</p></div></div>
                <div className="flex items-start space-x-3"><MapPin className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">State</p><p className="font-medium text-gray-800 text-left">{memberData?.state}</p></div></div>
                <div className="flex items-start space-x-3"><Globe className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Pincode</p><p className="font-medium text-gray-800 text-left">{memberData?.pincode}</p></div></div>
              </div>
            </div>
            <div className="border-t mt-5 pt-5"><h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center text-left"><Shield className="h-5 w-5 mr-2 text-gray-500" />Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start space-x-3"><User className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Nominee Name</p><p className="font-medium text-gray-800 text-left">{memberData?.nomineeName || "Not set"}</p></div></div>
                <div className="flex items-start space-x-3"><User className="h-5 w-5 text-gray-400 mt-0.5" /><div className="text-left"><p className="text-sm text-gray-500 text-left">Relationship</p><p className="font-medium text-gray-800 text-left">{memberData?.nomineeRelation || "Not set"}</p></div></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100"><h2 className="text-xl font-bold text-gray-800 flex items-center text-left"><Lock className="h-5 w-5 mr-2 text-gray-500" />Change Password</h2></div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Current Password</label><div className="relative"><input type={showPassword ? "text" : "password"} value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10" placeholder="Enter current password" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">{showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}</button></div></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">New Password</label><input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Min 6 characters" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-1 text-left">Confirm New Password</label><input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Re-enter new password" /></div>
          </div>
          {passwordError && <div className="mt-3 flex items-center space-x-1 text-red-500"><AlertCircle className="h-4 w-4" /><p className="text-sm">{passwordError}</p></div>}
          {passwordSuccess && <div className="mt-3 flex items-center space-x-1 text-green-500"><CheckCircle className="h-4 w-4" /><p className="text-sm">{passwordSuccess}</p></div>}
          <button onClick={handlePasswordChange} disabled={saving} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">Update Password</button>
        </div>
      </div>
    </div>
  );
};

// Policies Section Component
const PoliciesSection = ({ memberData }: { memberData: MemberData | null }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">My Policies</h2>
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800 text-left">Life Insurance Policy</h3>
          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Active</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <p className="text-left"><span className="text-gray-500">Policy Number:</span> LI-2026-001</p>
          <p className="text-left"><span className="text-gray-500">Coverage:</span> ₹50000</p>
          <p className="text-left"><span className="text-gray-500">Premium:</span> ₹{memberData?.premiumAmount}/month</p>
          <p className="text-left"><span className="text-gray-500">Tenure:</span> {memberData?.tenure} months</p>
          <p className="text-left"><span className="text-gray-500">Start Date:</span> {memberData?.joinDate}</p>
          <p className="text-left"><span className="text-gray-500">Next Premium Due:</span> 5th of every month</p>
        </div>
      </div>
    </div>
  );
};

// Contributions Section Component
const ContributionsSection = ({ memberData }: { memberData: MemberData | null }) => {
  const payments = [
    { month: "April 2026", amount: 1500, status: "paid", date: "05 Apr 2026" },
    { month: "March 2026", amount: 1500, status: "paid", date: "05 Mar 2026" },
    { month: "February 2026", amount: 1500, status: "paid", date: "05 Feb 2026" },
    { month: "January 2026", amount: 1500, status: "paid", date: "05 Jan 2026" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">Contribution History</h2>
      <div className="space-y-3">
        {payments.map((payment, index) => (
          <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
            <div className="text-left"><p className="font-medium text-gray-800 text-left">{payment.month}</p><p className="text-sm text-gray-500 text-left">{payment.date}</p></div>
            <div className="text-right"><p className="font-semibold text-gray-800">₹{payment.amount}</p><span className="text-xs text-green-600">{payment.status}</span></div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center"><p className="font-semibold text-gray-800 text-left">Total Contribution</p><p className="text-xl font-bold text-gray-800">₹{memberData?.totalContributions}</p></div>
      </div>
    </div>
  );
};

// Claims Section Component
const ClaimsSection = ({ memberData, setActiveTab }: { memberData: MemberData | null; setActiveTab: (tab: string) => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-left">My Claims</h2>
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No claims filed yet</p>
        <button 
          onClick={() => setActiveTab("raise-claim")}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm"
        >
          Raise a Claim
        </button>
      </div>
    </div>
  );
};

export default MemberDashboard;