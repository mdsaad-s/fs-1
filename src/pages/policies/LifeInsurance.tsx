import { Heart, Shield, Clock, Users, TrendingUp, Award } from "lucide-react";

export function LifeInsurance() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Life Insurance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure your family's financial future with our comprehensive life insurance plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Financial Protection</h3>
            <p className="text-gray-600">Ensure your loved ones are protected financially in your absence</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Long-term Security</h3>
            <p className="text-gray-600">Build wealth while ensuring life cover for the long term</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Family Coverage</h3>
            <p className="text-gray-600">Customizable plans to cover your entire family</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Why Choose FairShare Life Insurance?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5" />
              <span>Competitive premium rates</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5" />
              <span>100% claim settlement ratio</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5" />
              <span>Member-owned cooperative</span>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5" />
              <span>Tax benefits under Section 80C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}