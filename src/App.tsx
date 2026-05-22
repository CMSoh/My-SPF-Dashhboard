/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeDashboard from './components/HomeDashboard';
import ReportPortal from './components/ReportPortal';
import ApplyPermits from './components/ApplyPermits';
import SubmitInfo from './components/SubmitInfo';
import CheckStatus from './components/CheckStatus';
import BookAppointment from './components/BookAppointment';
import PracticeTests from './components/PracticeTests';

import { MainTab, CurrentView, ReportItem, LicenseApplication } from './types';
import { INITIAL_REPORTS, INITIAL_LICENSES } from './data';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('services');
  const [currentView, setCurrentView] = useState<CurrentView>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Local database session state
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [licenses, setLicenses] = useState<LicenseApplication[]>(INITIAL_LICENSES);

  // Appending callbacks
  const addReport = (newRep: Omit<ReportItem, 'id' | 'referenceNumber' | 'subDate'>) => {
    const nextItem: ReportItem = {
      ...newRep,
      id: `rep-${Date.now()}`,
      referenceNumber: `SPF-2026${String(Math.floor(Math.random() * 900000) + 100000)}-702`,
      subDate: new Date().toISOString().split('T')[0]
    };
    setReports((prev) => [nextItem, ...prev]);
  };

  const addLicense = (newLic: Omit<LicenseApplication, 'id' | 'referenceNumber' | 'subDate'>) => {
    const nextItem: LicenseApplication = {
      ...newLic,
      id: `lic-${Date.now()}`,
      referenceNumber: `LIC-${String(Math.floor(Math.random() * 9000000) + 1000000)}-SGP`,
      subDate: 'Today'
    };
    setLicenses((prev) => [nextItem, ...prev]);
  };

  // List of searchable keywords mapping to views for autocomplete routing
  const MATCHING_SERVICES = [
    { name: 'Report a Scam / Phishing Incident', keywords: ['scam', 'fraud', 'phishing', 'money', 'scamshield', 'cheat'], view: 'report_portal', tab: 'services' },
    { name: 'Driving Licence Collection & Conversion Appointment', keywords: ['appointment', 'book', 'slot', 'convert', 'cdc', 'bbdc', 'ssdc'], view: 'book_appointment', tab: 'traffic' },
    { name: 'Practice Driving Theory Tests (BTT, FTT, RTT)', keywords: ['practice', 'theory', 'test', 'btt', 'ftt', 'rtt', 'quiz', 'question'], view: 'practice_tests', tab: 'traffic' },
    { name: 'Apply for Licences, Permits, event certificates', keywords: ['apply', 'permit', 'licence', 'weapons', 'secondhand', 'criminal', 'cncc', 'event'], view: 'apply_permits', tab: 'licences' },
    { name: 'Provide Case Clues or Crime Evidence Tip-Offs', keywords: ['evidence', 'tip', 'lead', 'drug', 'clue', 'submit', 'anonymous'], view: 'submit_info', tab: 'services' },
    { name: 'Track Application or Lodged Police Report Status', keywords: ['status', 'check', 'track', 'reference', 'singpass', 'retrieve'], view: 'check_status', tab: 'services' }
  ];

  // Filtering search outcomes
  const filteredServices = searchQuery.trim() 
    ? MATCHING_SERVICES.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleSearchResultClick = (view: CurrentView, tab: MainTab) => {
    setCurrentView(view);
    setActiveTab(tab);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50 font-sans antialiased text-gray-800" id="spf-e-services-core-app">
      
      {/* 1. Header Component */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Primary Container with Intelligent Autocomplete Search Results Overlay */}
      <div className="relative flex-grow flex flex-col">
        {searchQuery.trim() && (
          <div className="absolute top-0 inset-x-0 bg-white border-b border-gray-200 shadow-lg z-50 animate-fade-in" id="search-autocomplete-overlay">
            <div className="max-w-4xl mx-auto px-4 py-6 text-left">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <Search className="w-3.5 h-3.5" />
                Matching Singapore Police E-Services ({filteredServices.length})
              </span>

              {filteredServices.length === 0 ? (
                <div className="py-4 text-sm text-gray-500 italic">No exact match found. Please search &quot;scam&quot;, &quot;appointment&quot;, &quot;permit&quot;, &quot;status&quot; or &quot;practice&quot;.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                  {filteredServices.map((srv, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchResultClick(srv.view as CurrentView, srv.tab as MainTab)}
                      className="p-3.5 border border-gray-150 hover:border-navy-deep rounded-lg bg-gray-50/30 hover:bg-blue-50/10 text-left flex items-center justify-between group transition-all"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-navy-deep group-hover:text-amber-700 transition-colors">{srv.name}</span>
                        <p className="text-[10px] text-gray-500 capitalize">Portal: {srv.tab} • category tags: {srv.keywords.join(', ')}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Page Canvas Switch Section */}
        <div className="flex-grow flex flex-col w-full">
          {currentView === 'home' && (
            <HomeDashboard 
              setCurrentView={setCurrentView} 
              setActiveTab={setActiveTab} 
            />
          )}

          {currentView === 'report_portal' && (
            <ReportPortal 
              reports={reports} 
              addReport={addReport} 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}

          {currentView === 'apply_permits' && (
            <ApplyPermits 
              licenses={licenses} 
              addLicense={addLicense} 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}

          {currentView === 'submit_info' && (
            <SubmitInfo 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}

          {currentView === 'check_status' && (
            <CheckStatus 
              reports={reports} 
              licenses={licenses} 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}

          {currentView === 'book_appointment' && (
            <BookAppointment 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}

          {currentView === 'practice_tests' && (
            <PracticeTests 
              setCurrentView={setCurrentView}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>

      {/* 3. Footer Section */}
      <Footer />
    </div>
  );
}
