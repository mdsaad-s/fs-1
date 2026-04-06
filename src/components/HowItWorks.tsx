import { Card, CardContent } from "./ui/card";
import { UserPlus, Users, Shield, TrendingUp, Coins, FileCheck } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join the Cooperative",
    description: "Register as a member with simple KYC verification"
  },
  {
    icon: Shield,
    title: "Choose Your Policy",
    description: "Select from health, life, crop, or asset insurance"
  },
  {
    icon: Coins,
    title: "Contribute to Fund Pool",
    description: "Pay affordable premiums into the collective fund"
  },
  {
    icon: Users,
    title: "Community Protection",
    description: "Your contributions protect all members collectively"
  },
  {
    icon: FileCheck,
    title: "Transparent Claims",
    description: "File and track claims with full transparency"
  },
  {
    icon: TrendingUp,
    title: "Share in Profits",
    description: "Receive your share of investment returns annually"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How Cooperative Insurance Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, transparent process that puts members first
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-large transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-secondary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-3xl font-bold text-primary/20 mr-3">{index + 1}</span>
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary/30 z-10">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}