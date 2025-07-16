import { ArrowRight, Play, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const highlights = [
    { icon: Zap, label: "Lightning Fast", desc: "Instant processing" },
    {
      icon: Shield,
      label: "Enterprise Security",
      desc: "Bank-level protection",
    },
    { icon: BarChart3, label: "Smart Analytics", desc: "Real-time insights" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
      <div className="absolute inset-0 bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center">
          <div className="space-y-6 mb-12 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900">
              <span className="block mb-2">End-to-End Employee</span>
              <span className="text-indigo-600 block">Management Platform</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl  text-slate-600 max-w-4xl mx-auto leading-relaxed font-light ">
              Streamline your workforce management with EmpTrack's comprehensive
              platform. From employee onboarding to payroll automation, we've
              got you covered.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-4 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold group"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 text-lg px-8 py-4 h-auto rounded-lg transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold group bg-transparent"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            {highlights.map((highlight, index) => (
              <div key={index} className="group text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4 group-hover:bg-slate-200 transition-all duration-300 group-hover:scale-110">
                  <highlight.icon className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {highlight.label}
                  </h3>
                  <p className="text-slate-600 font-medium">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
