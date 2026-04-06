import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Interest-Free Model",
    description: "Ethical insurance without any interest charges, compliant with religious principles",
    points: [
      "No interest on premiums or claims",
      "Shariah-compliant operations",
      "Focus on mutual aid and cooperation",
      
    ]
  },
  {
    title: "Member Ownership",
    description: "True cooperative model where every member has a voice and stake",
    points: [
      "Democratic decision-making",
      "Equal voting rights",
      "Profit sharing among members"
    ]
  },
  {
    title: "Profit Sharing",
    description: "Surplus funds are distributed back to members annually",
    points: [
      "Fair distribution model",
      "Investment in ethical businesses",
      "Annual profit reports"
    ]
  },
  {
    title: "Transparent Claims",
    description: "Clear, fair, and quick claim settlement process",
    points: [
      "Online claim tracking",
      
    ]
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Cooperative Insurance?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the benefits of community-driven, ethical insurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="hover:shadow-large transition-all duration-300 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
                <p className="text-muted-foreground mt-2">{benefit.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefit.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}