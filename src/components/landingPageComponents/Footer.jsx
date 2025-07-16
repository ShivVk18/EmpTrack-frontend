import { Sparkles, Github, Linkedin, Code } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Code, href: "#", label: "Portfolio" },
  ]

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-8 sm:space-y-0">
         
          <div className="flex items-center space-x-4 group">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">EmpTrack</span>
              <p className="text-slate-400 text-sm font-medium">End-to-End Employee Management Platform</p>
            </div>
          </div>

          
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group p-3 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>

        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400 font-light">&copy; 2025 EmpTrack. Professional development showcase.</p>
        </div>
      </div>
    </footer>
  )
}
