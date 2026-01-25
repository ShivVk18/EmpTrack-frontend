import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-orange-50">
      {/* Animated gradient orbs matching hero/FAQ */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl mb-6 shadow-xl shadow-amber-500/20 transform hover:scale-110 transition-all duration-500">
          <Sparkles className="w-8 h-8 text-amber-700" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900 leading-tight">
          Ready to Transform Your
          <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Workforce Management?
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Join hundreds of companies using EmpTrack to streamline HR operations. Start your free trial today—no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
          <Button
            size="lg"
            className="group bg-amber-700 hover:bg-amber-800 text-white text-lg px-8 py-4 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold"
          >
            <Zap className="mr-3 h-5 w-5" />
            Start Free Trial
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-2 border-neutral-300 text-neutral-700 hover:bg-amber-50 hover:border-amber-600 text-lg px-8 py-4 h-auto rounded-lg transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold bg-transparent"
          >
            Schedule Demo
          </Button>
        </div>

        {/* Simple trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-neutral-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">10,000+</div>
            <div className="text-sm text-neutral-600 font-medium">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">500+</div>
            <div className="text-sm text-neutral-600 font-medium">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-900">4.9★</div>
            <div className="text-sm text-neutral-600 font-medium">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}