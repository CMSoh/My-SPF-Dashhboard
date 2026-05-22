/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, Lock, Building } from 'lucide-react';
import { MainTab, CurrentView } from '../types';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  setCurrentView: (view: CurrentView) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  setCurrentView,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMastheadOpen, setIsMastheadOpen] = useState(false);

  // Navigation mapping to current view
  const handleTabClick = (tab: MainTab) => {
    setActiveTab(tab);
    if (tab === 'services') {
      setCurrentView('home');
    } else if (tab === 'traffic') {
      // Traffic tab automatically sets view to book appointment or practice
      setCurrentView('book_appointment');
    } else if (tab === 'licences') {
      setCurrentView('apply_permits');
    } else if (tab === 'documents') {
      // Goes to the default document view which we can show inside apply/permits or special sections
      setCurrentView('apply_permits');
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" id="header-spf">
      {/* Singapore Government Masthead */}
      <div className="w-full bg-[#f0f0f0] border-b border-gray-200 text-[#4b5563] text-[11px] font-sans" id="sg-masthead">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
          <div className="flex items-center justify-between h-[30px] py-1">
            <div className="flex items-center gap-2 select-none">
              {/* Crimson Red & White SG Flag miniature representation */}
              <div className="w-4 h-2.5 flex flex-col border border-gray-300 overflow-hidden shrink-0" aria-hidden="true">
                <div className="h-1/2 bg-[#D12B2F]"></div>
                <div className="h-1/2 bg-white"></div>
              </div>
              <p className="text-gray-600 font-medium tracking-tight">An official website of the Singapore Government</p>
            </div>
            <button
              onClick={() => setIsMastheadOpen(!isMastheadOpen)}
              className="text-[#00205B] hover:text-[#001438] hover:underline flex items-center gap-1 font-semibold select-none bg-transparent border-none p-0 cursor-pointer"
              aria-expanded={isMastheadOpen}
              aria-controls="sg-masthead-dropdown"
              id="btn-masthead-toggle"
            >
              <span>How to identify</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isMastheadOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expandable Dropdown Info Section */}
          {isMastheadOpen && (
            <div 
              className="py-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-left pb-5" 
              id="sg-masthead-dropdown"
            >
              {/* Column 1: Trusted domain name */}
              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-gray-200 rounded-full text-gray-700 shrink-0 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-[11.5px] mb-0.5">Official website links end with .gov.sg</h4>
                  <p className="text-gray-600 leading-normal text-[10.5px]">
                    Government agencies check their website addresses to ensure they end with <span className="font-bold font-mono">.gov.sg</span> (e.g. go.gov.sg/open). Scan for the <span className="font-bold font-mono font-sans">.gov.sg</span> domain name. Only websites with this domain suffix are official government websites.
                  </p>
                </div>
              </div>

              {/* Column 2: Lock and Secure Connection check */}
              <div className="flex gap-3 items-start">
                <div className="p-1.5 bg-gray-200 rounded-full text-gray-700 shrink-0 mt-0.5">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-[11.5px] mb-0.5">Secure connection</h4>
                  <p className="text-gray-600 leading-normal text-[10.5px]">
                    Look for a lock (<span className="inline-block shrink-0">🔒</span> or <span className="font-semibold font-mono">https://</span> in the address bar) as an added precaution. Share sensitive information only on official, secure websites.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* Crest Logo & Brand Title */}
        <div 
          className="flex items-center gap-3.5 cursor-pointer select-none py-1.5"
          onClick={() => {
            setActiveTab('services');
            setCurrentView('home');
          }}
          id="header-brand"
        >
          <img 
            alt="Singapore Police Force Crest" 
            className="h-14 w-auto object-contain shrink-0" 
            referrerPolicy="no-referrer"
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Singapore_Police_Force_crest.svg"
          />
          <div className="flex flex-col text-left font-sans justify-center">
            <span className="text-sm sm:text-[15px] font-extrabold tracking-[0.03em] text-[#00205B] uppercase leading-none">
              SINGAPORE
            </span>
            <span className="text-sm sm:text-[15px] font-extrabold tracking-[0.03em] text-[#00205B] uppercase leading-none mt-[3px]">
              POLICE FORCE
            </span>
            {/* Dynamic separator gradient color bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#00205B] via-[#00205B] to-[#D12B2F] mt-[5px] mb-[4px]"></div>
            <span className="text-[8px] sm:text-[9.5px] font-bold text-[#4B5563] tracking-[0.06em] uppercase leading-none">
              SAFEGUARDING EVERY DAY
            </span>
          </div>
        </div>

        {/* Desktop Main Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {(['services', 'traffic', 'licences', 'documents'] as MainTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`h-full px-2 border-b-2 flex items-center capitalize text-sm font-medium transition-colors duration-200 select-none ${
                activeTab === tab
                  ? 'border-navy-deep text-navy-deep font-bold'
                  : 'border-transparent text-gray-500 hover:text-navy-deep'
              }`}
              id={`nav-link-${tab}`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Global Search and Personal Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative hidden lg:block" id="header-search-container">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 border border-gray-200 rounded-md py-1.5 pl-10 pr-4 text-xs font-medium w-60 focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep text-gray-800 transition-all placeholder:text-gray-400"
              id="header-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick action badges */}
          <button 
            className="relative p-2 text-gray-500 hover:bg-gray-100 hover:text-navy-deep rounded-full transition-all"
            title="Notifications"
            id="btn-bell"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-spf-red rounded-full ring-2 ring-white"></span>
          </button>
          
          <button 
            onClick={() => {
              // Quick jump to check status or profile mock Singpass status
              setActiveTab('services');
              setCurrentView('check_status');
            }}
            className="flex items-center gap-1.5 p-1 pl-3 pr-2.5 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            title="Singpass ID Portal"
            id="btn-user-singpass"
          >
            <span className="hidden sm:inline text-xs font-semibold text-navy-deep">Sign In</span>
            <User className="h-4 w-4 text-navy-deep" />
          </button>
        </div>
      </div>

      {/* Mobile Bar Search */}
      <div className="block lg:hidden border-t border-gray-100 bg-gray-50/50 px-4 py-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search Singapore Police e-services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-md py-1.5 pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-navy-deep"
            id="mobile-search-input"
          />
        </div>
      </div>
    </header>
  );
}
