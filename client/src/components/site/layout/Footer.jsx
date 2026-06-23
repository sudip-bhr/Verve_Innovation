import { NavLink } from 'react-router-dom';
const darkLogo = 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782109440/Dark_Theme_Logo.svg';
const lightLogo = 'https://res.cloudinary.com/dgcgovg0x/image/upload/v1782109442/Light_Theme_Logo.svg';
export default function Footer() {
  const navLinks = [
    { name: 'Solutions', path: '/' },
    { name: 'Cases', path: '/cases' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-verve-bg-secondary pt-12 pb-6 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Logo & Tagline */}
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-4">
              <img src={darkLogo} alt="Verve Innovation" className="hidden dark:block h-16 w-auto" />
              <img src={lightLogo} alt="Verve Innovation" className="block dark:hidden h-16 w-auto" />
            </div>
            <p className="text-verve-text-secondary font-body max-w-sm text-sm leading-relaxed">
              Designing digital experiences that define the future of premium technology.
            </p>
          </div>

          {/* Right Column - Navigation */}
          <div className="flex flex-col items-start md:items-end space-y-3 mt-4 md:mt-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="font-body text-base md:text-lg hover:text-verve-orange transition-colors text-verve-text-primary"
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-verve-border mb-6" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm font-body text-verve-text-secondary space-y-4 md:space-y-0">
          <p className="text-verve-accent-blue">
            © {new Date().getFullYear()} Verve Innovation. All rights reserved.
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 lg:space-x-12">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-verve-text-primary transition-colors">LinkedIn</a>
              <a href="https://www.facebook.com/profile.php?id=61590618466746" target="_blank" rel="noopener noreferrer" className="hover:text-verve-text-primary transition-colors">Facebook</a>
              <a href="https://www.instagram.com/verveinnovation/" target="_blank" rel="noopener noreferrer" className="hover:text-verve-text-primary transition-colors">Instagram</a>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-verve-text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-verve-text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
