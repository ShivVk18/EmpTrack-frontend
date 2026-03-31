import { Users, Settings, BarChart2, Shield, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"

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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-100 border border-amber-200 text-amber-900 font-semibold text-sm mb-6 shadow-sm">
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-amber-950 leading-tight">
            Powerful Features for
            <span className="block text-amber-800/90">Modern Teams</span>
          </h2>
          <p className="text-lg sm:text-xl text-amber-900/75 leading-relaxed font-light">
            Everything you need to manage your workforce efficiently, from onboarding to payroll processing.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card
                className="group h-full border border-amber-200 bg-white hover:bg-amber-50/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden hover:border-amber-300"
              >
                <CardHeader className="pb-4 p-6 sm:p-8 relative z-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-[100px] -z-10 group-hover:bg-amber-100/90 transition-colors duration-300"></div>
                  
                  <div className="flex items-start space-x-4 sm:space-x-6 mb-4">
                    <div className="p-3 sm:p-4 bg-amber-100 rounded-2xl group-hover:bg-amber-600 transition-all duration-300 shadow-sm group-hover:shadow-amber-900/20 group-hover:-rotate-1">
                      <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700 transition-colors duration-300 group-hover:text-amber-50" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <CardTitle className="text-xl sm:text-2xl font-bold text-amber-950 mb-2 transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                      <p className="text-amber-900/75 text-sm sm:text-base leading-relaxed font-light">{feature.desc}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8 relative z-10">
                  <ul className="space-y-3.5">
                    {feature.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="flex items-start space-x-3 group/item">
                        <div className="flex-shrink-0 mt-0.5 relative">
                          <CheckCircle className="h-5 w-5 text-amber-300 group-hover/item:text-amber-700 transition-colors duration-300 relative z-10 bg-white" />
                          <div className="absolute inset-0 bg-amber-200 rounded-full blur-[2px] opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-amber-900/80 group-hover/item:text-amber-950 transition-colors duration-300 font-medium text-sm sm:text-base">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}