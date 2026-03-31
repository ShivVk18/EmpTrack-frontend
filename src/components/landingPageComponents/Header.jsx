import { useState, useEffect } from "react";
import { Sparkles, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router";
import { motion } from "motion/react";

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
    <>
      <div className="h-20 lg:h-24"></div>
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "top-3 w-[95%] max-w-5xl"
            : "top-6 w-[96%] max-w-7xl"
        }`}
      >
        <div 
          className={`relative backdrop-blur-xl bg-amber-50/90 border border-amber-200/80 rounded-full shadow-lg transition-all duration-300 ${
            isScrolled 
              ? "shadow-[0_18px_45px_rgba(180,83,9,0.25)]" 
              : "shadow-[0_20px_55px_rgba(217,119,6,0.35)]"
          }`}
        >
          {/* Subtle Inner glow for premium effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-100/40 via-transparent to-orange-100/40 pointer-events-none"></div>

          <div className="relative flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 lg:py-3.5">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-amber-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-900/30 group-hover:shadow-lg group-hover:shadow-amber-900/40 transition-all duration-200 group-hover:scale-[1.03]">
                  <Sparkles className="text-amber-50 w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-6 transition-transform duration-200" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-amber-950 tracking-tight transition-colors duration-300">
                  EmpTrack
                </span>
                <span className="text-[10px] text-amber-800/80 font-medium -mt-0.5 hidden sm:block">
                  Employee Management
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-sm text-amber-900/80 hover:text-amber-950 font-medium transition-all duration-200 px-4 py-2 rounded-full overflow-hidden group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-amber-100/90 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-amber-900 hover:text-amber-950 hover:bg-amber-100 rounded-full py-2 px-5 font-medium transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-2 rounded-full shadow-md shadow-amber-900/40 transition-all duration-200 hover:scale-[1.02] group">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-amber-100 rounded-full transition-all duration-200 p-2"
                >
                  <Menu className="h-5 w-5 text-amber-800" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
                <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] bg-amber-50/95 backdrop-blur-xl border-l border-amber-200 p-0 rounded-l-3xl shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  <div className="px-6 pt-8 pb-6 border-b border-amber-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-900/40">
                        <Sparkles className="text-amber-50 w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-amber-950 tracking-tight">
                          EmpTrack
                        </span>
                        <p className="text-sm text-amber-800/80 font-medium">
                          Employee Management
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 px-4 py-6">
                    <div className="space-y-1">
                      {navItems.map((item, index) => (
                        <motion.a
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center justify-between px-4 py-4 rounded-xl text-amber-900 hover:bg-amber-100 hover:text-amber-950 font-medium text-lg transition-all duration-200"
                        >
                          {item.name}
                          <ArrowRight className="h-4 w-4 opacity-50" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="px-6 pb-8">
                    <div className="space-y-3 pt-6 border-t border-amber-100">
                      <Link to="/login">
                        <Button
                          variant="outline"
                          className="w-full bg-white border-amber-200 text-amber-900 rounded-xl py-6 font-semibold transition-all duration-200 hover:bg-amber-50"
                          onClick={handleNavClick}
                        >
                          Log In
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button
                          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl py-6 transition-all duration-200 shadow-md shadow-amber-900/40"
                          onClick={handleNavClick}
                        >
                          Get Started Free
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
}