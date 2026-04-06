import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Heart, Users, Award, TrendingUp, Clock, CheckCircle, Target, Globe, Building, Phone, Mail, MapPin } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Ethical Insurance",
      description: "We follow ethical practices with complete transparency in all our operations.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Heart,
      title: "Member-Owned",
      description: "True cooperative model where every member has a voice and stake in the company.",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Community First",
      description: "We prioritize community welfare over profits, ensuring fair treatment for all.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Profit Sharing",
      description: "Annual surplus is distributed among all members as per their contribution.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your insurance needs.",
      color: "from-orange-500 to-yellow-600"
    },
    {
      icon: CheckCircle,
      title: "98% Claim Ratio",
      description: "Industry-leading claim settlement ratio ensuring quick payouts.",
      color: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <>
      <Header />
      <div className="pt-20 min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-500 to-indigo-500 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">About Fair Share</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Revolutionizing insurance through cooperation, transparency, and member-first approach
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                To provide ethical, interest-free insurance solutions that empower communities 
                and ensure financial security for every member through collective strength and transparency.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Member-Centric</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Community Driven</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800">Fair Share Cooperative</h3>
                <p className="text-gray-600 mt-2">Your Trusted Insurance Partner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Fair Share?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Founded with a vision to transform the insurance industry, Fair Share has grown into 
                a trusted cooperative serving thousands of members across India.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2026</h3>
                <p className="text-gray-600">Founded with 10 initial members</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2026</h3>
                <p className="text-gray-600">Reached 10</p>
              </div>
              
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-blue-100 mt-2">Have questions? We're here to help!</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6" />
                <span>info@fairshare.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="h-6 w-6" />
                <span>hyderabad, Telangana</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;