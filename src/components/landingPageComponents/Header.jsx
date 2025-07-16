import { useState, useEffect } from "react";
import { Sparkles, Menu, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Link } from "react-router";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled
          ? "backdrop-blur-xl bg-white/95 shadow-lg shadow-slate-200/50 border-b border-slate-200/60"
          : "backdrop-blur-md bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center py-4 lg:py-5">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:shadow-xl group-hover:shadow-indigo-600/30 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3">
                <Sparkles className="text-white w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-300">
                EmpTrack
              </span>
              <span className="text-xs text-slate-500 font-medium -mt-0.5 hidden sm:block group-hover:text-slate-600 transition-colors duration-300">
                Employee Management
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-600 hover:text-slate-900 font-medium transition-all duration-300 relative group py-2 px-1"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-indigo-500 group-hover:w-full transition-all duration-300 rounded-full" />
                <div className="absolute inset-0 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/login">
              <Button
                variant="default"
                className="bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 hover:text-slate-900 rounded-xl py-2.5 px-6 font-medium transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md group"
              >
                <span>Sign In</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Button>
            </Link>

            <Link to="/signup">
              <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 transition-all duration-300 hover:-translate-y-0.5 group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-slate-100 rounded-xl transition-all duration-300 p-2"
              >
                <Menu className="h-6 w-6 text-slate-600" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] sm:w-[380px] bg-gradient-to-br from-white via-white/98 to-slate-50/95 backdrop-blur-xl border-l border-slate-200/60 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/25 group-hover:shadow-xl group-hover:shadow-indigo-600/30 transition-all duration-300">
                        <Sparkles className="text-white w-6 h-6" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                    </div>
                    <div>
                      <span className="text-xl font-bold text-slate-900 tracking-tight">
                        EmpTrack
                      </span>
                      <p className="text-sm text-slate-500 font-medium">
                        Employee Management
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mt-6 h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
                </div>

                <div className="flex-1 px-6 py-2">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={handleNavClick}
                        className="group block relative overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50/50 hover:shadow-sm">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
                            <span className="text-slate-700 group-hover:text-slate-900 font-medium text-lg transition-all duration-300">
                              {item.name}
                            </span>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all duration-300" />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="pt-4 space-y-3 border-t border-slate-200/60">
                    <div className="text-center mb-4">
                      <p className="text-sm text-slate-500 font-medium">
                        Ready to get started?
                      </p>
                    </div>

                    <Link to="/login">
                      <Button
                        variant="default"
                        className="w-full bg-white/90 backdrop-blur-sm border-slate-200/80 text-slate-700 hover:text-slate-900 rounded-xl py-4 px-6 font-semibold transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md group"
                        onClick={handleNavClick}
                      >
                        <span>Sign In</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl py-4 px-6 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg group"
                        onClick={handleNavClick}
                      >
                        <span>Get Started Free</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300" />
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
  );
}
