import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  UserPlus, 
  FileText, 
  Wallet, 
  ClipboardCheck, 
  TrendingUp, 
  Shield, 
  Bell,
  BarChart3
} from "lucide-react";

const modules = [
  {
    icon: UserPlus,
    title: "User Registration & Membership",
    description: "Easy onboarding with KYC verification, member profiles, and policy selection",
    features: ["New member registration", "Personal information management", "Policy enrollment"]
  },
  {
    icon: FileText,
    title: "Policy Management",
    description: "Comprehensive insurance schemes for health, life, crops, and assets",
    features: ["Multiple policy types", "Coverage eligibility", "Terms & conditions"]
  },
  {
    icon: Wallet,
    title: "Fund Pool & Contributions",
    description: "Transparent premium collection and investment management",
    features: ["Premium collection", "Investment tracking", "Payment history"]
  },
  {
    icon: ClipboardCheck,
    title: "Claim Management",
    description: "Streamlined claim submission and automated approval process",
    features: ["Online claim filing", "Quick settlement"]
  },
  {
    icon: TrendingUp,
    title: "Business & Investment",
    description: "Interest-free investment in Shariah-compliant ventures",
    features: ["Ethical investments", "Profit distribution", "Transparency reports"]
  },
  {
    icon: Shield,
    title: "Admin & Compliance",
    description: "Robust governance adhering to Cooperative Societies Act",
    features: ["Admin panel", "Audit logs", "Legal compliance"]
  },
  {
    icon: Bell,
    title: "Communication & Notifications",
    description: "Keep members informed with automated updates",
    features: ["Email/Push alerts", "Payment reminders", "Policy renewals"]
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Comprehensive insights into fund performance",
    features: ["Contribution history", "Fund balance", "Profit reports"]
  }
];

export function ModulesSection() {
  return (
    <section id="modules" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Comprehensive Platform Modules
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform offers a complete suite of features designed to make cooperative insurance 
            accessible, transparent, and efficient for all members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card key={index} className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1 border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}