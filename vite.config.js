import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  server:{
    
      proxy:{
        '/api' : {target: "http://localhost:4000" , changeOrigin:true }
      }
  },
  plugins: [ 
    tailwindcss({
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
        extend: {
          colors: {
            
            border: "#d6d3d1", // stone-300
            input: "#d6d3d1", // stone-300
            ring: "#8b5cf6", // purple-500
            background: "#fafaf9", // stone-50
            foreground: "#0c0a09", // stone-950
            primary: {
              DEFAULT: "#8b5cf6", // purple-500
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#f5f5f4", // stone-100
              foreground: "#1c1917", // stone-900
            },
            destructive: {
              DEFAULT: "#ef4444", // red-500
              foreground: "#ffffff",
            },
            muted: {
              DEFAULT: "#f5f5f4", // stone-100
              foreground: "#78716c", // stone-500
            },
            accent: {
              DEFAULT: "#f5f5f4", // stone-100
              foreground: "#1c1917", // stone-900
            },
            popover: {
              DEFAULT: "#fafaf9", // stone-50
              foreground: "#0c0a09", // stone-950
            },
            card: {
              DEFAULT: "#fafaf9", // stone-50
              foreground: "#0c0a09", // stone-950
            },
            chart: {
              1: "#8b5cf6", // purple-500
              2: "#6366f1", // indigo-500
              3: "#3b82f6", // blue-500
              4: "#10b981", // emerald-500
              5: "#f59e0b", // amber-500
            },
          },
          borderRadius: {
            lg: "0.75rem",
            md: "calc(0.75rem - 2px)",
            sm: "calc(0.75rem - 4px)",
          },
          fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
          },
          keyframes: {
            "accordion-down": {
              from: { height: "0" },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: "0" },
            },
            fadeIn: {
              "0%": { opacity: "0", transform: "translateY(20px)" },
              "100%": { opacity: "1", transform: "translateY(0)" },
            },
            fadeInUp: {
              "0%": { opacity: "0", transform: "translateY(30px)" },
              "100%": { opacity: "1", transform: "translateY(0)" },
            },
            slideInUp: {
              "0%": { opacity: "0", transform: "translateY(40px)" },
              "100%": { opacity: "1", transform: "translateY(0)" },
            },
            slideInLeft: {
              "0%": { opacity: "0", transform: "translateX(-30px)" },
              "100%": { opacity: "1", transform: "translateX(0)" },
            },
            slideInRight: {
              "0%": { opacity: "0", transform: "translateX(30px)" },
              "100%": { opacity: "1", transform: "translateX(0)" },
            },
            scaleIn: {
              "0%": { opacity: "0", transform: "scale(0.9)" },
              "100%": { opacity: "1", transform: "scale(1)" },
            },
            float: {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
            shimmer: {
              "0%": { backgroundPosition: "-200% 0" },
              "100%": { backgroundPosition: "200% 0" },
            },
            gradient: {
              "0%, 100%": { backgroundPosition: "0% 50%" },
              "50%": { backgroundPosition: "100% 50%" },
            },
            pulse: {
              "0%, 100%": { opacity: "1" },
              "50%": { opacity: "0.5" },
            },
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "fade-in-up": "fadeInUp 0.8s ease-out forwards",
            "slide-in-up": "slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "slide-in-left": "slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "slide-in-right": "slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            "float": "float 6s ease-in-out infinite",
            "shimmer": "shimmer 2s infinite",
            "gradient": "gradient 4s ease infinite",
            "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          },
          backdropBlur: {
            xs: "2px",
          },
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["lucide-react", "@radix-ui/react-collapsible", "@radix-ui/react-dialog"],
        },
      },
    },
  },
  
})
