import React from 'react';
import { Mail, MapPin, Phone, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          {/* Col 1: garibook */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">
              garibook
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Customer Reviews
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="#newsroom" className="hover:text-white transition-colors">
                  Newsroom
                </a>
              </li>
              <li>
                <a
                  href="https://map.garibook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Garibook Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Intercity Rental
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Airport Pick & Drop
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Hourly Rental
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Vehicle Management System (VMS)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Become Our Partner */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">
              Become Our Partner
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#smart-driver" className="hover:text-white transition-colors">
                  Become a Smart Driver
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Become a member of Garibook Club
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Garibook Business for Corporate Travel
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">
              Contacts
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gb-primary shrink-0 mt-0.5" />
                <a href="mailto:support@garibook.com" className="hover:text-white transition-colors">
                  support@garibook.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gb-primary shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Police Plaza Concord Tower-01, 13th Floor, Plot-02, Road-144, Gulshan, Dhaka-1212
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gb-primary shrink-0 mt-0.5" />
                <a href="tel:09678112233" className="hover:text-white transition-colors">
                  +88 09 678 11 22 33
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mid Row: Download CTA & Corporate Owners (NRB Solution & Link 3) */}
        <div className="py-12 border-b border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Download App Mini Box */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-extrabold text-white">
              Download Our <br />
              Garibook Mobile App
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Book anywhere, select bids, and track your trip on Android & iOS.
            </p>
            <div>
              <a
                href="https://onelink.to/gbweb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gb-primary hover:bg-gb-primary-dark transition-all text-sm shadow active:scale-95"
              >
                <span>Download App</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product By & Powered By Badges */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* A Product By */}
            <div className="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <img
                src="/assets/images/nrb/nrb_no_background.svg"
                alt="NRB Solution Ltd."
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">A Product By</p>
                <h5 className="font-bold text-white text-sm">NRB Solution Ltd.</h5>
                <a
                  href="https://nrb-solutions.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gb-warning font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Powered By */}
            <div className="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
              <img
                src="/assets/images/clients/link3-two.png"
                alt="Link 3 Technologies"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Powered By</p>
                <h5 className="font-bold text-white text-sm">Link 3 Technologies</h5>
                <a
                  href="https://link3.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gb-warning font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Trade License Row */}
        <div className="pt-8 pb-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-6">
            <img
              src="/assets/images/gaibook-logo.svg"
              alt="Garibook"
              className="h-8 w-auto brightness-200"
            />
            <a href="#terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-right">
            <span>Trade license number: <span className="text-slate-300 font-mono">TRAD/DNCC/013806/2024</span></span>
            <span>•</span>
            <p className="text-slate-400">© 2026 Garibook.com. All rights reserved.</p>
          </div>
        </div>

        {/* SSL Commerz Trust Stripe */}
        <div className="mt-4 pt-6 border-t border-slate-900 flex justify-center">
          <div className="max-w-4xl w-full opacity-70 hover:opacity-100 transition-opacity">
            <img
              src="/assets/images/clients/ssl.png"
              alt="Verified Payment Gateways - SSL Commerz"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
