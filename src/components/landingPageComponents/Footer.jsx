import { Sparkles, Github, Linkedin, Code } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Code, href: "#", label: "Portfolio" },
  ]

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Dot pattern background */}
      

      {/* Gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600"></div>

      {/* Subtle corner gradients */}
     

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-5 group">
            <div className="relative w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Sparkles className="text-white w-8 h-8" />
              {/* Glow effect */}
             
            </div>
            <div>
              <span className="text-2xl font-bold text-white block">EmpTrack</span>
              <p className="text-neutral-400 text-sm font-medium">Employee Management Platform</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-4 rounded-xl text-neutral-400 hover:text-white bg-neutral-800 hover:bg-gradient-to-br hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-neutral-500 font-light text-base">&copy; 2025 EmpTrack. Professional development showcase.</p>
        </div>
      </div>
    </footer>
  )
}