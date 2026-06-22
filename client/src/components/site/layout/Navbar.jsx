import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { cn } from '../../../lib/utils';
import { Moon, Sun, Menu, X } from 'lucide-react';
import api from '../../../lib/api';
const darkLogo = 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782109440/Dark_Theme_Logo.svg';
const lightLogo = 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782109442/Light_Theme_Logo.svg';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch live case count
  useEffect(() => {
    api.get('/cases?count=true')
      .then((res) => {
        if (res.data?.success) setCaseCount(res.data.count);
      })
      .catch(() => {
        // Silently fail if API isn't up, just keep count at 0 or fallback
        setCaseCount(17); // Fallback to 20 based on Figma
      });
  }, []);

  const navLinks = [
    { name: 'Intro', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Cases', path: '/cases', badge: caseCount },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 lg:px-12 py-4',
        isScrolled ? 'py-3' : 'py-5'
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto rounded-pill border border-white/10 dark:border-white/5 transition-all duration-300 flex items-center justify-between px-6 py-3',
          isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-black/70 shadow-sm' : 'backdrop-blur-lg bg-white/50 dark:bg-black/40'
        )}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={darkLogo} alt="Verve Innovation" className="hidden dark:block h-12 md:h-18 w-auto" />
          <img src={lightLogo} alt="Verve Innovation" className="block dark:hidden h-12 md:h-18 w-auto" />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'relative px-5 py-2 text-sm font-body font-medium transition-colors rounded-pill',
                  isActive
                    ? 'text-verve-text-primary bg-black/5 dark:bg-white/10'
                    : 'text-verve-text-secondary hover:text-verve-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                )
              }
            >
              {link.name}
              {link.badge !== undefined && (
                <span className="ml-1 text-[0.65rem] font-bold text-verve-orange align-top">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-verve-text-secondary hover:text-verve-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Let's Talk CTA */}
          <NavLink
            to="/contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-black bg-verve-orange rounded-pill hover:bg-amber-400 transition-colors shadow-lg shadow-orange-500/20"
          >
            Let's Talk
          </NavLink>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-verve-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-verve-border shadow-2xl md:hidden flex flex-col space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive ? 'bg-verve-bg-secondary text-verve-orange' : 'text-verve-text-primary hover:bg-verve-bg-secondary'
                )
              }
            >
              {link.name}
              {link.badge !== undefined && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-verve-orange/10 text-verve-orange text-xs">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 text-center px-4 py-3 text-base font-medium text-black bg-verve-orange rounded-lg"
          >
            Let's Talk
          </NavLink>
        </div>
      )}
    </header>
  );
}
