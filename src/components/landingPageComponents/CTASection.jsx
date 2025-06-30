import { Sparkles, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/95 via-indigo-600/95 to-blue-600/95"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px]"></div>
      </div>

      {/* Enhanced animated orbs */}
      <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/8 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-white/3 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-5xl">
        {/* Enhanced Badge */}
        <Badge className="mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 bg-white/15 backdrop-blur-sm text-white border-white/25 hover:bg-white/25 transition-all duration-300 rounded-full text-xs sm:text-sm font-medium shadow-lg hover:shadow-xl">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Development Preview Available
        </Badge>

        {/* Enhanced main content */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight text-white tracking-tight">
          Ready to Experience
          <span className="block text-purple-100">EmpTrack?</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto text-purple-100 leading-relaxed font-light px-4 sm:px-0">
          Explore the future of employee management with our interactive demo. Experience modern HR technology designed
          for today's workforce.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto px-4 sm:px-0">
          <Button
            size="lg"
            className="group bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 h-auto rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 border-0"
          >
            <Zap className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:text-purple-700 transition-colors duration-300" />
            Try Interactive Demo
            <ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 hover:text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 h-auto rounded-xl backdrop-blur-sm transition-all duration-300 w-full sm:w-auto hover:scale-105 bg-transparent shadow-sm hover:shadow-md"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  )
}
