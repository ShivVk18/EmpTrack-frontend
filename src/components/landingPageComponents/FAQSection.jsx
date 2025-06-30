

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What employee management features does EmpTrack offer?",
      answer:
        "EmpTrack provides complete employee lifecycle management from hiring to exit. Features include profile management with photo uploads, document storage, department and designation assignment with hierarchy support, advanced search and filtering capabilities, and bulk operations for maximum efficiency.",
    },
    {
      question: "How does the payroll automation work?",
      answer:
        "Our payroll system offers automated salary calculations based on configurable parameters, supports different employee types (Permanent, Contract, Intern, etc.), handles tax calculations including EPF, ESI, TDS, and Professional Tax, manages flexible allowances and deductions, and generates monthly payroll with detailed breakdowns.",
    },
    {
      question: "What analytics and reporting capabilities are available?",
      answer:
        "EmpTrack provides real-time employee statistics with distribution charts, payroll summaries with financial insights, department-wise performance metrics, exportable reports for compliance and auditing, and a comprehensive dashboard with key performance indicators.",
    },
    {
      question: "How does the role-based access control work?",
      answer:
        "We offer multi-level permissions for different roles: Admin (complete system access), HR Manager (employee and payroll management), Senior Manager (strategic oversight), Manager (department-specific access), Accountant (financial operations), and Employee (personal profile access). Each role has specific permissions ensuring data security.",
    },
    {
      question: "What security features protect our company data?",
      answer:
        "EmpTrack ensures company-specific data isolation, secure authentication with JWT tokens, comprehensive audit trails for sensitive operations, data encryption, and secure file handling. Your company's data remains completely separate and secure.",
    },
    {
      question: "Can different employee types be managed with different payroll rules?",
      answer:
        "EmpTrack supports various employee types including Permanent, Contract, Intern, and custom categories. Each type can have different salary structures, tax calculations, allowances, deductions, and payroll processing rules tailored to their specific requirements.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-stone-50 via-white to-stone-50"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-600/6 via-indigo-600/8 to-blue-600/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-indigo-600/6 via-blue-600/8 to-purple-600/4 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-600/4 via-purple-600/6 to-indigo-600/4 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl mb-4 sm:mb-6 border border-purple-100/50 shadow-sm">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-slate-900 leading-tight tracking-tight">
            Frequently Asked
            <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent relative">
              Questions
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 blur-2xl -z-10"></div>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 font-light max-w-2xl mx-auto">
            Discover EmpTrack's powerful features and capabilities
          </p>
        </div>

        {/* Enhanced FAQ Items with Smooth Animations */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index} open={openIndex === index} onOpenChange={() => toggleFAQ(index)}>
              <div className="group bg-gradient-to-r from-white/90 to-stone-50/90 backdrop-blur-sm border-2 border-stone-200/80 hover:border-stone-300/80 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg hover:shadow-stone-900/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <CollapsibleTrigger className="w-full text-left p-4 sm:p-6 lg:p-8 hover:bg-gradient-to-r hover:from-stone-50/50 hover:to-white/50 transition-all duration-500 flex items-center justify-between group">
                  <span className="font-semibold text-slate-900 text-sm sm:text-base lg:text-lg group-hover:text-purple-600 transition-colors duration-500 pr-3 sm:pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex items-center justify-center group-hover:from-purple-50 group-hover:to-indigo-50 transition-all duration-500 border border-stone-200/50 shadow-sm group-hover:scale-110">
                      <ChevronDown
                        className={`h-4 w-4 sm:h-5 sm:w-5 text-slate-700 group-hover:text-purple-600 transition-all duration-500 ease-in-out ${
                          openIndex === index ? "rotate-180 scale-110" : "rotate-0 scale-100"
                        }`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-500 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                    <div className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed font-light border-t border-stone-200/80 pt-4 sm:pt-6 animate-fade-in-up">
                      {faq.answer}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  )
}
