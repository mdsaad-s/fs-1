import { Shield, Mail, Phone, MapPin, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSocietiesAct, setShowSocietiesAct] = useState(false);
  const navigate = useNavigate();

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Terms & Conditions</h2>
          <button 
            onClick={() => setShowTerms(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-gray-700">
          <p className="font-semibold">Last Updated: January 1, 2026</p>
          
          <h3 className="font-semibold text-lg mt-4">1. Acceptance of Terms</h3>
          <p>By accessing and using FairShare's services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our platform.</p>
          
          <h3 className="font-semibold text-lg mt-4">2. Cooperative Membership</h3>
          <p>FairShare operates as a cooperative society. Membership requires adherence to cooperative principles including democratic member control, economic participation, and autonomy.</p>
          
          <h3 className="font-semibold text-lg mt-4">3. Insurance Coverage</h3>
          <p>All insurance policies are subject to the specific terms outlined in your policy document. Coverage begins only after premium payment and policy issuance.</p>
          
          <h3 className="font-semibold text-lg mt-4">4. Claims Process</h3>
          <p>Claims must be filed within 30 days of the incident. FairShare reserves the right to investigate all claims. False claims may result in membership termination.</p>
          
          <h3 className="font-semibold text-lg mt-4">5. Investment Terms</h3>
          <p>Member investments are subject to market risks. Returns are not guaranteed. Past performance does not guarantee future results.</p>
          
          <h3 className="font-semibold text-lg mt-4">6. Data Privacy</h3>
          <p>Your data is protected under our Privacy Policy. We collect and process data as necessary for insurance and cooperative operations.</p>
          
          <h3 className="font-semibold text-lg mt-4">7. Termination</h3>
          <p>FairShare may terminate membership for violation of cooperative principles, fraudulent claims, or non-payment of dues.</p>
          
          <h3 className="font-semibold text-lg mt-4">8. Governing Law</h3>
          <p>These terms are governed by the Cooperative Societies Act and applicable laws of India. Disputes shall be resolved in Hyderabad jurisdiction.</p>
          
          <h3 className="font-semibold text-lg mt-4">9. Contact Information</h3>
          <p>For questions about these Terms, contact us at legal@fairshare.com or +91 1800-123-4567.</p>
        </div>
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
          <button 
            onClick={() => setShowTerms(false)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
          <button 
            onClick={() => setShowPrivacy(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-gray-700">
          <p className="font-semibold">Effective Date: January 1, 2026</p>
          
          <h3 className="font-semibold text-lg mt-4">Information We Collect</h3>
          <p>We collect personal information including name, contact details, identification proofs, financial information, and insurance-related data necessary for policy underwriting and claims processing.</p>
          
          <h3 className="font-semibold text-lg mt-4">How We Use Your Information</h3>
          <p>Your data is used for policy management, claims processing, investment management, regulatory compliance, and improving our services.</p>
          
          <h3 className="font-semibold text-lg mt-4">Data Sharing</h3>
          <p>We do not sell your personal data. We may share data with regulatory authorities, reinsurers, and service providers under strict confidentiality agreements.</p>
          
          <h3 className="font-semibold text-lg mt-4">Data Security</h3>
          <p>We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your data.</p>
          
          <h3 className="font-semibold text-lg mt-4">Your Rights</h3>
          <p>You have the right to access, correct, or delete your personal data. You may also request data portability or restrict processing under certain conditions.</p>
          
          <h3 className="font-semibold text-lg mt-4">Cookies and Tracking</h3>
          <p>We use cookies to enhance user experience. You can control cookie preferences through your browser settings.</p>
          
          <h3 className="font-semibold text-lg mt-4">Data Retention</h3>
          <p>We retain your data as long as necessary for legal, regulatory, and business purposes, typically 7 years after policy expiration.</p>
          
          <h3 className="font-semibold text-lg mt-4">Updates to Privacy Policy</h3>
          <p>We may update this policy periodically. Material changes will be notified via email or website notice.</p>
        </div>
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
          <button 
            onClick={() => setShowPrivacy(false)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const SocietiesActModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Co-operative Societies Act, 1912</h2>
          <button 
            onClick={() => setShowSocietiesAct(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-gray-700">
          <p className="text-sm text-gray-500 italic">[Act No. 2 of 1912] | 1st March, 1912</p>
          <p className="font-semibold">An Act to amend the Law relating to Co-operative Societies.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">PRELIMINARY</h3>
          
          <h4 className="font-semibold text-md mt-3">1. Short title and extent</h4>
          <p className="text-sm">(1) This Act may be called the Co-operative Societies Act, 1912; and (2) it extends to the whole of India.</p>
          
          <h4 className="font-semibold text-md mt-3">2. Definitions</h4>
          <p className="text-sm"><span className="font-medium">"by-laws"</span> means the registered by-laws for the time being in force; <span className="font-medium">"committee"</span> means the governing body; <span className="font-medium">"member"</span> includes person joining in application for registration; <span className="font-medium">"registered society"</span> means a society registered under this Act.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">REGISTRATION</h3>
          
          <h4 className="font-semibold text-md mt-3">4. Societies which may be registered</h4>
          <p className="text-sm">A society which has as its object the promotion of the economic interests of its members in accordance with co-operative principles may be registered under this Act with or without limited liability.</p>
          
          <h4 className="font-semibold text-md mt-3">6. Conditions of registration</h4>
          <p className="text-sm">No society shall be registered which does not consist of at least ten persons above the age of eighteen years. The word "limited" shall be the last word in the name of every society with limited liability.</p>
          
          <h4 className="font-semibold text-md mt-3">9. Registration</h4>
          <p className="text-sm">If the Registrar is satisfied that a society has complied with the provisions of this Act, he may register the society and its by-laws.</p>
          
          <h4 className="font-semibold text-md mt-3">10. Evidence of registration</h4>
          <p className="text-sm">A certificate of registration signed by the Registrar shall be conclusive evidence that the society therein mentioned is duly registered.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">RIGHTS AND LIABILITIES OF MEMBERS</h3>
          
          <h4 className="font-semibold text-md mt-3">13. Votes of members</h4>
          <p className="text-sm">Where liability is not limited by shares, each member shall have one vote only. Where liability is limited by shares, each member shall have as many votes as may be prescribed by the by-laws.</p>
          
          <h4 className="font-semibold text-md mt-3">14. Restrictions on transfer of share or interest</h4>
          <p className="text-sm">The transfer or charge of the share or interest of a member shall be subject to conditions as prescribed.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">DUTIES OF REGISTERED SOCIETIES</h3>
          
          <h4 className="font-semibold text-md mt-3">17. Audit</h4>
          <p className="text-sm">The Registrar shall audit the accounts of every registered society once at least in every year. The audit shall include examination of overdue debts and valuation of assets and liabilities.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">PRIVILEGES OF REGISTERED SOCIETIES</h3>
          
          <h4 className="font-semibold text-md mt-3">18. Societies to be bodies corporate</h4>
          <p className="text-sm">Registration shall render a society a body corporate by the name under which it is registered, with perpetual succession and a common seal, and with power to hold property, enter into contracts, institute suits and do all things necessary for its constitution.</p>
          
          <h4 className="font-semibold text-md mt-3">20. Charge and set-off in respect of shares or interest of member</h4>
          <p className="text-sm">A registered society shall have a charge upon the share or interest of a member in respect of any debt due from such member to the society.</p>
          
          <h4 className="font-semibold text-md mt-3">21. Shares or interest not liable to attachment</h4>
          <p className="text-sm">The share or interest of a member shall not be liable to attachment or sale under any decree or order of a Court of Justice.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">PROPERTY AND FUNDS</h3>
          
          <h4 className="font-semibold text-md mt-3">29. Restrictions on loans</h4>
          <p className="text-sm">A registered society shall not make a loan to any person other than a member. With Registrar's sanction, a society may make loans to another registered society.</p>
          
          <h4 className="font-semibold text-md mt-3">32. Investment of funds</h4>
          <p className="text-sm">A registered society may invest its funds in Government Savings Bank, securities specified in Indian Trusts Act, shares of other registered societies, or any other mode permitted by rules.</p>
          
          <h4 className="font-semibold text-md mt-3">33. Funds not to be divided by way of profit</h4>
          <p className="text-sm">No part of the funds shall be divided by way of bonus or dividend among members. After at least one-fourth of net profits are carried to reserve fund, payments may be made among members as prescribed.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">INSPECTION OF AFFAIRS</h3>
          
          <h4 className="font-semibold text-md mt-3">35. Inquiry by Registrar</h4>
          <p className="text-sm">The Registrar may hold an inquiry into the constitution, working and financial condition of a registered society on his own motion or on application of majority of committee or not less than one-third of members.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">DISSOLUTION OF SOCIETY</h3>
          
          <h4 className="font-semibold text-md mt-3">39. Dissolution</h4>
          <p className="text-sm">If the Registrar, after inquiry, is of opinion that a society ought to be dissolved, he may cancel the registration. Any member may appeal within two months.</p>
          
          <h4 className="font-semibold text-md mt-3">41. Effect of cancellation of registration</h4>
          <p className="text-sm">Where registration is cancelled, the society shall cease to exist as a corporate body.</p>
          
          <h4 className="font-semibold text-md mt-3">42. Winding-up</h4>
          <p className="text-sm">Where registration is cancelled, the Registrar may appoint a liquidator who shall have power to institute suits, determine contributions, investigate claims, and give directions for winding-up.</p>
          
          <h3 className="font-semibold text-lg mt-4 text-blue-800">MISCELLANEOUS</h3>
          
          <h4 className="font-semibold text-md mt-3">47. Prohibition of the use of the word "co-operative"</h4>
          <p className="text-sm">No person other than a registered society shall trade under any name of which the word "co-operative" is part without sanction of State Government.</p>
          
          <h4 className="font-semibold text-md mt-3">48. Indian Companies Act not to apply</h4>
          <p className="text-sm">The provisions of the Indian Companies Act shall not apply to registered societies.</p>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-semibold">Note:</p>
            <p className="text-sm">FairShare operates as a registered co-operative society under the provisions of the Co-operative Societies Act, 1912, and subsequent amendments. Members' rights and liabilities are governed by this Act along with the society's registered by-laws.</p>
          </div>
        </div>
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4">
          <button 
            onClick={() => setShowSocietiesAct(false)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Function to scroll to Policies section in Header
  const handlePoliciesClick = () => {
    // First, navigate to home page if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const policiesSection = document.getElementById('policies-section');
        if (policiesSection) {
          policiesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const policiesSection = document.getElementById('policies-section');
      if (policiesSection) {
        policiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="bg-gradient-to-br from-gray-900 to-indigo-500 text-white border-t border-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <Shield className="h-9 w-9 text-purple-300" />
                <span className="font-bold text-2xl text-white">FairShare</span>
              </div>
              <p className="text-base text-blue-100 leading-relaxed">
                Ethical, transparent, and member-owned cooperative insurance platform.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg mb-5">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={handlePoliciesClick}
                    className="text-base text-blue-100 hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Policies
                  </button>
                </li>
                <li><a href="#about" className="text-base text-blue-100 hover:text-purple-200 transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg mb-5">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => setShowTerms(true)}
                    className="text-base text-blue-100 hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setShowPrivacy(true)}
                    className="text-base text-blue-100 hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li><a href="#" className="text-base text-blue-100 hover:text-purple-200 transition-colors">Compliance</a></li>
                <li>
                  <button 
                    onClick={() => setShowSocietiesAct(true)}
                    className="text-base text-blue-100 hover:text-purple-200 transition-colors cursor-pointer"
                  >
                    Societies Act
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white text-lg mb-5">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-base text-blue-100">
                  <Mail className="h-5 w-5 mr-3 text-purple-300" />
                  info@fairshare.com
                </li>
                <li className="flex items-center text-base text-blue-100">
                  <Phone className="h-5 w-5 mr-3 text-purple-300" />
                  +91 1800-123-4567
                </li>
                <li className="flex items-center text-base text-blue-100">
                  <MapPin className="h-5 w-5 mr-3 text-purple-300" />
                  Hyderabad, India
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-blue-600">
            <p className="text-center text-base text-white-200">
              © 2026 FairShare. All rights reserved. | Registered under Cooperative Societies Act
            </p>
          </div>
        </div>
      </footer>

      {showTerms && <TermsModal />}
      {showPrivacy && <PrivacyModal />}
      {showSocietiesAct && <SocietiesActModal />}
    </>
  );
}