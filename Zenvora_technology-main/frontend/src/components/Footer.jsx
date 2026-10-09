import { Link } from 'react-router-dom'
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Youtube
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Glow effects */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute right-10 bottom-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="roboto-bold text-2xl text-white">
                Zenvora Technology
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              Transforming Ideas Into Powerful Digital Solutions.
            </p>
          </div>

          {/* Column 1: Quick Links */}
          <div>
            <h4 className="roboto-bold text-sm text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-sky-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sky-400 transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Learning */}
          <div>
            <h4 className="roboto-bold text-sm text-white uppercase tracking-wider mb-4">
              Learning
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-sky-400 transition-colors">Courses</Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-sky-400 transition-colors">Internships</Link>
              </li>
              <li>
                <Link to="/certificate/verify" className="hover:text-sky-400 transition-colors">Certifications</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-400 transition-colors">Career Guidance</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="roboto-bold text-sm text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="tel:+919025168077" className="hover:text-sky-400 transition-colors">
                  +91 9025168077
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919042938077" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                  +91 9042938077 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <a href="mailto:zenvoratechnologyinfo@gmail.com" className="hover:text-sky-400 transition-colors">
                  zenvoratechnologyinfo@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">Coimbatore, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and social icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Zenvora Technology. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

