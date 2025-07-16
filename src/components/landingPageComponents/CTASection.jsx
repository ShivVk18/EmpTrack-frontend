import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-indigo-600">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-700"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
        <Badge className="mb-8 px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          Development Preview Available
        </Badge>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight text-white">
          Ready to Experience
          <span className="block text-indigo-100">EmpTrack?</span>
        </h2>

        <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-indigo-100 leading-relaxed font-light">
          Explore the future of employee management with our interactive demo.
          Experience modern HR technology designed for today's workforce.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
          <Button
            size="lg"
            className="group bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 text-lg px-8 py-4 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold"
          >
            <Zap className="mr-3 h-5 w-5 group-hover:text-indigo-700 transition-colors duration-300" />
            Try Interactive Demo
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-lg px-8 py-4 h-auto rounded-lg backdrop-blur-sm transition-all duration-300 w-full sm:w-auto hover:scale-105 font-semibold bg-transparent"
          >
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
