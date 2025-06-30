import { ArrowRight, Play, Zap, Shield, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const highlights = [
    { icon: Zap, label: "Lightning Fast", desc: "Instant processing" },
    { icon: Shield, label: "Enterprise Security", desc: "Bank-level protection" },
    { icon: BarChart3, label: "Smart Analytics", desc: "Real-time insights" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20">
      {/* Enhanced Background with more color depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200">
        {/* Layered gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/30 via-transparent to-indigo-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-50/20 to-transparent"></div>

        {/* Enhanced gradient orbs with more color variation */}
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-600/12 via-indigo-600/8 to-blue-600/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-indigo-600/10 via-blue-600/8 to-purple-600/6 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/4 via-indigo-600/6 to-blue-600/4 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

        {/* Enhanced pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,113,108,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.04)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px]"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          {/* Enhanced Main Heading with better responsive typography */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] sm:leading-tight text-slate-900 tracking-tight">
              <span className="block mb-1 sm:mb-2">End-to-End Employee</span>
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent block relative">
                Management Platform
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-blue-600/20 blur-xl -z-10"></div>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-4 sm:px-0">
              Streamline your workforce management with EmpTrack's comprehensive platform. From employee onboarding to
              payroll automation, we've got you covered.
            </p>
          </div>

          {/* Enhanced CTA Buttons with better mobile layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-12 sm:mb-16 px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 h-auto rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 w-full sm:w-auto hover:scale-105 group border-0"
            >
              Start Free Trial
              <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-stone-300 hover:border-stone-400 text-slate-700 hover:text-slate-900 hover:bg-stone-100/80 text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 h-auto rounded-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 group bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md"
            >
              <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced Feature Highlights with better responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto px-4 sm:px-0">
            {highlights.map((highlight, index) => (
              <div key={index} className="group text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-stone-100 to-stone-200 backdrop-blur-sm rounded-2xl mb-3 sm:mb-4 group-hover:from-purple-50 group-hover:to-indigo-50 transition-all duration-300 group-hover:scale-110 border border-stone-200/50 shadow-sm group-hover:shadow-md">
                  <highlight.icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700 group-hover:text-purple-600 transition-colors duration-300" />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                    {highlight.label}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 font-medium">{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
