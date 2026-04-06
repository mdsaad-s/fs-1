import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  MapPin, 
  CreditCard, 
  Edit2, 
  Save, 
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Home,
  Building,
  Globe,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

interface ProfileData {
  id: string;
  userId: string;
  memberId: string;
  fullName: string;
  email: string;
  mobile: string;
  photo?: string;
  joinDate: string;
  status: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  pincode?: string;
  state?: string;
  country?: string;
  nomineeName?: string;
  nomineeRelation?: string;
}

const ProfileSection = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setProfile({
          id: user.userId || user.id || "DEMO001",
          userId: user.userId || user.id || "DEMO001",
          memberId: user.memberId || "FS-M-1001",
          fullName: user.fullName || "Rajesh Kumar",
          email: user.email || "rajesh@fairshare.com",
          mobile: user.mobile || "9876543210",
          joinDate: user.timestamp ? new Date(user.timestamp).toLocaleDateString() : "2024-01-15",
          status: user.status || "active",
          dateOfBirth: user.dateOfBirth || "1990-01-15",
          address: user.address || "123, Main Street",
          city: user.city || "Hyderabad",
          pincode: user.pincode || "500001",
          state: user.state || "Telangana",
          country: user.country || "India",
          nomineeName: user.nomineeName || "Sita Kumar",
          nomineeRelation: user.nomineeRelation || "Spouse"
        });
        
        setEditForm({
          fullName: user.fullName || "Rajesh Kumar",
          email: user.email || "rajesh@fairshare.com",
          mobile: user.mobile || "9876543210",
          address: user.address || "123, Main Street",
          city: user.city || "Hyderabad",
          pincode: user.pincode || "500001",
          state: user.state || "Telangana",
          nomineeName: user.nomineeName || "Sita Kumar",
          nomineeRelation: user.nomineeRelation || "Spouse"
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

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
    // Simulate API call
    setTimeout(() => {
      const updatedProfile = { ...profile, ...editForm };
      setProfile(updatedProfile);
      localStorage.setItem("user", JSON.stringify(updatedProfile));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 h-24"></div>
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white bg-gradient-to-r from-sky-500 to-blue-500 flex items-center justify-center shadow-lg">
                <User className="h-12 w-12 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="md:ml-4 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl font-bold text-gray-800">{profile?.fullName}</h1>
              <p className="text-gray-500">Member since {profile?.joinDate}</p>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                {profile?.status?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Mode Toggle Button */}
      {!isEditing && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      )}

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
        </div>
        
        {isEditing ? (
          // Edit Mode Form
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={editForm.mobile}
                  onChange={(e) => setEditForm({...editForm, mobile: e.target.value})}
                  maxLength={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Member ID</label>
                <input
                  type="text"
                  value={profile?.memberId}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={editForm.address}
                onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                rows={2}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={editForm.state}
                  onChange={(e) => setEditForm({...editForm, state: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.pincode}
                  onChange={(e) => setEditForm({...editForm, pincode: e.target.value})}
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>

            <div className="border-t pt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Nominee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nominee Name</label>
                  <input
                    type="text"
                    value={editForm.nomineeName}
                    onChange={(e) => setEditForm({...editForm, nomineeName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={editForm.nomineeRelation}
                    onChange={(e) => setEditForm({...editForm, nomineeRelation: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // View Mode
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start space-x-3">
                <User className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{profile?.fullName}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Member ID</p>
                  <p className="font-medium text-gray-800">{profile?.memberId}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-800">{profile?.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium text-gray-800">{profile?.mobile}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-800">{profile?.dateOfBirth}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Member Status</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 mt-1">
                    {profile?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t mt-5 pt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start space-x-3">
                  <Home className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">{profile?.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium text-gray-800">{profile?.city}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium text-gray-800">{profile?.state}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Pincode</p>
                    <p className="font-medium text-gray-800">{profile?.pincode}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t mt-5 pt-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gray-500" />
                Nominee Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Nominee Name</p>
                    <p className="font-medium text-gray-800">{profile?.nomineeName || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Relationship</p>
                    <p className="font-medium text-gray-800">{profile?.nomineeRelation || "Not set"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Lock className="h-5 w-5 mr-2 text-gray-500" />
            Change Password
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Min 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                placeholder="Re-enter new password"
              />
            </div>
          </div>
          
          {passwordError && (
            <div className="mt-3 flex items-center space-x-1 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{passwordError}</p>
            </div>
          )}
          
          {passwordSuccess && (
            <div className="mt-3 flex items-center space-x-1 text-green-500">
              <CheckCircle className="h-4 w-4" />
              <p className="text-sm">{passwordSuccess}</p>
            </div>
          )}
          
          <button
            onClick={handlePasswordChange}
            disabled={saving}
            className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;