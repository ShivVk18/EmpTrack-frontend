import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

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
      question:
        "Can different employee types be managed with different payroll rules?",
      answer:
        "EmpTrack supports various employee types including Permanent, Contract, Intern, and custom categories. Each type can have different salary structures, tax calculations, allowances, deductions, and payroll processing rules tailored to their specific requirements.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-orange-50"
    >
      {/* Animated gradient orbs matching hero */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-6 shadow-xl shadow-amber-500/20 transform hover:scale-110 transition-all duration-500">
            <HelpCircle className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 leading-tight">
            Frequently Asked
            <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-2xl mx-auto">
            Discover EmpTrack's powerful features and capabilities
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => toggleFAQ(index)}
            >
              <div
                className={`group bg-white/60 backdrop-blur-sm border border-neutral-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
                  openIndex === index
                    ? "ring-2 ring-amber-500/30 shadow-xl shadow-amber-500/10 border-amber-200"
                    : ""
                }`}
              >
                <CollapsibleTrigger className="w-full text-left p-6 sm:p-8 hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/30 transition-all duration-500 flex items-center justify-between group">
                  <span className="font-semibold text-neutral-900 text-base sm:text-lg group-hover:text-amber-700 transition-all duration-500 pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-11 h-11 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl flex items-center justify-center group-hover:from-amber-100 group-hover:to-orange-100 transition-all duration-500 group-hover:scale-110 shadow-sm ${
                        openIndex === index ? "from-amber-100 to-orange-100 scale-110 shadow-md" : ""
                      }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-amber-700 transition-all duration-500 ${
                          openIndex === index
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="text-neutral-700 text-sm sm:text-base leading-relaxed font-light border-t border-amber-100 pt-6 bg-gradient-to-r from-amber-50/40 to-orange-50/30 -mx-6 sm:-mx-8 px-6 sm:px-8 py-6 rounded-b-3xl">
                      <div className="transform transition-all duration-700 delay-75">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* Bottom CTA - matching style */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border border-amber-200">
            <span className="text-neutral-900 font-semibold">Still have questions?</span>
            <a href="#contact" className="text-amber-700 font-bold hover:text-orange-700 transition-colors duration-300 underline underline-offset-4">
              Contact our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}