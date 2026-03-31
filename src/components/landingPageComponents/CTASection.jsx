import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-amber-50">
      {/* Soft background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-amber-50/80 to-amber-100/60" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-amber-100 rounded-2xl mb-6 shadow-sm">
            <Sparkles className="w-7 h-7 text-amber-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-amber-950 leading-tight">
            Make your HR work
            <span className="block text-amber-700">
              smoother and more human
            </span>
          </h2>

          <p className="text-base sm:text-lg text-amber-900/80 mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            EmpTrack helps you handle attendance, payroll, and employee data in one calm, organized workspace—without the clutter or complexity.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center mb-14"
        >
          <Button
            size="lg"
            className="group bg-amber-500 hover:bg-amber-600 text-white text-base sm:text-lg px-7 sm:px-8 py-4 h-auto rounded-xl shadow-sm hover:shadow-md transition-all duration-150 w-full sm:w-auto"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start free trial
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-150" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-amber-200 bg-white/80 hover:bg-amber-50 text-amber-900 text-base sm:text-lg px-7 sm:px-8 py-4 h-auto rounded-xl transition-all duration-150 w-full sm:w-auto"
          >
            Talk to our team
          </Button>
        </motion.div>

        {/* Simple trust indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 pt-8 border-t border-amber-100"
        >
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-900 mb-0.5">10,000+</div>
            <div className="text-xs sm:text-sm text-amber-700 font-medium tracking-wide uppercase">Employees tracked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-900 mb-0.5">500+</div>
            <div className="text-xs sm:text-sm text-amber-700 font-medium tracking-wide uppercase">Teams onboarded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-900 mb-0.5">4.9/5</div>
            <div className="text-xs sm:text-sm text-amber-700 font-medium tracking-wide uppercase">Avg. rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}