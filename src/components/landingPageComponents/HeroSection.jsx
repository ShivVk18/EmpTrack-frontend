import { ArrowRight, Play, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function HeroSection() {
  const highlights = [
    { icon: Zap, label: "Lightning Fast", desc: "Instant processing" },
    { icon: Shield, label: "Enterprise Security", desc: "Bank-level protection" },
    { icon: BarChart3, label: "Smart Analytics", desc: "Real-time insights" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20 bg-amber-50">
      {/* Warm amber background */}
      <div className="absolute inset-0 bg-amber-50">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/70 to-amber-100/80"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(146,64,14,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(146,64,14,0.08)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Ambient glows (Amber) */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-300/40 rounded-full blur-[110px]"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-200/40 rounded-full blur-[90px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 mb-12"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-amber-950"
            >
              <span className="block mb-2">Build a Workplace</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 block">
                That Works for Everyone
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-amber-900/80 max-w-3xl mx-auto leading-relaxed font-light"
            >
              EmpTrack is the modern, all-in-one employee management platform designed to streamline onboarding, payroll, and performance with a beautiful experience.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 h-auto rounded-xl shadow-[0_10px_35px_rgba(217,119,6,0.45)] hover:shadow-[0_12px_40px_rgba(180,83,9,0.55)] transition-all duration-300 w-full sm:w-auto hover:scale-105 font-medium group"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-amber-200 text-amber-900 hover:bg-amber-100/70 hover:text-amber-950 text-lg px-8 py-6 h-auto rounded-xl shadow-sm transition-all duration-300 w-full sm:w-auto hover:scale-105 font-medium group bg-white/70 backdrop-blur-sm"
            >
              <Play className="mr-3 h-5 w-5 text-amber-700 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto"
          >
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group text-center flex flex-col items-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border border-amber-200 rounded-2xl mb-5 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                  <highlight.icon className="w-7 h-7 text-amber-700 group-hover:text-amber-900 transition-colors duration-300" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-semibold text-amber-950 group-hover:text-amber-800 transition-colors duration-300">
                    {highlight.label}
                  </h3>
                  <p className="text-amber-900/75 text-sm font-medium">{highlight.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}