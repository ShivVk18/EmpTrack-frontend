import { Sparkles } from "lucide-react"

export default function AuthHeader() {
  return (
    <header className="w-full py-2 sm:py-3 px-3 sm:px-4 lg:px-8 bg-white/90 backdrop-blur-md border-b border-stone-200/50 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center w-full">
        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer transition-all duration-300 hover:scale-102">
          <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
            <Sparkles className="text-white w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:animate-pulse" />
          </div>
          
          <div className="flex flex-col items-start">
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-slate-800 transition-colors duration-300">
              Emp<span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Track</span>
            </span>
            <span className="text-xs sm:text-sm text-slate-600 hidden sm:block group-hover:text-indigo-600 transition-colors duration-300">Employee Management</span>
          </div>
        </div>
      </div>
    </header>
  )
}