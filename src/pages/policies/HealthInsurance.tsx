import { Activity, Hospital, Ambulance, Stethoscope, Syringe, Shield } from "lucide-react";

export function HealthInsurance() {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-green-50 via-white to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Health Insurance
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive health coverage for you and your family with cashless treatment options
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Hospital className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cashless Treatment</h3>
            <p className="text-gray-600">Access our network of 5000+ hospitals for cashless treatment</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Ambulance className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Emergency Coverage</h3>
            <p className="text-gray-600">24/7 ambulance and emergency medical services</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Stethoscope className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
            <p className="text-gray-600">Annual health check-ups and wellness programs included</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Health Insurance Benefits</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Syringe className="h-5 w-5" />
              <span>Coverage for pre-existing diseases after 2 years</span>
            </div>
            <div className="flex items-center space-x-3">
              <Hospital className="h-5 w-5" />
              <span>Maternity and newborn coverage</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5" />
              <span>No-claim bonus up to 50%</span>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5" />
              <span>Mental health coverage included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}