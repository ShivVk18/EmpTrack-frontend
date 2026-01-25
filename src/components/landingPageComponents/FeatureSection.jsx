import { Users, Settings, BarChart2, Shield, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      desc: "End-to-end employee lifecycle tracking with smart organizational structuring.",
      details: [
        "Profile management with photo uploads",
        "Document storage and management",
        "Department and designation assignment",
        "Advanced search and filtering",
      ],
    },
    {
      icon: Settings,
      title: "Payroll Automation",
      desc: "Error-free salary processing with compliance built-in.",
      details: [
        "Automated salary calculations",
        "Support for different employee types",
        "Tax calculations (EPF, ESI, TDS)",
        "Monthly payroll generation",
      ],
    },
    {
      icon: BarChart2,
      title: "Analytics & Reporting",
      desc: "Real-time workforce metrics and exportable reports.",
      details: [
        "Real-time employee statistics",
        "Payroll summaries with insights",
        "Department-wise performance metrics",
        "Exportable compliance reports",
      ],
    },
    {
      icon: Shield,
      title: "Security & Access Control",
      desc: "Granular role-based permissions and data isolation.",
      details: [
        "Multi-level role-based permissions",
        "Company-specific data isolation",
        "Secure JWT authentication",
        "Comprehensive audit trails",
      ],
    },
  ]

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-[#064e3b] rounded-3xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header - 60% Primary */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
            Powerful Features for
            <span className="block text-green-400">Employee Management</span>
          </h2>
          <p className="text-lg sm:text-xl text-green-100 leading-relaxed font-light">
            Everything you need to manage your workforce efficiently, from onboarding to payroll processing.
          </p>
        </div>

        {/* Features Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="group h-full border border-green-700/30 bg-white/95 hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden backdrop-blur-sm"
            >
              <CardHeader className="pb-4 p-6 sm:p-8">
                <div className="flex items-start space-x-4 sm:space-x-6 mb-4">
                  {/* 10% Accent - Icon */}
                  <div className="p-3 sm:p-4 bg-green-100 rounded-2xl group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 transition-colors duration-300 group-hover:text-green-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-light">{feature.desc}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <ul className="space-y-3">
                  {feature.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start space-x-3 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-5 w-5 text-green-600 group-hover/item:text-green-700 transition-colors duration-300" />
                      </div>
                      <span className="text-slate-700 group-hover/item:text-slate-900 transition-colors duration-300 font-medium text-sm sm:text-base">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}