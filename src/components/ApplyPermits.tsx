/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  FileText, 
  CheckCircle, 
  Clock, 
  Plus, 
  ShieldCheck, 
  AlertCircle,
  Building,
  User,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { LicenseApplication } from '../types';

interface ApplyPermitsProps {
  licenses: LicenseApplication[];
  addLicense: (license: Omit<LicenseApplication, 'id' | 'referenceNumber' | 'subDate'>) => void;
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function ApplyPermits({ licenses, addLicense, setCurrentView, setActiveTab }: ApplyPermitsProps) {
  const [activeCategory, setActiveCategory] = useState<'lic' | 'copy' | 'cncc' | 'second' | 'explosive' | 'event'>('lic');
  const [showApplyForm, setShowApplyForm] = useState(false);
  
  // Licence Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    nric: '',
    licenceType: 'Security Officer Agency Licence',
    entityName: '',
    declaration: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newLicRef, setNewLicRef] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.nric) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    const generatedRefNum = `LIC-${String(Math.floor(Math.random() * 9000000) + 1000000)}-SGP`;
    setNewLicRef(generatedRefNum);

    // Seed state callback
    addLicense({
      category: 'Licences & Permits',
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      nric: formData.nric,
      entityName: formData.entityName || undefined,
      status: 'Pending Review'
    });

    setIsSubmitted(true);
  };

  const closeForm = () => {
    setFormData({
      fullName: '',
      contactNumber: '',
      email: '',
      nric: '',
      licenceType: 'Security Officer Agency Licence',
      entityName: '',
      declaration: false
    });
    setIsSubmitted(false);
    setShowApplyForm(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="apply-permits-view">
      
      {/* Hero Header Banner */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="apply-permits-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => setShowApplyForm(false)} className="hover:underline">Licences</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Apply & Permits</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Licences, Permits, & Certificates
          </h1>
          <p className="inline-block bg-white/10 px-3 py-1 bg-gradient-to-r from-navy-deep to-blue-900 border border-white/5 rounded text-xs font-semibold text-amber-200 mb-4 shadow-sm select-none">
            Official E-Licencing Gateway
          </p>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Submit applications for institutional licences, commercial secondhand permits, or request copy certificates of clean records and police transcripts.
          </p>
        </div>
      </section>

      {/* Main Canvas Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Segment */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" id="permits-sidebar">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-left">
                <h2 className="font-sans text-base font-bold text-navy-deep">Filing Options</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Please choose a licensing category</p>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <button
                  onClick={() => { setActiveCategory('lic'); setShowApplyForm(false); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'lic' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-lic-agency"
                >
                  <span className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-navy-deep" />
                    <span>Licences & Permits</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-deep" />
                </button>

                <button
                  onClick={() => { setActiveCategory('copy'); setShowApplyForm(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'copy' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-copies"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Certified Copy of Police Documents</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('cncc'); setShowApplyForm(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'cncc' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-cncc"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Certificate of No Criminal Conviction</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('second'); setShowApplyForm(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'second' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-secondhand"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Secondhand Goods Dealers Licence</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('explosive'); setShowApplyForm(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'explosive' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-weapons"
                >
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                  <span>Explosives & Weapons Licencing</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('event'); setShowApplyForm(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'event' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-assemblies"
                >
                  <Bookmark className="w-4 h-4 text-gray-400" />
                  <span>Event Permits & Public Assemblies</span>
                </button>
              </div>
            </div>

            {/* Static guidance alert */}
            <div className="p-4 bg-gray-50/50 border border-gray-200 rounded-xl text-left select-none text-xs text-gray-600 leading-normal">
              <span className="font-bold text-navy-deep flex items-center gap-1 mb-1">
                <HelpCircle className="w-4 h-4 text-navy-deep" />
                Need help with Licences?
              </span>
              <p>For inquiries regarding licensing fees or documentation requirements, contact the Police Licences & Regulatory Department (PLRD) hotline at <strong>1800-478-9999</strong>.</p>
            </div>
          </aside>

          {/* Right workspace core */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-xs p-6 sm:p-8 min-h-[500px]">
            
            {showApplyForm ? (
              /* THE INTERACTIVE APPLICATION FORM */
              <div id="new-licence-form">
                {isSubmitted ? (
                  /* SUBMIT SUCCESS STATEMENT */
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4" id="license-success-box">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="font-sans text-2xl font-extrabold text-navy-deep tracking-tight mb-2">
                      Application Submitted
                    </span>
                    <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
                      Your application has been successfully filed with the Police Licences & Regulatory Department. You will receive an email notice once review begins.
                    </p>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 w-full max-w-sm mb-8 text-left h-auto">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
                        <span>Application Reference No:</span>
                        <span className="font-mono bg-blue-100 text-navy-deep px-1.5 py-0.5 rounded font-bold">{newLicRef}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-normal space-y-1">
                        <p><strong>Applicant Name:</strong> {formData.fullName}</p>
                        <p><strong>Proposed Type:</strong> {formData.licenceType}</p>
                        <p><strong>Company Profile:</strong> {formData.entityName || 'Individual Application'}</p>
                        <p><strong>Status:</strong> Under Review</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => {
                          closeForm();
                          setCurrentView('check_status');
                        }}
                        className="px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-sm tracking-wide select-none transition-colors"
                      >
                        Track Application
                      </button>
                      <button 
                        onClick={closeForm}
                        className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm select-none transition-colors"
                      >
                        Back to Directory
                      </button>
                    </div>

                  </div>
                ) : (
                  /* FORM FLOW */
                  <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                    <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
                      <button 
                        onClick={() => setShowApplyForm(false)} 
                        type="button"
                        className="p-1 px-[7px] text-gray-500 hover:bg-gray-100 rounded-md transition-all select-none"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <div>
                        <h2 className="font-sans text-xl font-bold text-navy-deep">New Licence Application</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Under Singapore Police Licences & Regulatory Department</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" /> Full Name <span className="text-spf-red">*</span>
                        </label>
                        <input 
                          required
                          type="text" 
                          placeholder="As written on NRIC/Passport"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep">NRIC / FIN Number <span className="text-spf-red">*</span></label>
                        <input 
                          required
                          type="text" 
                          placeholder="e.g. S1234567A"
                          value={formData.nric}
                          onChange={(e) => setFormData({...formData, nric: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep">Email Address <span className="text-spf-red">*</span></label>
                        <input 
                          required
                          type="email" 
                          placeholder="primary@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep">Mobile Contact <span className="text-spf-red">*</span></label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+65 8XXX XXXX"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-navy-deep">Proposed Licence Type</label>
                        <select 
                          value={formData.licenceType}
                          onChange={(e) => setFormData({...formData, licenceType: e.target.value})}
                          className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-700 h-9"
                        >
                          <option>Security Officer Agency Licence</option>
                          <option>Private Investigator Agency Licence</option>
                          <option>Public Entertainment Licence (General)</option>
                          <option>Secondhand Goods Dealer Licence</option>
                          <option>Short-Term Event Public Assembly Permit</option>
                          <option>Weapons/Explosives Transit Certificate</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-gray-400" /> Company / Corp Entity Name <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Acme Protection Pte Ltd"
                          value={formData.entityName}
                          onChange={(e) => setFormData({...formData, entityName: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                        />
                      </div>
                    </div>

                    {/* Declaration */}
                    <div className="flex items-start gap-2.5 border-t border-gray-150 pt-4">
                      <input 
                        required
                        type="checkbox" 
                        id="dec-lic" 
                        checked={formData.declaration}
                        onChange={(e) => setFormData({...formData, declaration: e.target.checked})}
                        className="h-4 w-4 text-navy-deep border-gray-300 rounded focus:ring-navy-deep mt-0.5"
                      />
                      <label htmlFor="dec-lic" className="text-[11px] text-gray-500 leading-relaxed">
                        I hereby declare that all particulars submitted in this application are strictly accurate. Under the Private Security Industry Act and public agency guidelines, submitting counterfeit documents or false claims carry civil liabilities, direct fine penalties, or immediate cancellation of prior operational certificates.
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button 
                        onClick={() => setShowApplyForm(false)} 
                        type="button" 
                        className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-xs"
                      >
                        Cancel
                      </button>
                      <button 
                        disabled={!formData.declaration}
                        type="submit" 
                        className={`px-5 py-2 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm ${
                          !formData.declaration ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* DEFAULT DIRECTORY WORKSPACE REVIEW */
              <div id="licensing-overview" className="text-left space-y-6">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">
                    {activeCategory === 'lic' ? 'Licences & Permits Overview' : 
                     activeCategory === 'copy' ? 'Police Document Copies' : 
                     activeCategory === 'cncc' ? 'CNCC Clearance' : 'Permits Directory'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {activeCategory === 'lic' ? 'Apply for or renew professional licences, event permits, or request certified copies of police reports and official documents. Select a category or click "New Application" to submit a request online.' : 
                     'Please verify application prerequisites. Review normal queue cycles prior to filing.'}
                  </p>
                </div>

                {/* Procedure procedures info card */}
                <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-5 hover:bg-white hover:border-navy-deep hover:shadow-xs transition-all relative flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-3 max-w-md">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-navy-deep text-[11px] font-bold rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      Est. 10 - 14 Days Processing
                    </span>
                    <h3 className="font-sans text-base font-bold text-navy-deep">Standard Licensing Procedures</h3>
                    <p className="text-xs text-gray-550 leading-relaxed">
                      All security agencies, secondhand dealers, and non-profit public collection permit requests are filtered automatically via standard PLRD screening channels. Make sure your NRIC correlates with official business profiles registered under ACRA.
                    </p>
                  </div>
                  <div className="my-auto self-end sm:self-center shrink-0">
                    <button 
                      onClick={() => setShowApplyForm(true)}
                      className="px-5 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                      id="btn-apply-licence-portal"
                    >
                      <Plus className="w-4 h-4 text-white" />
                      New Application
                    </button>
                  </div>
                </div>

                {/* Sub-list of submitted licences for this session */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-bold text-navy-deep uppercase tracking-wider mb-3">Active Session Applications ({licenses.length})</h3>
                  {licenses.length === 0 ? (
                    <p className="text-xs text-gray-505 italic">No licence requests filed under this active session.</p>
                  ) : (
                    <div className="space-y-3">
                      {licenses.map((lic) => (
                        <div key={lic.id} className="p-4 border border-gray-200 bg-white/20 rounded-lg flex justify-between items-center text-xs">
                          <div className="space-y-1 text-left">
                            <p className="font-bold text-navy-deep">{lic.fullName}</p>
                            <p className="text-gray-500 font-medium">{lic.category} • Ref: <span className="font-mono font-bold text-gray-700 bg-gray-100 px-1 py-0.5 rounded">{lic.referenceNumber}</span></p>
                          </div>
                          <div>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              lic.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-750'
                            }`}>{lic.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

          </main>
        </div>
      </section>

    </div>
  );
}
