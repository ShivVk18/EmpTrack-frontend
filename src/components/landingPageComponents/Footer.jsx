import { Sparkles, Github, Linkedin, Code } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Code, href: "#", label: "Portfolio" },
  ]

  return (
    <footer className="bg-white border-t border-amber-100 text-amber-950 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-50/90 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Brand */}
          <div className="flex items-center space-x-4 group">
            <div className="relative w-12 h-12 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
              <Sparkles className="text-amber-600 w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-semibold tracking-tight text-amber-950 block">
                EmpTrack
              </span>
              <p className="text-amber-700 text-sm font-medium mt-0.5">
                Calm, modern employee management
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-2.5 rounded-xl text-amber-500 hover:text-amber-700 bg-amber-50 border border-amber-100 hover:border-amber-200 hover:bg-amber-100 transition-all duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-amber-100 mt-6 pt-4 text-center flex flex-col items-center">
          <p className="text-amber-700 font-normal text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} EmpTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}