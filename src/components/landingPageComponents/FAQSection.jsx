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
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184)_1px,transparent_0)] opacity-[0.15] [background-size:24px_24px]" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl mb-6 shadow-lg shadow-indigo-500/10 transform hover:scale-105 transition-all duration-500">
            <HelpCircle className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900 leading-tight">
            Frequently Asked
            <span className="block text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Discover EmpTrack's powerful features and capabilities
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => toggleFAQ(index)}
            >
              <div
                className={`group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  openIndex === index
                    ? "ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-500/10"
                    : ""
                }`}
              >
                <CollapsibleTrigger className="w-full text-left p-6 sm:p-8 hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-indigo-50/30 transition-all duration-500 flex items-center justify-between group">
                  <span className="font-semibold text-slate-900 text-base sm:text-lg group-hover:text-indigo-600 transition-all duration-500 pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                        openIndex === index ? "bg-indigo-100 scale-110" : ""
                      }`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 text-slate-600 group-hover:text-indigo-600 transition-all duration-500 ${
                          openIndex === index
                            ? "rotate-180 text-indigo-600"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="text-slate-600 text-sm sm:text-base leading-relaxed font-light border-t border-slate-100/50 pt-6 bg-gradient-to-r from-slate-50/30 to-indigo-50/20 -mx-6 sm:-mx-8 px-6 sm:px-8 py-6 rounded-b-2xl">
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
      </div>
    </section>
  );
}
