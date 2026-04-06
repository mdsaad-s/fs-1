import { Button } from "./ui/button";
import { Shield, Menu, X, ChevronDown, Heart, Activity, Phone, LogIn, UserPlus, Crown, Info, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPoliciesDropdownOpen, setIsPoliciesDropdownOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: null },
    { name: "About", href: "/about", icon: Info },  
    {
      name: "Policies",
      href: "#",
      icon: ChevronDown,
      dropdown: true,
      items: [
        { name: "Life Insurance", href: "/policies/life", icon: Heart, description: "Secure your family's future" },
        { name: "Health Insurance", href: "/policies/health", icon: Activity, description: "Comprehensive health coverage" },
      ]
    },
    { name: "Contact", href: "/contact", icon: Mail },  
  ];

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-gray-800 to-indigo-500 text-white shadow-md z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300">
              </div>
              <Shield className="relative h-8 w-8 lg:h-10 lg:w-10 text-blue-600 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-gray-900 to-indigo-500 text-white bg-clip-text text-transparent">
                FairShare
              </span>
              <span className="text-[10px] lg:text-xs text-white-500 tracking-wide">Co-operative Insurance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsPoliciesDropdownOpen(true)}
                    onMouseLeave={() => setIsPoliciesDropdownOpen(false)}
                  >
                    <button
                      className="flex items-center space-x-1 px-3 lg:px-4 py-2 rounded-lg text-white hover:text-blue-600 hover:bg-blue-100 transition-all duration-200 group"
                    >
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPoliciesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isPoliciesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-2">
                          {item.items?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsPoliciesDropdownOpen(false)}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                            >
                              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                {subItem.icon && <subItem.icon className="h-5 w-5 text-blue-600" />}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{subItem.name}</p>
                                <p className="text-sm text-gray-500">{subItem.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-3 lg:px-4 py-2 rounded-lg text-white hover:text-blue-600 hover:bg-blue-100 font-medium transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons with Admin */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/admin">
              <Button variant="outline" className="border-2 border-purple-500 hover:bg-purple-100 text-purple-600 hover:text-purple-700 rounded-full px-6 font-medium transition-all duration-200">
                <Crown className="h-4 w-4 mr-2" />
                Admin Login
              </Button>
            </Link>
           <Link to="/member/login">   
              <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-100 text-gray-700 hover:text-blue-600 rounded-full px-6 font-medium transition-all duration-200">
                <LogIn className="h-4 w-4 mr-2" />
                Member Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-green-600 to-green-600 hover:from-gray-500 hover:to-gray-700 text-white rounded-full px-6 font-medium shadow-md hover:shadow-lg transition-all duration-200">
                <UserPlus className="h-4 w-4 mr-2" />
                Member Registration
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-200 animate-in slide-in-from-top-2 duration-200">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => setIsPoliciesDropdownOpen(!isPoliciesDropdownOpen)}
                      className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${isPoliciesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isPoliciesDropdownOpen && (
                      <div className="pl-4 space-y-2 pb-2">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center space-x-3 py-2 text-gray-600 hover:text-blue-600"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsPoliciesDropdownOpen(false);
                            }}
                          >
                            {subItem.icon && <subItem.icon className="h-4 w-4" />}
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block py-3 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3 border-t border-blue-200 mt-2">
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full border-2 border-purple-500 text-purple-600">
                  <Crown className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
              <Link to="/member/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-full border-2 border-gray-300 text-gray-700">
                  <LogIn className="h-4 w-4 mr-2" />
                  Member Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}