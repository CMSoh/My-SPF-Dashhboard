/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeDashboard from './components/HomeDashboard';
import ReportPortal from './components/ReportPortal';
import ApplyPermits from './components/ApplyPermits';
import SubmitInfo from './components/SubmitInfo';
import CheckStatus from './components/CheckStatus';
import BookAppointment from './components/BookAppointment';
import PracticeTests from './components/PracticeTests';
import SocialForum from './components/SocialForum';

import { MainTab, CurrentView, ReportItem, LicenseApplication } from './types';
import { INITIAL_REPORTS, INITIAL_LICENSES } from './data';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';
import { supabase } from './supabaseClient';

// Direct robust row parsing
const parseRow = (row: any): { report?: ReportItem; license?: LicenseApplication } => {
  const hasDetails = row.full_name || row.fullName || row.category || row.reference_number || row.referenceNumber;
  
  if (!hasDetails) {
    const numericId = Number(row.id) || 0;
    const isLicense = numericId % 2 === 0;
    const idStr = String(row.id);
    const subDate = row.created_at ? new Date(row.created_at).toISOString().split('T')[0] : 'Today';
    
    if (isLicense) {
      const license: LicenseApplication = {
        id: idStr,
        referenceNumber: `LIC-${String(numericId).slice(-6)}-SGP`,
        category: 'Licences & Permits',
        fullName: 'Resident User (Un-migrated payload)',
        contactNumber: '+65 **** ****',
        email: 'resident@e-services.sg',
        nric: 'SXXXX999Y',
        status: 'Pending Review',
        subDate: subDate
      };
      return { license };
    } else {
      const report: ReportItem = {
        id: idStr,
        referenceNumber: `SPF-${subDate.replace(/-/g, '')}-${String(numericId).slice(-4)}`,
        category: 'Report a Scam',
        type: 'Policed Activity Tip',
        fullName: 'Witness User (Un-migrated payload)',
        contactNumber: '+65 **** ****',
        description: `E-Service safety bulletin tip-off submitted in real-time. System status code matches record ID ${idStr}.`,
        status: 'Pending Verification',
        subDate: subDate,
        attachmentsCount: 1
      };
      return { report };
    }
  }
  
  const isLicense = row.email || row.nric || row.entity_name || row.entityName || 
                    row.category === 'Licences & Permits' || row.category === 'Events' || row.entry_type === 'license';
                    
  const idStr = String(row.id);
  const referenceNumber = row.reference_number || row.referenceNumber || `REF-${idStr}`;
  const category = row.category || 'General';
  const fullName = row.full_name || row.fullName || 'Anonymous';
  const contactNumber = row.contact_number || row.contactNumber || '';
  const status = row.status || 'Pending Verification';
  const subDate = row.sub_date || row.subDate || 'Today';
  
  if (isLicense) {
    const license: LicenseApplication = {
      id: idStr,
      referenceNumber,
      category,
      fullName,
      contactNumber,
      email: row.email || '',
      nric: row.nric || '',
      entityName: row.entity_name || row.entityName,
      status: status as any,
      subDate
    };
    return { license };
  } else {
    const report: ReportItem = {
      id: idStr,
      referenceNumber,
      category,
      type: row.type || row.entry_type || 'Police Report',
      fullName,
      contactNumber,
      description: row.description || '',
      status: status as any,
      subDate,
      attachmentsCount: Number(row.attachments_count || row.attachmentsCount || 0)
    };
    return { report };
  }
};

export default function App() {
  // Initialization of states from URL/Query Parameters first to prevent the initial "landing clickback"
  const [activeTab, setActiveTab] = useState<MainTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['services', 'traffic', 'licences', 'documents', 'social'].includes(tabParam)) {
        return tabParam as MainTab;
      }
    }
    return 'services';
  });

  const [currentView, setCurrentView] = useState<CurrentView>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const validViews = [
        'home', 'report_portal', 'scam_report', 'apply_permits', 
        'submit_info', 'check_status', 'book_appointment', 'practice_tests', 'social'
      ];
      if (viewParam && validViews.includes(viewParam)) {
        return viewParam as CurrentView;
      }
    }
    return 'home';
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize state changes to URL query params to preserve them during "Open in new Tab" or iframe updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      let changed = false;
      if (params.get('view') !== currentView) {
        params.set('view', currentView);
        changed = true;
      }
      if (params.get('tab') !== activeTab) {
        params.set('tab', activeTab);
        changed = true;
      }
      if (changed) {
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({ ...window.history.state, view: currentView, tab: activeTab }, '', newUrl);
      }
    }
  }, [currentView, activeTab]);

  // Local database session state
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [licenses, setLicenses] = useState<LicenseApplication[]>(INITIAL_LICENSES);

  // Syncing database state with Supabase and launching live listeners
  useEffect(() => {
    async function loadData() {
      try {
        const { data, error } = await supabase
          .from('entries')
          .select('*')
          .order('id', { ascending: false });
          
        if (error) {
          console.error("Error loading entries from Supabase:", error);
          return;
        }
        
        if (data && data.length > 0) {
          const fetchedReports: ReportItem[] = [];
          const fetchedLicenses: LicenseApplication[] = [];
          
          data.forEach(row => {
            const { report, license } = parseRow(row);
            if (report) fetchedReports.push(report);
            if (license) fetchedLicenses.push(license);
          });
          
          setReports(prev => {
            const existingIds = new Set(fetchedReports.map(r => r.id));
            const base = prev.filter(r => !existingIds.has(r.id));
            return [...fetchedReports, ...base];
          });
          
          setLicenses(prev => {
            const existingIds = new Set(fetchedLicenses.map(l => l.id));
            const base = prev.filter(l => !existingIds.has(l.id));
            return [...fetchedLicenses, ...base];
          });
        }
      } catch (err) {
        console.error("Failed loading Supabase data:", err);
      }
    }
    
    loadData();
    
    // Subscribe with .channel().on() so UI updates live
    const entriesChannel = supabase
      .channel('entries_realtime_stream')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'entries' },
        (payload) => {
          console.log('Real-time database payload received:', payload);
          const { eventType, new: newRow, old: oldRow } = payload;
          
          if (eventType === 'INSERT') {
            const { report, license } = parseRow(newRow);
            if (report) {
              setReports(prev => {
                if (prev.some(r => r.id === report.id)) return prev;
                return [report, ...prev];
              });
            } else if (license) {
              setLicenses(prev => {
                if (prev.some(l => l.id === license.id)) return prev;
                return [license, ...prev];
              });
            }
          } else if (eventType === 'UPDATE') {
            const { report, license } = parseRow(newRow);
            if (report) {
              setReports(prev => prev.map(r => r.id === report.id ? report : r));
            } else if (license) {
              setLicenses(prev => prev.map(l => l.id === license.id ? license : l));
            }
          } else if (eventType === 'DELETE') {
            const deletedId = String(oldRow.id);
            setReports(prev => prev.filter(r => r.id !== deletedId));
            setLicenses(prev => prev.filter(l => l.id !== deletedId));
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(entriesChannel);
    };
  }, []);

  // Appending callbacks
  const addReport = async (newRep: Omit<ReportItem, 'id' | 'referenceNumber' | 'subDate'>) => {
    // Generate valid bigint for database id
    const bigintId = Math.floor(Date.now() + Math.random() * 1000);
    const ref = `SPF-2026${String(Math.floor(Math.random() * 900000) + 100000)}-702`;
    const subDate = new Date().toISOString().split('T')[0];
    
    const nextItem: ReportItem = {
      ...newRep,
      id: String(bigintId),
      referenceNumber: ref,
      subDate: subDate
    };
    
    // Optimistic UI update
    setReports((prev) => [nextItem, ...prev]);

    // Save to database
    try {
      const { error } = await supabase.from('entries').insert([{
        id: bigintId,
        reference_number: ref,
        category: newRep.category,
        type: newRep.type,
        full_name: newRep.fullName,
        contact_number: newRep.contactNumber,
        description: newRep.description,
        status: 'Pending Verification',
        sub_date: subDate,
        attachments_count: Number(newRep.attachmentsCount || 0),
        entry_type: 'report'
      }]);
      
      if (error) {
        console.warn("Retrying with fallback minimalist Row...", error.message);
        const { error: fallbackErr } = await supabase.from('entries').insert([{ id: bigintId }]);
        if (fallbackErr) {
          console.error("Minimal insert failed:", fallbackErr.message);
        }
      }
    } catch (err) {
      console.error("Failed storing report:", err);
    }
  };

  const addLicense = async (newLic: Omit<LicenseApplication, 'id' | 'referenceNumber' | 'subDate'>) => {
    // Generate even bigint for fallback license detection
    const now = Date.now();
    const bigintId = now % 2 === 0 ? now : now + 1;
    const ref = `LIC-${String(Math.floor(Math.random() * 9000000) + 1000000)}-SGP`;
    const subDate = 'Today';
    
    const nextItem: LicenseApplication = {
      ...newLic,
      id: String(bigintId),
      referenceNumber: ref,
      subDate: subDate
    };
    
    // Optimistic UI update
    setLicenses((prev) => [nextItem, ...prev]);

    // Save to database
    try {
      const { error } = await supabase.from('entries').insert([{
        id: bigintId,
        reference_number: ref,
        category: newLic.category,
        full_name: newLic.fullName,
        contact_number: newLic.contactNumber,
        email: newLic.email,
        nric: newLic.nric,
        entity_name: newLic.entityName || null,
        status: 'Pending Review',
        sub_date: subDate,
        entry_type: 'license'
      }]);
      
      if (error) {
        console.warn("Retrying with fallback minimalist Row...", error.message);
        const { error: fallbackErr } = await supabase.from('entries').insert([{ id: bigintId }]);
        if (fallbackErr) {
          console.error("Minimal insert failed:", fallbackErr.message);
        }
      }
    } catch (err) {
      console.error("Failed storing license:", err);
    }
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

          {currentView === 'social' && (
            <SocialForum 
              article={{
                url: 'https://spf-dashboard.gov.sg/social',
                id: 'spf-citizens-dashboard-social-v1',
                title: 'Singapore Police Force Citizen Discussion Forum'
              }}
            />
          )}
        </div>
      </div>

      {/* 3. Footer Section */}
      <Footer />
    </div>
  );
}
