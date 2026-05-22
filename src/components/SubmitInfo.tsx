/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  Upload, 
  Lock, 
  UserCheck, 
  EyeOff, 
  CheckCircle, 
  Send, 
  HelpCircle,
  FileText,
  Clock,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface SubmitInfoProps {
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function SubmitInfo({ setCurrentView, setActiveTab }) {
  const [activeCategory, setActiveCategory] = useState<'leads' | 'scamtips' | 'trafficappeal' | 'general'>('leads');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newRefNum, setNewRefNum] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    infoType: 'Crime Lead/Tip-Off',
    dateOfSight: '',
    location: '',
    details: '',
    fullName: '',
    phone: '',
    email: '',
    agreeVerify: false
  });

  const [files, setFiles] = useState<File[]>([]);
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
    if (!formData.details || (!isAnonymous && (!formData.fullName || !formData.phone))) {
      alert('Please fill out all required fields before submitting.');
      return;
    }

    const generatedRefNum = `INF-${String(Math.floor(Math.random() * 900000) + 100000)}-SGP`;
    setNewRefNum(generatedRefNum);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      infoType: 'Crime Lead/Tip-Off',
      dateOfSight: '',
      location: '',
      details: '',
      fullName: '',
      phone: '',
      email: '',
      agreeVerify: false
    });
    setFiles([]);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="submit-info-view">
      
      {/* Hero Section */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="submit-info-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-2 right-12 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => setIsSubmitted(false)} className="hover:underline">Services</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Submit Info</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Submit Information & Leads
          </h1>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Provide crime leads, drug abuse tip-offs, traffic violation files, or submit formal appeals safely. Your data is encrypted over legal government standards.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Menu */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs" id="submit-info-sidebar">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-left">
                <h2 className="font-sans text-base font-bold text-navy-deep">Submission Hub</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Choose your submission category</p>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <button
                  onClick={() => { setActiveCategory('leads'); resetForm(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'leads' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-submit-leads"
                >
                  <span className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-navy-deep" />
                    <span>Submit Leads & Evidence</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-deep" />
                </button>

                <button
                  onClick={() => { setActiveCategory('scamtips'); resetForm(); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'scamtips' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-scam-tips"
                >
                  <EyeOff className="w-4 h-4 text-gray-400" />
                  <span>Provide a Scam Tip-off</span>
                </button>

                <button
                  onClick={() => { setActiveCategory('trafficappeal'); resetForm(); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeCategory === 'trafficappeal' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-fine-appeal"
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Appeal Traffic Fine</span>
                </button>
              </div>
            </div>

            {/* Helpline details */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-left text-xs leading-relaxed text-gray-600 select-none">
              <span className="font-bold text-navy-deep flex items-center gap-1 mb-1">
                <HelpCircle className="w-4 h-4 text-navy-deep" />
                Anonymous Safety Note
              </span>
              <p>Online anonymous submittal uses specific network cryptographic masking. Your browser IP or geographic coordinate signature is not registered inside final databases when &quot;Submit Anonymously&quot; is triggered.</p>
            </div>
          </aside>

          {/* Right Core Workspace Form */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-xs p-6 sm:p-8 text-left min-h-[500px]">
            
            {isSubmitted ? (
              /* PROGRESS EXCELLENT SUCCESS CARD */
              <div className="flex flex-col items-center justify-center text-center py-12 px-4" id="submit-success-box">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-navy-deep mb-6 border border-blue-200">
                  <CheckCircle2 className="w-10 h-10 text-navy-deep" />
                </div>
                <span className="font-sans text-2xl font-extrabold text-navy-deep tracking-tight mb-2">
                  Information Lodged Safely
                </span>
                <p className="text-sm text-gray-600 max-w-md leading-relaxed mb-6">
                  Thank you. Your leads package has been transmitted to intelligence operations. Your assistance is central to keeping Singapore safe and secure.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 w-full max-w-sm mb-8 text-left h-auto">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2 border-b border-gray-200 pb-2">
                    <span>Registry Tracking ID:</span>
                    <span className="font-mono bg-blue-100 text-navy-deep px-1.5 py-0.5 rounded font-bold">{newRefNum}</span>
                  </div>
                  <div className="text-xs text-gray-700 leading-normal space-y-1">
                    <p><strong>Lodging Protocol:</strong> {isAnonymous ? 'Strict Anonymous' : 'Diligence contact verified'}</p>
                    <p><strong>Information Type:</strong> {formData.infoType}</p>
                    <p><strong>Attached Evidence count:</strong> {files.length} uploads</p>
                    <p><strong>Incident Location:</strong> {formData.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setActiveTab('services');
                      setCurrentView('home');
                    }}
                    className="px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-sm select-none transition-colors"
                  >
                    Back to Homepage
                  </button>
                  <button 
                    onClick={resetForm}
                    className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm select-none transition-colors"
                  >
                    Submit Another Lead
                  </button>
                </div>
              </div>
            ) : (
              /* PRIMARY LEADS LODGEMENT FORM (Screenshot 5) */
              <form onSubmit={handleFormSubmit} className="space-y-6" id="submit-leads-form">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">
                    {activeCategory === 'leads' ? 'General Information & Leads Form' : 
                     activeCategory === 'scamtips' ? 'Scam Tip-off Lodgement Form' : 'Traffic Offence Appeal Gateway'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Provide specific clues below. High confidentiality is legally backed.</p>
                </div>

                {/* Sub Field Elements */}
                <div className="space-y-4">
                  
                  {/* Category of Submission */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-navy-deep">Type of Information</label>
                      <select
                        value={formData.infoType}
                        onChange={(e) => setFormData({...formData, infoType: e.target.value})}
                        className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-700 h-9"
                      >
                        <option>Crime Lead/Tip-Off</option>
                        <option>Narcotics/Drug Abuse Tip-off</option>
                        <option>Road Traffic Violation Lead</option>
                        <option>Suspicious Activity Report</option>
                        <option>Non-Crime Civil Dispute appeals</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-navy-deep">Date / Time (Approx)</label>
                        <input 
                          type="datetime-local" 
                          value={formData.dateOfSight}
                          onChange={(e) => setFormData({...formData, dateOfSight: e.target.value})}
                          className="w-full text-xs py-1.5 px-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="text-xs font-bold text-navy-deep">Location of Occurrence</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Bedok Inter."
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Informational Text Notes */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-deep">What can you tell us? (Details) <span className="text-spf-red">*</span></label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please clarify specific timelines, vehicle registration license plates, clothing markings of perpetrators, URLs or digital logins involved..."
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full text-xs py-2.5 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep focus:border-navy-deep"
                    ></textarea>
                  </div>

                  {/* Drag & Drop zone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-navy-deep flex items-center gap-1">
                      Evidence Attachments
                      <span className="text-gray-400 font-normal select-none">(Dashcam footage, WhatsApp records, SMS logs)</span>
                    </label>

                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                        dragActive ? 'border-navy-deep bg-blue-50/40' : 'border-gray-350 bg-gray-50/55 hover:bg-gray-100/30'
                      }`}
                      id="leads-drag-drop-zone"
                    >
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileChange}
                        className="hidden" 
                        id="leads-file-input"
                      />
                      <label htmlFor="leads-file-input" className="cursor-pointer flex flex-col items-center">
                        <Upload className="text-gray-400 w-8 h-8 mb-2 animate-bounce" />
                        <span className="text-xs font-bold text-gray-700 mb-0.5">Click or drag files to submit</span>
                        <span className="text-[10px] text-gray-400">Supporting video, photo or document files up to 50MB</span>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-1.5" id="leads-files-sub-list">
                        <p className="text-[11px] font-bold text-navy-deep">Selected Evidence Files ({files.length}):</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {files.map((file, i) => (
                            <div key={i} className="flex justify-between items-center text-[11px] bg-gray-50 border border-gray-200 rounded p-2">
                              <span className="text-gray-600 truncate max-w-xs font-medium">{file.name}</span>
                              <button 
                                onClick={() => removeFile(i)} 
                                type="button" 
                                className="text-red-500 hover:text-red-750"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Privacy Toggles: Strict Anonymous vs Verify Contacts */}
                  <div className="border border-gray-200 rounded-xl p-4 space-y-3.5 bg-gray-50/30">
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-150">
                      <div className="space-y-0.5 text-left">
                        <p className="text-xs font-bold text-navy-deep flex items-center gap-1">
                          <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                          File Anonymously
                        </p>
                        <p className="text-[10px] text-gray-500">Your personal identity and contact card are skipped entirely.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAnonymous(!isAnonymous)}
                        className={`w-12 h-6 h-auto flex items-center rounded-full p-1 transition-all ${
                          isAnonymous ? 'bg-navy-deep justify-end' : 'bg-gray-300 justify-start'
                        }`}
                        id="btn-toggle-anonymous"
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                      </button>
                    </div>

                    {!isAnonymous && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="complainant-fields">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-navy-deep">Full Name <span className="text-spf-red">*</span></label>
                          <input 
                            required
                            type="text" 
                            placeholder="Enter name (NRIC matching)"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-navy-deep">Contact Mobile <span className="text-spf-red">*</span></label>
                          <input 
                            required
                            type="tel" 
                            placeholder="+65 9XXX XXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-navy-deep">Email Address</label>
                          <input 
                            type="email" 
                            placeholder="e.g. civic.minded@outlook.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Declaration of truth */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input 
                      required
                      type="checkbox" 
                      id="agree-truth" 
                      checked={formData.agreeVerify}
                      onChange={(e) => setFormData({...formData, agreeVerify: e.target.checked})}
                      className="h-4 w-4 text-navy-deep border-gray-300 rounded focus:ring-navy-deep mt-0.5"
                    />
                    <label htmlFor="agree-truth" className="text-[11px] text-gray-500 leading-normal">
                      I understand that submitting knowingly fabricated or false information is a serious regulatory offence under section 182 laws of the Penal Code of Singapore.
                    </label>
                  </div>

                </div>

                {/* Submit button bar */}
                <div className="border-t border-gray-150 pt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setActiveTab('services');
                      setCurrentView('home');
                    }}
                    type="button" 
                    className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-750 font-semibold rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!formData.agreeVerify}
                    type="submit" 
                    className={`px-5 py-2 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                      !formData.agreeVerify ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    Submit Information
                  </button>
                </div>

              </form>
            )}

          </main>
        </div>
      </section>

    </div>
  );
}
