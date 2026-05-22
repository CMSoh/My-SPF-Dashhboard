/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronRight, 
  CalendarRange, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  QrCode,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface BookAppointmentProps {
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function BookAppointment({ setCurrentView, setActiveTab }) {
  const [activeTab, setActiveSidebarTab] = useState<'licensing' | 'payment' | 'digital'>('licensing');
  const [selectedCenter, setSelectedCenter] = useState('Bukit Batok Driving Centre (BBDC)');
  const [selectedService, setSelectedService] = useState('Driving Licence Conversion');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Complainant fields
  const [fullName, setFullName] = useState('');
  const [nric, setNric] = useState('');
  const [phone, setPhone] = useState('');

  // Results
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Days in calendar month simulator (May 2026)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffsetDays = 5; // Friday starting May 1st 2026

  const availableSlotsList = [
    { time: '09:00 AM - 10:00 AM', count: 4 },
    { time: '11:30 AM - 12:30 PM', count: 2 },
    { time: '02:00 PM - 03:00 PM', count: 1 },
    { time: '04:30 PM - 05:30 PM', count: 8 }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !nric || !selectedDate || !selectedSlot) {
      alert('Please fill out all personal fields, choose an appointment date & select a time slot.');
      return;
    }

    const generatedRefNum = `AP-${String(Math.floor(Math.random() * 900000) + 100000)}-CDC`;
    setBookingRef(generatedRefNum);
    setIsBooked(true);
  };

  const handleReset = () => {
    setFullName('');
    setNric('');
    setPhone('');
    setSelectedDate(null);
    setSelectedSlot(null);
    setIsBooked(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="appointment-booker-view">
      
      {/* Hero */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="appointment-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-5 right-5 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => handleReset()} className="hover:underline">Traffic</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Book Appointment</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Schedule Appointment
          </h1>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Register and book an in-person session for foreign counter licence conversions, driving certificate collections, and official record verifications.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Menu Selection */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs" id="appointment-sidebar">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-left">
                <h2 className="font-sans text-base font-bold text-navy-deep">Traffic Services</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Please choose a booking service category</p>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <button
                  onClick={() => { setActiveSidebarTab('licensing'); handleReset(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeTab === 'licensing' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-licensing"
                >
                  <span className="flex items-center gap-3">
                    <CalendarRange className="w-4 h-4 text-navy-deep" />
                    <span>Driving Licensing Counters</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-deep" />
                </button>

                <button
                  onClick={() => { setActiveSidebarTab('payment'); handleReset(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeTab === 'payment' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-payments"
                >
                  <span className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 text-gray-400" />
                    <span>Traffic Offence Counter</span>
                  </span>
                </button>

                <button
                  onClick={() => { setActiveSidebarTab('digital'); handleReset(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    activeTab === 'digital' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-600'
                  }`}
                  id="tab-digital-certs"
                >
                  <span className="flex items-center gap-3">
                    <CalendarRange className="w-4 h-4 text-gray-400" />
                    <span>Digital Cert Collection</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Quick notes */}
            <div className="p-4 bg-gray-50/55 border border-gray-200 rounded-xl text-left text-xs leading-normal text-gray-600 select-none">
              <span className="font-bold text-navy-deep flex items-center gap-1 mb-1">
                <HelpCircle className="w-4 h-4 text-navy-deep" />
                Appointment Notes
              </span>
              <p>Please print and present your digital booking slip, alongside original foreign passports and valid driving permits, on-site 15 mins prior to your active slot.</p>
            </div>
          </aside>

          {/* Right workspace panel: Scheduler form */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-xs p-6 sm:p-8 min-h-[500px]">
            
            {isBooked ? (
              /* PROGRESS COMPLETED BOOKING SLIP WITH BARCODE (Screenshot 7) */
              <div id="booking-success-slip" className="flex flex-col items-center py-6">
                
                {/* Header confirmation badges */}
                <div className="flex flex-col items-center text-center max-w-md pb-6 border-b border-gray-200 w-full mb-6">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-200 text-green-600 mb-4 animate-bounce">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-sans text-xl font-extrabold text-navy-deep tracking-tight">Appointment Slot Confirmed</h3>
                  <p className="text-[11px] text-gray-505 mt-1">Please keep this booking pass available on your mobile device for barcode validation.</p>
                </div>

                {/* The Ticket Slip styling */}
                <div className="bg-[#FAF2DF] border-t-8 border-[#DDAA55] rounded-lg shadow-sm max-w-sm w-full p-6 text-left text-[#3A3324] relative overflow-hidden h-auto">
                  
                  {/* Subtle dots layout around ticket edges */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2"></div>

                  <div className="flex justify-between items-start border-b border-[#E3D3B1] pb-3 mb-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#8A7A57] uppercase tracking-wider">SPF APPOINTMENT TICKET</span>
                      <p className="font-mono text-sm font-extrabold text-[#00205B]">{bookingRef}</p>
                    </div>
                    <QrCode className="w-8 h-8 text-navy-deep" />
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#867554] font-semibold uppercase">Applicant Name</span>
                        <p className="font-bold">{fullName}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#867554] font-semibold uppercase">NRIC / passport</span>
                        <p className="font-mono font-bold leading-none">{nric}</p>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#867554] font-semibold uppercase">Category / Service</span>
                      <p className="font-bold">{selectedService}</p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-[#867554] font-semibold uppercase">Centre Landmark Location</span>
                      <p className="font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-spf-red" />
                        {selectedCenter}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-dashed border-[#E4D1AC] pt-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#867554] font-semibold uppercase">Target Date</span>
                        <p className="font-bold text-[#00205B] font-mono">{selectedDate} May 2026</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#867554] font-semibold uppercase">Time Schedule</span>
                        <p className="font-bold text-[#00205B] font-mono leading-none">{selectedSlot}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stylised Ticket Barcode */}
                  <div className="mt-6 pt-4 border-t border-[#E8D9B6] text-center flex flex-col items-center">
                    <div className="flex gap-0.5 h-9 w-full bg-[#3A3324]/10 items-stretch px-4 rounded justify-center select-none py-1">
                      {Array.from({ length: 32 }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#3A3324] h-full" 
                          style={{ width: `${(idx % 3 === 0 ? 3 : idx % 2 === 0 ? 1 : 2)}px` }}
                        ></div>
                      ))}
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#82714F] mt-1.5 tracking-[0.25em]">Barcode valid for entry check-in</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 justify-center">
                  <button 
                    onClick={() => {
                      setCurrentView('home');
                    }}
                    className="px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-sm select-none transition-colors"
                  >
                    Return Home
                  </button>
                  <button 
                    onClick={handleReset}
                    className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm select-none transition-colors"
                  >
                    Reschedule / Cancel
                  </button>
                </div>

              </div>
            ) : (
              /* DESIGN APPOINTMENT COMPILER FORM SHEET */
              <form onSubmit={handleBookingSubmit} className="space-y-6 text-left" id="appointment-form">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">Counter Reservation Schedule</h2>
                  <p className="text-xs text-gray-500 mt-1">Please select center, configure calendar date, and lock your timeslots.</p>
                </div>

                {/* Top selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-deep">Target Center Location</label>
                    <select
                      value={selectedCenter}
                      onChange={(e) => setSelectedCenter(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-750 h-9"
                    >
                      <option>Bukit Batok Driving Centre (BBDC)</option>
                      <option>ComfortDelGro Driving Centre (CDC)</option>
                      <option>Singapore Safety Driving Centre (SSDC)</option>
                      <option>SPF Headquarters PLRD Unit (New Bridge Road)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy-deep">Service Type Requirement</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep text-gray-755 h-9"
                    >
                      <option>Driving Licence Conversion</option>
                      <option>Driving Licence Collection (Physical Card)</option>
                      <option>Foreign Licence Verification counters</option>
                      <option>Traffic Penalty Fine Dispute Hearings</option>
                    </select>
                  </div>
                </div>

                {/* Calendar element & time-slot selection (Screenshot Style) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* May 2026 Monthly Calendar Simulator */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-navy-deep uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-4 h-4 text-navy-deep" />
                      1. Select Day (May 2026)
                    </span>
                    <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-xs">
                      <div className="flex justify-between items-center pb-2 mb-3 border-b border-gray-100">
                        <span className="text-xs font-bold text-navy-deep">May 2026</span>
                        <span className="text-[10px] text-gray-400 font-bold">PLRD Scheduling</span>
                      </div>

                      {/* Small grid of weeks days names: S, M, T, W, T, F, S */}
                      <div className="grid grid-cols-7 text-center text-[10px] text-gray-400 font-bold mb-1 border-b border-gray-50 pb-1">
                        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                      </div>

                      {/* Days grid layout */}
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {/* Offsets padding */}
                        {Array.from({ length: startOffsetDays }).map((_, offsetIdx) => (
                          <div key={`offset-${offsetIdx}`} className="h-7"></div>
                        ))}

                        {daysInMonth.map((day) => {
                          // Standard mock rule: weekend days are unclickable (May 2026: May 2 and 3, 9 and 10, etc.)
                          const rawDayIndex = day + startOffsetDays - 1;
                          const isWeekend = rawDayIndex % 7 === 0 || rawDayIndex % 7 === 6;

                          return (
                            <button
                              key={`day-${day}`}
                              disabled={isWeekend}
                              type="button"
                              onClick={() => { setSelectedDate(day); setSelectedSlot(null); }}
                              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isWeekend 
                                  ? 'text-gray-300 bg-gray-50/50 cursor-not-allowed font-normal' 
                                  : selectedDate === day 
                                    ? 'bg-[#00205B] text-white shadow-xs scale-110' 
                                    : 'hover:bg-blue-50 text-gray-700'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Hours select module */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-navy-deep uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-4 h-4 text-navy-deep" />
                      2. Choose Selected Hour Slot
                    </span>
                    
                    {!selectedDate ? (
                      <div className="p-8 border border-dashed border-gray-200 bg-gray-50/30 rounded-xl text-center flex flex-col items-center justify-center h-[178px] text-xs text-gray-500 font-semibold select-none">
                        <span>Please select a business day on the May calendar to show available hours</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2.5 h-[178px] overflow-y-auto pr-1">
                        {availableSlotsList.map((slotItem) => (
                          <button
                            key={slotItem.time}
                            type="button"
                            onClick={() => setSelectedSlot(slotItem.time)}
                            className={`p-3 border rounded-lg text-left text-xs font-bold flex justify-between items-center transition-all ${
                              selectedSlot === slotItem.time 
                                ? 'bg-blue-50 border-navy-deep text-navy-deep font-extrabold ring-1 ring-navy-deep' 
                                : 'bg-white border-gray-200 hover:border-navy-deep'
                            }`}
                          >
                            <span>{slotItem.time}</span>
                            <span className="text-[10px] text-gray-505 font-medium">{slotItem.count} slots left</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Complainant personal details */}
                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/30 space-y-4">
                  <p className="text-xs font-bold text-navy-deep border-b border-gray-150 pb-2">3. Applicant Information</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-navy-deep">Full Name (NRIC match) <span className="text-spf-red">*</span></label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Tan Wei Gek"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-navy-deep">NRIC / FIN Passport <span className="text-spf-red">*</span></label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. S9876543A"
                        value={nric}
                        onChange={(e) => setNric(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-navy-deep">Contact Number <span className="text-spf-red">*</span></label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+65 9XXX XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs py-2 px-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-navy-deep h-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button bar */}
                <div className="border-t border-gray-150 pt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => {
                      setCurrentView('home');
                    }}
                    type="button" 
                    className="px-5 py-2 border border-gray-300 hover:bg-gray-50 text-gray-750 font-semibold rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!selectedDate || !selectedSlot}
                    type="submit" 
                    className={`px-5 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all shadow-sm ${
                      (!selectedDate || !selectedSlot) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Register Booking Slot
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
