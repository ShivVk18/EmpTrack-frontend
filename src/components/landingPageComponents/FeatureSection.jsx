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
      gradient: "from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      hoverGradient: "group-hover:from-purple-100 group-hover:to-purple-200",
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
      gradient: "from-indigo-50 to-indigo-100",
      iconColor: "text-indigo-600",
      hoverGradient: "group-hover:from-indigo-100 group-hover:to-indigo-200",
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
      gradient: "from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      hoverGradient: "group-hover:from-blue-100 group-hover:to-blue-200",
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
      gradient: "from-emerald-50 to-emerald-100",
      iconColor: "text-emerald-600",
      hoverGradient: "group-hover:from-emerald-100 group-hover:to-emerald-200",
    },
  ]

  return (
    <section
      id="features"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100"
    >
      {/* Enhanced Background Effects with more color layers */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-600/8 via-indigo-600/6 to-blue-600/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-600/8 via-blue-600/6 to-purple-600/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-600/4 via-purple-600/6 to-indigo-600/4 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight tracking-tight">
            Powerful Features for
            <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent relative">
              Employee Management
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 blur-2xl -z-10"></div>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-light max-w-3xl mx-auto">
            Everything you need to manage your workforce efficiently, from onboarding to payroll processing.
          </p>
        </div>

        {/* Enhanced Features Grid with better responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="group h-full border-2 border-stone-200/80 bg-gradient-to-br from-white/90 to-stone-50/90 backdrop-blur-sm hover:from-white hover:to-stone-50 hover:border-stone-300/80 shadow-sm hover:shadow-xl hover:shadow-stone-900/10 transition-all duration-500 hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6 lg:p-8">
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 mb-3 sm:mb-4">
                  {/* Enhanced Icon with individual colors */}
                  <div
                    className={`p-2.5 sm:p-3 lg:p-4 bg-gradient-to-br ${feature.gradient} ${feature.hoverGradient} rounded-xl transition-all duration-300 group-hover:scale-110 border border-white/50 shadow-sm group-hover:shadow-md`}
                  >
                    <feature.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 ${feature.iconColor} transition-colors duration-300`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle
                      className={`text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:${feature.iconColor} transition-colors duration-300 leading-tight`}
                    >
                      {feature.title}
                    </CardTitle>
                    <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <ul className="space-y-2 sm:space-y-3">
                  {feature.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="flex items-start space-x-2 sm:space-x-3 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 group-hover/item:text-emerald-600 transition-colors duration-300" />
                      </div>
                      <span className="text-slate-700 group-hover/item:text-slate-800 transition-colors duration-300 font-medium text-xs sm:text-sm lg:text-base leading-relaxed">
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
