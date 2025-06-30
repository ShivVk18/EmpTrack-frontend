import { useState, useEffect } from "react"
import { Sparkles, Menu, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-stone-50/95 shadow-lg border-b border-stone-200/50"
          : "backdrop-blur-sm bg-stone-50/80"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center py-3 sm:py-4 lg:py-5">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">EmpTrack</span>
              <span className="text-xs text-slate-600 font-medium -mt-0.5 hidden sm:block">Employee Management</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-slate-900 font-medium transition-all duration-300 relative group py-2 text-sm xl:text-base"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <Button
              variant="ghost"
              className="text-slate-700 hover:text-slate-900 hover:bg-stone-100 font-medium px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg transition-all duration-300 text-sm xl:text-base"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-medium px-4 xl:px-6 py-2 xl:py-2.5 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group text-sm xl:text-base">
              Get Started
              <ArrowRight className="ml-1.5 xl:ml-2 h-3 w-3 xl:h-4 xl:w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-stone-100 rounded-lg transition-all duration-300 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-stone-50 border-l border-stone-200">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu for EmpTrack application</SheetDescription>
                <div className="flex flex-col space-y-6 mt-6 sm:mt-8">
                  <div className="flex items-center space-x-3 pb-6 border-b border-stone-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-lg font-bold text-slate-900">EmpTrack</span>
                      <p className="text-xs text-slate-600">Employee Management</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-slate-700 hover:text-slate-900 font-medium rounded-lg hover:bg-stone-100 transition-all duration-300 text-sm sm:text-base"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  <div className="pt-6 space-y-3 border-t border-stone-200">
                    <Button
                      variant="outline"
                      className="w-full border-stone-300 text-slate-700 hover:bg-stone-100 rounded-lg py-3 transition-all duration-300 bg-transparent text-sm sm:text-base"
                    >
                      Sign In
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 rounded-lg py-3 transition-all duration-300 text-sm sm:text-base">
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
