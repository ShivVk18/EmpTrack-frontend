import { useState, useEffect } from "react";
import { Sparkles, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-20 lg:h-24"></div>
      
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? "top-3 w-[95%] max-w-6xl"
            : "top-6 w-[96%] max-w-7xl"
        }`}
      >
        <div 
          className={`relative backdrop-blur-2xl bg-white/70 border border-white/40 rounded-full shadow-2xl transition-all duration-700 ${
            isScrolled 
              ? "shadow-amber-500/10" 
              : "shadow-amber-500/20"
          }`}
        >
          {/* Glassmorphism shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 blur-xl"></div>

          <div className="relative flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:shadow-xl group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight group-hover:text-amber-700 transition-colors duration-300">
                  EmpTrack
                </span>
                <span className="text-[10px] text-neutral-500 font-medium -mt-0.5 hidden sm:block group-hover:text-neutral-600 transition-colors duration-300">
                  Employee Management
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-neutral-700 hover:text-neutral-900 font-semibold transition-all duration-300 group px-5 py-2.5 rounded-full"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background with glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" />
                  {/* Subtle shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link to="/login">
                <Button
                  variant="default"
                  className="bg-white/60 backdrop-blur-md border border-white/60 text-neutral-700 hover:text-neutral-900 rounded-full py-2 px-5 font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:scale-105 group"
                >
                  <span>Sign In</span>
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-amber-100/80 backdrop-blur-sm rounded-full transition-all duration-300 p-2"
                >
                  <Menu className="h-5 w-5 text-neutral-700" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] bg-white/95 backdrop-blur-2xl border-l border-white/60 p-0 rounded-l-3xl"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 pt-8 pb-6">
                    <div className="flex items-center space-x-3 group">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/40 group-hover:shadow-xl group-hover:shadow-amber-500/50 transition-all duration-300">
                          <Sparkles className="text-white w-6 h-6" />
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-300" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-neutral-900 tracking-tight">
                          EmpTrack
                        </span>
                        <p className="text-sm text-neutral-600 font-medium">
                          Employee Management
                        </p>
                      </div>
                    </div>

                    {/* Gradient Divider */}
                    <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 px-6 py-2">
                    <div className="space-y-2">
                      {navItems.map((item, index) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className="group block relative overflow-hidden"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-50/80 hover:to-orange-50/80 backdrop-blur-sm hover:shadow-md border-2 border-transparent hover:border-amber-200/50">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
                              <span className="text-neutral-700 group-hover:text-neutral-900 font-semibold text-lg transition-all duration-300">
                                {item.name}
                              </span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-neutral-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-amber-600 transition-all duration-300" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="px-6 pb-8">
                    <div className="pt-4 space-y-3 border-t border-amber-200/30">
                      <div className="text-center mb-4 mt-2">
                        <p className="text-sm text-neutral-600 font-semibold">
                          Ready to get started?
                        </p>
                      </div>

                      <Link to="/login">
                        <Button
                          variant="default"
                          className="w-full bg-white/80 backdrop-blur-sm border-2 border-neutral-200/60 text-neutral-700 hover:text-neutral-900 rounded-2xl py-4 px-6 font-bold transition-all duration-300 hover:bg-white hover:border-amber-300 hover:shadow-lg hover:scale-105 group"
                          onClick={handleNavClick}
                        >
                          <span>Sign In</span>
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button
                          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold rounded-2xl py-4 px-6 transition-all duration-300 shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105 group"
                          onClick={handleNavClick}
                        >
                          <span>Get Started Free</span>
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}