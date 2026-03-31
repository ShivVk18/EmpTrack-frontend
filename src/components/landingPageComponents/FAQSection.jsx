import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from "motion/react";

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
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-amber-50"
    >
      {/* Animated ambient background (Amber) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-200/50 rounded-full blur-[110px] -translate-y-1/2 -ml-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/40 rounded-full blur-[110px] translate-y-20 translate-x-20"></div>
      </div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(146,64,14,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(146,64,14,0.08)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-amber-200 rounded-2xl mb-6 shadow-sm transform transition-all duration-500 hover:scale-110 hover:shadow-md">
            <HelpCircle className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-amber-950 leading-tight">
            Frequently Asked
            <span className="block text-amber-800/85">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-amber-900/80 font-light max-w-2xl mx-auto">
            Discover EmpTrack's powerful features and capabilities
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Collapsible
                open={openIndex === index}
                onOpenChange={() => toggleFAQ(index)}
              >
                <div
                  className={`group bg-white/95 border rounded-2xl transition-all duration-500 overflow-hidden ${
                    openIndex === index
                      ? "border-amber-300 shadow-md shadow-amber-200/60"
                      : "border-amber-200 shadow-sm hover:border-amber-300 hover:shadow-md"
                  }`}
                >
                  <CollapsibleTrigger className="w-full text-left p-6 sm:p-7 hover:bg-amber-50 transition-colors duration-300 flex items-center justify-between group/trigger">
                    <span className={`font-semibold text-base sm:text-lg transition-colors duration-300 pr-4 leading-relaxed ${openIndex === index ? 'text-amber-950' : 'text-amber-900 group-hover/trigger:text-amber-950'}`}>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openIndex === index ? "bg-amber-100" : "bg-amber-50 group-hover/trigger:bg-amber-100"
                        }`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            openIndex === index
                              ? "rotate-180 text-amber-900"
                              : "text-amber-400 group-hover/trigger:text-amber-700"
                          }`}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7">
                      <div className="text-amber-900/85 text-sm sm:text-base leading-relaxed font-light border-t border-amber-100 pt-5">
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA inline */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-amber-200 rounded-full shadow-sm hover:border-amber-300 transition-colors duration-300">
            <span className="text-amber-900 text-sm font-medium">Still have questions?</span>
            <a href="#contact" className="text-amber-700 text-sm font-semibold hover:text-amber-900 transition-colors duration-300">
              Contact our team &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}