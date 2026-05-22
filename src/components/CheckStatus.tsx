/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  ShieldCheck, 
  Lock, 
  UserSquare2, 
  FileSearch, 
  RefreshCw, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ReportItem, LicenseApplication } from '../types';

interface CheckStatusProps {
  reports: ReportItem[];
  licenses: LicenseApplication[];
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function CheckStatus({ reports, licenses, setCurrentView, setActiveTab }) {
  const [refQuery, setRefQuery] = useState('');
  const [nricQuery, setNricQuery] = useState('');
  const [singpassLoggedIn, setSingpassLoggedIn] = useState(false);
  
  // Retrieved active state
  const [activeSearchResult, setActiveSearchResult] = useState<any | null>(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Singpass auth simulator
  const handleSingpassLogin = () => {
    setSingpassLoggedIn(!singpassLoggedIn);
    setActiveSearchResult(null);
    setSearchTriggered(false);
  };

  const handleManualRetrieve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refQuery) return;

    // Check inside reports
    const reportMatch = reports.find(
      (r) => r.referenceNumber.toLowerCase().trim() === refQuery.toLowerCase().trim()
    );

    // Check inside licenses
    const licenseMatch = licenses.find(
      (l) => l.referenceNumber.toLowerCase().trim() === refQuery.toLowerCase().trim()
    );

    if (reportMatch) {
      setActiveSearchResult({ type: 'report', data: reportMatch });
    } else if (licenseMatch) {
      setActiveSearchResult({ type: 'license', data: licenseMatch });
    } else {
      setActiveSearchResult(null);
    }

    setSearchTriggered(true);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="check-status-view">
      
      {/* Banner */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="status-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute bottom-5 right-5 w-80 h-80 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => setSearchTriggered(false)} className="hover:underline">Services</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Check Status</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Track Application or Report
          </h1>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Enter your transaction code and NRIC below to fetch official updates instantly, or authorize a Singpass session for comprehensive history retrieval.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Verification Form */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xs p-5 space-y-4">
              <div className="border-b border-gray-150 pb-3 text-left">
                <h3 className="font-sans text-sm font-bold text-navy-deep">Retrieve Record</h3>
                <p className="text-[10px] text-gray-500">Provide registration tags manually</p>
              </div>

              <form onSubmit={handleManualRetrieve} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-navy-deep">Reference Number</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. SPF-20261012-702"
                    value={refQuery}
                    onChange={(e) => setRefQuery(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-navy-deep">Identity Document (NRIC/FIN)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SXXXX123E"
                    value={nricQuery}
                    onChange={(e) => setNricQuery(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00205B] hover:bg-[#001438] text-white py-2 rounded font-bold text-xs tracking-wide transition-colors shadow-sm cursor-pointer"
                >
                  Retrieve Record
                </button>
              </form>

              {/* Divider lines */}
              <div className="flex items-center gap-3 select-none text-[10px] font-bold text-gray-400">
                <div className="h-[1px] bg-gray-200 flex-grow"></div>
                <span>OR RETRIEVE VIA</span>
                <div className="h-[1px] bg-gray-200 flex-grow"></div>
              </div>

              {/* Singpass National Gateway button (Screenshot Style) */}
              <button 
                onClick={handleSingpassLogin}
                className={`w-full py-2.5 px-4 h-auto rounded flex items-center justify-center gap-2 font-bold text-xs tracking-wide transition-all shadow-sm border ${
                  singpassLoggedIn 
                    ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100/50' 
                    : 'bg-[#DA291C] hover:bg-[#c02419] border-[#DA291C] text-white'
                }`}
                id="btn-singpass-status"
              >
                <Lock className="w-4 h-4" />
                {singpassLoggedIn ? 'Singpass Authorized (Log Out)' : 'Log in with Singpass'}
              </button>
            </div>
            
            {/* Quick tips panel */}
            <div className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl text-left text-xs leading-normal text-gray-600 select-none">
              <span className="font-bold text-navy-deep flex items-center gap-1 mb-1">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                Validating security records
              </span>
              <p>For credentials matching search criteria, details are decrypted locally for active operations checks. Make sure the NRIC matches the reference item complainant identifier.</p>
            </div>
          </aside>

          {/* Right workspace panel: Status Display */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-xs p-6 sm:p-8 min-h-[500px]">
            
            {singpassLoggedIn ? (
              /* RETRIEVED COMPREHENSIVE LIST UNDER ACTIVE SINGPASS SESSION */
              <div id="singpass-status-panel" className="text-left space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-blue-50/50 border border-blue-150 p-4 rounded-xl">
                  <div>
                    <h3 className="font-sans text-sm font-bold text-navy-deep flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0070B8] fill-blue-50" />
                      Singpass Verified Portal
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-1">Showing all files under NRIC reference database linkage.</p>
                  </div>
                  <span className="bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded text-[10px] font-bold">NRIC Verified</span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-navy-deep uppercase tracking-wider">Reports Log ({reports.length})</h4>
                  {reports.map((rep) => (
                    <div key={rep.id} className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <p className="font-mono text-xs font-bold text-gray-700">{rep.referenceNumber}</p>
                        <p className="text-xs font-bold text-navy-deep">{rep.category} • {rep.fullName}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{rep.description}</p>
                      </div>
                      <div className="my-auto self-end md:self-center">
                        <span className={`px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-full ${
                          rep.status === 'Completed' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-750'
                        }`}>{rep.status}</span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-150 space-y-4">
                    <h4 className="text-xs font-bold text-navy-deep uppercase tracking-wider">Permits and Licences ({licenses.length})</h4>
                    {licenses.map((lic) => (
                      <div key={lic.id} className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <p className="font-mono text-xs font-bold text-gray-750">{lic.referenceNumber}</p>
                          <p className="text-xs font-bold text-navy-deep">{lic.category} • {lic.fullName}</p>
                          <p className="text-[11px] text-gray-500">Proposed: {lic.entityName || 'Individual licence configuration'}</p>
                        </div>
                        <div className="my-auto self-end md:self-center">
                          <span className={`px-2.5 py-1 text-[10px] font-semibold tracking-wide rounded-full ${
                            lic.status === 'Approved' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-blue-100 text-blue-750'
                          }`}>{lic.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : searchTriggered ? (
              /* DETAILED CASE TRACKING PROGRESS GRAPH (Screenshot 6 Workspace) */
              <div id="case-track-result" className="text-left space-y-6">
                {activeSearchResult ? (
                  <div className="space-y-8">
                    {/* Brief notes Header */}
                    <div className="border-b border-gray-150 pb-4">
                      <p className="font-mono text-xs font-bold text-navy-deep bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                        {activeSearchResult.data.referenceNumber}
                      </p>
                      <h2 className="font-sans text-xl font-bold text-navy-deep mt-2">
                        {activeSearchResult.data.category || 'Licence Application'} status
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">complainant: {activeSearchResult.data.fullName} • submitted: {activeSearchResult.data.subDate || '2026-05-18'}</p>
                    </div>

                    {/* Progress tracking path graph */}
                    <div className="py-2">
                      <p className="text-xs font-bold text-navy-deep uppercase tracking-wider mb-6">Execution Steps Tracker</p>
                      <div className="relative flex justify-between items-center w-full max-w-xl mx-auto px-4">
                        {/* Core Line background */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
                        <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-[#00205B] -translate-y-1/2 -z-10 transition-all duration-500"></div>

                        {/* Step 1: Registered */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#00205B] text-white flex items-center justify-center text-xs font-bold shadow-sm select-none">
                            1
                          </div>
                          <p className="text-[10px] text-gray-800 font-bold mt-2">Registered</p>
                        </div>

                        {/* Step 2: Under Review */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#00205B] text-white flex items-center justify-center text-xs font-bold shadow-sm select-none">
                            2
                          </div>
                          <p className="text-[10px] text-gray-800 font-bold mt-2">Under review</p>
                        </div>

                        {/* Step 3: Action Taken */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#00205B] text-white flex items-center justify-center text-xs font-bold shadow-xs select-none">
                            3
                          </div>
                          <p className="text-[10px] text-gray-800 font-bold mt-2">Active Action</p>
                        </div>

                        {/* Step 4: Closed */}
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-250 border-2 border-gray-100 text-gray-500 flex items-center justify-center text-xs font-bold shadow-none select-none">
                            4
                          </div>
                          <p className="text-[10px] text-gray-400 font-semibold mt-2">Completed</p>
                        </div>
                      </div>
                    </div>

                    {/* Meta review summaries */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3">
                      <p className="text-xs font-bold text-navy-deep">Case Details Review</p>
                      <div className="text-xs text-gray-700 leading-relaxed space-y-1 bg-white p-4 rounded-md border border-gray-150">
                        <p><strong>Complainant Contact:</strong> {activeSearchResult.data.contactNumber || activeSearchResult.data.email}</p>
                        <p><strong>Registry Status:</strong> <span className="bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-bold">{activeSearchResult.data.status}</span></p>
                        <p className="pt-2 italic text-gray-550 border-t border-gray-100 mt-2">
                          &quot;{activeSearchResult.data.description || 'Application pending review queue under Police Licences Operations unit.'}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[350px] text-center" id="search-not-found">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-150 text-spf-red mb-4">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans text-lg font-bold text-navy-deep">Retrieve Record Failed</h3>
                    <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
                      We could not find any report or licence application matching Reference ID: <strong>&quot;{refQuery}&quot;</strong>. Please double-check formatting or NRIC configurations.
                    </p>
                    <button 
                      onClick={() => setSearchTriggered(false)}
                      className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-750 font-bold rounded-lg text-xs"
                    >
                      Clear and Search Again
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* DEFAULT EMPTY WORKSPACE FOR SEARCH */
              <div className="flex flex-col items-center justify-center min-h-[420px] text-center p-6 bg-gray-50/15 rounded-2xl border-2 border-dashed border-gray-200 select-none">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-200">
                  <FileSearch className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-sans text-lg font-bold text-navy-deep mb-2">Check Application or Report Status</h3>
                <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
                  Provide your official reference sequence tag on the manual retrieving console, or log in securely via <strong>Singpass integration</strong> to list all your registered files instantly.
                </p>
                <button 
                  onClick={handleSingpassLogin}
                  className="px-5 py-2.5 bg-spf-red hover:bg-[#c02419] text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Lock className="w-4 h-4 text-white" />
                  Singpass Login
                </button>
              </div>
            )}

          </main>
        </div>
      </section>

    </div>
  );
}
