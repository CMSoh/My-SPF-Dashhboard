/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldAlert, Facebook, Twitter, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-gray-100 border-t border-gray-200" id="footer-spf">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-200 pb-6 mb-6">
          
          {/* Main Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-sans text-lg font-bold text-navy-deep">Singapore Police Force</span>
            <p className="text-xs text-gray-500 mt-1">
              A State Organ of the Republic of Singapore dedicated to safeguarding the nation.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © {new Date().getFullYear()} Singapore Police Force. All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-600">
            <a href="https://www.tech.gov.sg/report-vulnerability/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1 text-gray-500 hover:text-navy-deep">
              <ShieldAlert className="w-3.5 h-3.5 text-spf-red" />
              Report Vulnerability
            </a>
            <a href="#" className="hover:underline hover:text-navy-deep">Privacy Statement</a>
            <a href="#" className="hover:underline hover:text-navy-deep">Terms of Use</a>
            <a href="#" className="hover:underline hover:text-navy-deep">Rate our Service</a>
            <a href="#" className="hover:underline hover:text-navy-deep">Contact Us</a>
          </div>

          {/* Social Profiles */}
          <div className="flex gap-4">
            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-navy-deep text-gray-500 hover:text-navy-deep flex items-center justify-center transition-all shadow-sm">
              <Facebook className="w-4 h-4 fill-current" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-navy-deep text-gray-500 hover:text-navy-deep flex items-center justify-center transition-all shadow-sm">
              <Twitter className="w-4 h-4 fill-current" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:border-[#0070B8] text-gray-500 hover:text-[#0070B8] flex items-center justify-center transition-all shadow-sm" title="SingGov Verified Secure">
              <ShieldCheck className="w-4 h-4 text-[#0070B8] fill-blue-50" />
            </button>
          </div>
        </div>

        {/* Bottom micro notice */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 gap-2">
          <p>
            For physical emergency requiring immediate police vehicle deployment or ambulance dispatch, call <strong>999</strong> or SMS <strong>71999</strong>.
          </p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            <span>All reports processed via Secure Government Cryptographic Gateways.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
