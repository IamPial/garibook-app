import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();
  const logoSrc = lang === 'bn'
    ? '/assets/images/garibook-logo-bangla.png'
    : '/assets/images/garibook-logo.svg';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about' },
    { name: t.nav.smartDriver, href: '#smart-driver' },
    { name: t.nav.business, href: '#services' },
    { name: t.nav.club, href: '#services' },
    { name: t.nav.faq, href: '#faq' },
    { name: t.nav.blogs, href: '#blogs' },
  ];

  return (
    <>
      <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white backdrop-blur-md shadow-[0_8px_30px_rgba(13,32,31,0.08)] py-3 text-slate-800 border-b border-[#dbe9e5]'
            : 'bg-[#f8fbfa]/90 backdrop-blur-sm py-4 text-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img
                src={logoSrc}
                alt={lang === 'bn' ? 'গাড়িবুক লোগো' : 'Garibook Logo'}
                className="h-8 sm:h-9 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[13px] font-bold text-slate-600 hover:text-gb-primary transition-colors duration-150 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gb-primary hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions: Language & Login */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gb-primary bg-gb-primary-subtle/90 hover:bg-gb-primary hover:text-white rounded-full transition-all border border-gb-primary/20 shadow-xs cursor-pointer"
                title="Switch Language (English / বাংলা)"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
              </button>

              {/* Login Button */}
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gb-primary hover:bg-gb-primary-dark rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                <User className="w-4 h-4" />
                <span>{t.nav.login}</span>
              </a>
            </div>

            {/* Mobile Actions: Language + Hamburger */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <button
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center text-sm justify-center gap-2 px-4 py-2 rounded-sm font-medium text-white bg-gb-primary hover:bg-gb-primary-dark shadow transition-all"
            >
              <span>{t.nav.login}</span>
            </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-75 sm:w-87.5 bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <img
                src={logoSrc}
                alt={lang === 'bn' ? 'গাড়িবুক' : 'Garibook'}
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="py-6 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-800 hover:text-gb-primary transition-colors flex items-center justify-between py-2 px-2 rounded-xl hover:bg-slate-50"
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Language Selection in Mobile */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-gb-primary bg-gb-primary-subtle rounded-xl border border-gb-primary/20"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
