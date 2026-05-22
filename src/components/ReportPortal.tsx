/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, 
  HelpCircle, 
  ChevronRight, 
  AlertOctagon, 
  Search, 
  ShieldAlert, 
  Upload, 
  Clock, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertCircle,
  Eye,
  Trash2,
  Info
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportPortalProps {
  reports: ReportItem[];
  addReport: (report: Omit<ReportItem, 'id' | 'referenceNumber' | 'subDate'>) => void;
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function ReportPortal({ reports, addReport, setCurrentView, setActiveTab }: ReportPortalProps) {
  // Navigation tabs inside Report Portal
  const [activeCategory, setActiveCategory] = useState<'scam' | 'general' | 'traffic' | 'lost' | 'missing' | 'history'>('scam');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardType, setWizardType] = useState<'police' | 'scamshield'>('police');

  // Interactive Form States
  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    scamType: 'Phishing SMS/Email',
    amountLost: '',
    bankInvolved: 'DBS Bank',
    description: '',
    agreedToTerms: false
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newRefNum, setNewRefNum] = useState('');

  // Drag and drop handles
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactNumber || !formData.description) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    // Generate random Reference Number
    const generatedRefNum = `SPF-2026${String(Math.floor(Math.random() * 900000) + 100000)}-702`;
    setNewRefNum(generatedRefNum);

    // Call state callback to append to our dataset
    addReport({
      category: activeCategory === 'scam' ? 'Report a Scam' : 'General Offence',
      type: wizardType === 'police' ? 'Police Report (Official Record)' : 'ScamShield Fast-Track Link',
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      description: `[Scam category: ${formData.scamType}] [Amount Lost: $${formData.amountLost || '0'}] [Bank: ${formData.bankInvolved}] ${formData.description}`,
      status: 'Pending Verification',
      attachmentsCount: files.length
    });

    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      contactNumber: '',
      scamType: 'Phishing SMS/Email',
      amountLost: '',
      bankInvolved: 'DBS Bank',
      description: '',
      agreedToTerms: false
    });
    setFiles([]);
    setIsSubmitted(false);
    setShowWizard(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="report-portal-view">
      
      {/* Top Warning Emergency Strip (High Visibility Accent) */}
      <div className="bg-spf-red text-white py-2.5 px-4 sm:px-6 lg:px-8 z-40 text-center text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm" id="emergency-header-strip">
        <AlertOctagon className="w-4 h-4 text-white animate-pulse" />
        <span>For emergencies that require immediate physical assistance, please call 999 or SMS 71999.</span>
      </div>

      {/* Main Hero Header */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="report-portal-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-spf-red rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => setShowWizard(false)} className="hover:underline">Services</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Report Portal</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Official Reporting Portal
          </h1>
          <p className="inline-block bg-white/10 px-3.5 py-1.5 rounded-md font-sans text-xs font-semibold text-blue-100 mb-4 border border-white/5 shadow-sm">
            Identify your reporting need to begin. Use the filters or browse categories below.
          </p>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Select the relevant category to begin your report. For urgent assistance or crimes in progress, please contact the emergency services immediately.
          </p>
        </div>
      </section>

      {/* Extreme Urgent Call Alert Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -translate-y-6 sm:-translate-y-8 w-full">
        <div className="bg-spf-red text-white p-5 sm:p-6 rounded-xl shadow-lg border-b-4 border-black/20 flex flex-col md:flex-row items-center justify-between gap-6" id="banner-urgent-call">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <p className="text-lg font-bold leading-snug">Emergency? Call 999 immediately.</p>
              <p className="text-xs text-red-100 opacity-90 mt-0.5">
                If you are in danger or witnessing a crime in progress, do not use this online portal.
              </p>
            </div>
          </div>
          <a 
            href="tel:999" 
            className="w-full md:w-auto bg-white hover:bg-gray-100 text-spf-red px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 select-none group"
            id="btn-call-emergency"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform text-spf-red" />
            DIAL 999 NOW
          </a>
        </div>
      </section>

      {/* Main Routing Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Portal Actions */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" id="report-sidebar">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-sans text-base font-bold text-navy-deep">Report Portal</h2>
                <p className="text-[11px] text-gray-550 mt-0.5">Select a category to begin</p>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="p-2 flex flex-col gap-1">
                <button
                  onClick={() => { setActiveCategory('general'); setShowWizard(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'general' ? 'bg-blue-50 text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-general-offence"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>General Offence</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('scam'); setShowWizard(false); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'scam' ? 'bg-[#dae2ff] text-navy-deep ring-1 ring-navy-deep/10 border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-report-scam"
                >
                  <span className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-navy-deep" />
                    <span>Report a Scam</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-deep" />
                </button>

                <button
                  onClick={() => { setActiveCategory('traffic'); setShowWizard(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'traffic' ? 'bg-blue-50 text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-road-incident"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Traffic Incident</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('lost'); setShowWizard(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'lost' ? 'bg-blue-50 text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-lost-item"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Lost & Found</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('missing'); setShowWizard(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'missing' ? 'bg-blue-50 text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-missing-person"
                >
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                  <span>Missing Person</span>
                </button>

                {/* Divider Line */}
                <div className="h-[1px] bg-gray-200 my-2"></div>

                <button
                  onClick={() => { setActiveCategory('history'); setShowWizard(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'history' ? 'bg-blue-50 text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="side-my-reports"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>My Reports ({reports.length})</span>
                </button>
              </nav>
            </div>
            
            {/* Context Helplines Info Box */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl shadow-sm text-xs text-navy-deep select-none">
              <span className="font-bold flex items-center gap-1 mb-1">
                <AlertCircle className="w-4 h-4 text-navy-deep" />
                Anti-Scam Centre (ASC)
              </span>
              <p className="text-gray-600 leading-normal mb-2">
                If your money has already been swept or transferred, contact your bank immediately to freeze your NRIC access and card credentials.
              </p>
              <a href="tel:18002622222" className="text-navy-deep font-bold hover:underline flex items-center gap-0.5">
                Call ASC helpline: 1800-262-2222
              </a>
            </div>
          </aside>

          {/* Right Core Content Canvas */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-sm p-6 sm:p-8 min-h-[550px] relative">
            
            {/* Render different cards depending on categories and showWizard */}
            {showWizard ? (
              /* ACTIVE FILING WIZARD SCREEN */
              <div id="scam-filing-wizard">
                {isSubmitted ? (
                  /* SUBMISSION SUCCESS MODAL */
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4" id="scam-success-box">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-200">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <span className="font-sans text-2xl font-extrabold text-navy-deep tracking-tight mb-2">
                      Report Submitted Successfully
                    </span>
                    <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
                      An official digital report has been registered into the SPF databases. Officers will verify your submission logs and reach out to you within 48 hours is required.
                    </p>
                    
                    {/* Invoice Ref Block */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 w-full max-w-sm mb-8 text-left h-auto">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
                        <span>Transaction reference CODE</span>
                        <span className="font-mono bg-blue-100 text-navy-deep px-1.5 py-0.5 rounded font-bold">{newRefNum}</span>
                      </div>
                      <div className="text-xs text-gray-700 leading-normal space-y-1">
                        <p><strong>Complainant:</strong> {formData.fullName}</p>
                        <p><strong>Report Channel:</strong> {wizardType === 'police' ? 'Police Official Record' : 'ScamShield Fast-Track Link'}</p>
                        <p><strong>Subscribed Date:</strong> {new Date().toISOString().split('T')[0]}</p>
                        <p><strong>Evidence Files:</strong> {files.length} attached items</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => {
                          resetForm();
                          setActiveCategory('history');
                        }}
                        className="px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-sm tracking-wide select-none transition-colors"
                      >
                        View My Reports
                      </button>
                      <button 
                        onClick={resetForm}
                        className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm select-none transition-colors"
                      >
                        File Another Report
                      </button>
                    </div>
                  </div>
                ) : (
                  /* STEPS FILL-UP FORM */
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
                      <button 
                        onClick={() => setShowWizard(false)} 
                        type="button"
                        className="p-1 px-[7px] text-gray-500 hover:bg-gray-100 rounded-md transition-all select-none"
                        title="Back to portal selection"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>
                      <div>
                        <h2 className="font-sans text-xl font-bold text-navy-deep flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-spf-red" />
                          {wizardType === 'police' ? 'Police Report Record' : 'ScamShield Reporting Portal'}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">Please provide exact incident specifics for validation</p>
                      </div>
                    </div>

                    {/* Step Fields */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-navy-deep flex items-center gap-0.5">
                            Full Name <span className="text-spf-red">*</span>
                          </label>
                          <input 
                            required
                            type="text" 
                            placeholder="Enter full name (as per NRIC)"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep transition-all"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-navy-deep">
                            Contact Number <span className="text-spf-red">*</span>
                          </label>
                          <input 
                            required
                            type="tel" 
                            placeholder="+65 9XXX XXXX"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                            className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-navy-deep">
                            Category of Scam
                          </label>
                          <select 
                            value={formData.scamType}
                            onChange={(e) => setFormData({...formData, scamType: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-700 h-9"
                          >
                            <option>Phishing SMS/Email</option>
                            <option>Carousell Fake Buyer/Seller</option>
                            <option>Investment/Crypto Scam</option>
                            <option>Impersonation of Government Officer</option>
                            <option>Online Job Offer</option>
                          </select>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-navy-deep">
                            Approximate Loss (SGD)
                          </label>
                          <input 
                            type="number" 
                            placeholder="e.g. 1500"
                            value={formData.amountLost}
                            onChange={(e) => setFormData({...formData, amountLost: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                          />
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-xs font-bold text-navy-deep">
                            Bank Involved
                          </label>
                          <select 
                            value={formData.bankInvolved}
                            onChange={(e) => setFormData({...formData, bankInvolved: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-700 h-9"
                          >
                            <option>DBS Bank / POSB</option>
                            <option>OCBC Bank</option>
                            <option>UOB Bank</option>
                            <option>Standard Chartered</option>
                            <option>Other / None</option>
                          </select>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1 text-left">
                        <label className="text-xs font-bold text-navy-deep">
                          Detailed Description of Scam <span className="text-spf-red">*</span>
                        </label>
                        <textarea 
                          required
                          rows={4}
                          placeholder="Provide step-by-step notes on how the scammer initiated contact, payment links provided, phone numbers or bank accounts used, and what happened..."
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep"
                        ></textarea>
                      </div>

                      {/* Custom Drag & Drop Field */}
                      <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-navy-deep flex items-center gap-1">
                          Evidence & Media Upload
                          <span className="text-gray-400 font-normal select-none">(Screenshots, WhatsApp chats, PDF logs)</span>
                        </label>

                        <div 
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                            dragActive ? 'border-navy-deep bg-blue-50/40' : 'border-gray-350 bg-gray-50/50 hover:bg-gray-100/30'
                          }`}
                          id="drag-drop-zone"
                        >
                          <input 
                            type="file" 
                            multiple 
                            onChange={handleFileChange}
                            className="hidden" 
                            id="file-input-scam"
                          />
                          <label htmlFor="file-input-scam" className="cursor-pointer flex flex-col items-center">
                            <Upload className="text-gray-400 w-8 h-8 mb-2 animate-bounce" />
                            <span className="text-xs font-bold text-gray-700 mb-0.5">Click or drag files to upload</span>
                            <span className="text-[10px] text-gray-400">PDF, PNG, JPG logs up to 50MB</span>
                          </label>
                        </div>

                        {/* List of files attached currently */}
                        {files.length > 0 && (
                          <div className="mt-3 space-y-1.5" id="attached-files-list">
                            <p className="text-[11px] font-bold text-navy-deep">Selected Attachments ({files.length}):</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {files.map((file, i) => (
                                <div key={i} className="flex justify-between items-center text-[11px] bg-gray-50 border border-gray-200 rounded p-2">
                                  <span className="text-gray-600 truncate max-w-xs font-medium">{file.name}</span>
                                  <button 
                                    onClick={() => removeFile(i)} 
                                    type="button" 
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Terms */}
                      <div className="flex items-start gap-2.5 pt-2">
                        <input 
                          required
                          type="checkbox" 
                          id="terms-check" 
                          checked={formData.agreedToTerms}
                          onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                          className="h-4 w-4 text-navy-deep rounded border-gray-350 focus:ring-navy-deep mt-0.5"
                        />
                        <label htmlFor="terms-check" className="text-[11px] text-gray-550 leading-relaxed text-left">
                          I declare that all information uploaded herein is strictly accurate to the best of my knowledge. Under Singapore section code 182 laws, providing false information to public civil servants carries a jail offense of up to 2 years and heavy court fines.
                        </label>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-150 pt-4 flex justify-end gap-3">
                      <button 
                        onClick={() => setShowWizard(false)} 
                        type="button" 
                        className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-xs tracking-wide transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        disabled={!formData.agreedToTerms}
                        type="submit" 
                        className={`px-6 py-2 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm ${
                          !formData.agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Submit Report
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : activeCategory === 'scam' ? (
              /* ACTIVE REPORT SCAM CHANNELS SELECT (Screenshot 3) */
              <div id="scam-channels" className="space-y-6">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">Report a Scam</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    If you have been a victim of a scam or have information about suspicious activity, please select the appropriate reporting channel below.
                  </p>
                </div>

                {/* Sub-cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Channel 1: Police Report */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:border-navy-deep hover:shadow-lg transition-all duration-300 group">
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgvRHThXDAcaerPx2CePnywg5ucuseTL2S7gldDp8F8djn47f-GN9ImEakrtU0QtW4DnK8DwYrbQ7kS5_IpoYWzkV-czxk9b_jPmhNa7Ja2lbo-6rhdz0-QAIS3X__GLD3bbfkGrKbjWF4wKcxxVaA9DsKXXQ_qparQLgh1tzAiXaLCl1eKf0s5Y_GT65y_yQYDKrZcyL_BzPdCyxtuBpm-IGK5AJGCWW7UA-2oHifQXmTKI-LS9GPiTatCqgbaUIYcaav8jsrSHMz"
                        alt="Filing Official Police Report Form" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-navy-deep text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                        <span>Official Record</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow text-left">
                      <h3 className="font-sans text-lg font-bold text-navy-deep">Police Report</h3>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed flex-grow">
                        File an official police report if you have lost money or sensitive personal information to a scammer. This is required for insurance claims or legal investigations.
                      </p>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1 select-none">
                          <Clock className="w-3.5 h-3.5" />
                          Est. 15-20 mins
                        </span>
                        <button 
                          onClick={() => { setWizardType('police'); setShowWizard(true); }}
                          className="bg-navy-deep hover:bg-navy-deep/95 text-white py-2 px-4 rounded-lg font-bold text-xs tracking-wide flex items-center gap-1 transition-all select-none cursor-pointer"
                        >
                          Start Report
                          <ArrowRight className="w-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Channel 2: ScamShield Fast Track */}
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:border-[#DA291C] hover:shadow-lg transition-all duration-300 group">
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpb4SiVjkIMcgdeQUuYiYX29m7kRnWbq6hFdjADeXwofszn1g7rih7fmidKCpJQgU0UIl_zlipti4GHX1vXqrnkvzlHq5szoe1Wu7Dp-JkwzsNbj_5fDdG_wYP6EFNC4zeFgi9uQW9ijHmV10e9ZiZH-aO__gb8C87NctI5dzvKQx26Iq1-8rA_uzCMvSFSiaftQKWA1i2i8sj40rz-sn3ZjCyFI9_TAesTH5H4Nxvijo0Ri9vVmO8P42OvYftdPAb4NlU5Bz0JagE"
                        alt="Reporting Attempted Scam through ScamShield Cyber Infrastructure" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-spf-red text-white px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide flex items-center gap-1 shadow-sm">
                        <span>Fast Track</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow text-left">
                      <h3 className="font-sans text-lg font-bold text-navy-deep">ScamShield Portal</h3>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed flex-grow">
                        Report scam SMS messages, phone numbers, or fraudulent website links. Help the community by flagging suspicious activity before others fall victim.
                      </p>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1 select-none">
                          <Clock className="w-3.5 h-3.5" />
                          Est. 2 mins
                        </span>
                        <button 
                          onClick={() => { setWizardType('scamshield'); setShowWizard(true); }}
                          className="bg-white border-2 border-navy-deep text-navy-deep hover:bg-blue-50/10 py-1.5 px-4 rounded-lg font-bold text-xs tracking-wide flex items-center gap-1 transition-all select-none cursor-pointer"
                        >
                          Report via ScamShield
                          <ArrowRight className="w-3 text-navy-deep" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Important Guidance Alert Box */}
                <div className="bg-gray-50 border border-gray-250 p-5 rounded-lg flex gap-4 text-left select-none text-xs">
                  <Info className="w-6 h-6 text-navy-deep shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-navy-deep text-sm mb-1">Not sure which one to choose?</h4>
                    <p className="text-gray-550 leading-relaxed">
                      If you have already transferred money or shared your banking credentials, you <strong>must</strong> file a Police Report immediately and contact your bank. Use ScamShield primarily for reporting attempted scams where no loss has occurred yet.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <a href="#" className="text-navy-deep font-bold hover:underline flex items-center gap-0.5">
                        ASC Centre Helpline
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                      <a href="#" className="text-navy-deep font-bold hover:underline flex items-center gap-0.5">
                        Latest Scam Trends
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeCategory === 'history' ? (
              /* MY REPORTS INDEX LOG LIST (DASHBOARD) */
              <div id="my-reports-history" className="text-left space-y-6">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">My Reports Registry</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Review and verify the progression status of your submitted digital non-emergency police reports.
                  </p>
                </div>

                {reports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-300 rounded-lg text-center h-48 bg-gray-50/20">
                    <p className="text-gray-550 text-sm font-semibold">No recent reports logged in this active session browser.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reports.map((rep) => (
                      <div key={rep.id} className="p-5 border border-gray-200 hover:border-navy-deep rounded-xl bg-white shadow-xs transition-all relative flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-1 my-auto max-w-xl">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-navy-deep bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{rep.referenceNumber}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full select-none ${
                              rep.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                              rep.status === 'Under Investigation' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-750'
                            }`}>{rep.status}</span>
                          </div>
                          <p className="text-xs font-bold text-gray-800 pt-1.5">{rep.fullName} ({rep.contactNumber})</p>
                          <p className="text-[11px] text-gray-600 font-medium line-clamp-2 md:line-clamp-3">{rep.description}</p>
                          <p className="text-[10px] text-gray-400 font-semibold italic">Report Category: {rep.category} • SubDate: {rep.subDate} • RefFiles: {rep.attachmentsCount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* COMPONENT STUB / FALLBACK VIEW (Screenshot 2 Guided Selection workspace) */
              <div className="flex flex-col items-center justify-center min-h-[420px] text-center p-6 bg-gray-50/10 rounded-2xl border-2 border-dashed border-gray-200 select-none" id="portal-landing-empty">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-200 shrink-0">
                  <FileText className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="font-sans text-lg font-bold text-navy-deep mb-2">Category Not Activated</h3>
                <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
                  We are standardizing this template dynamically. Please click the <strong>&quot;Report a Scam&quot;</strong> button on the sidebar layout to access high-fidelity scam report channels!
                </p>
                <button 
                  onClick={() => setActiveCategory('scam')}
                  className="px-5 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5"
                >
                  Go to Scam Portal
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            )}

          </main>
        </div>
      </section>

    </div>
  );
}
