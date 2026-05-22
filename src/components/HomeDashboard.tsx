/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileEdit, ClipboardCheck, AlertTriangle, Info, CalendarRange, GraduationCap, ArrowRight } from 'lucide-react';
import { CurrentView, MainTab } from '../types';

interface HomeDashboardProps {
  setCurrentView: (view: CurrentView) => void;
  setActiveTab: (tab: MainTab) => void;
}

export default function HomeDashboard({ setCurrentView, setActiveTab }: HomeDashboardProps) {
  // Navigation helper
  const navigateTo = (view: CurrentView, tab: MainTab) => {
    setActiveTab(tab);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full" id="home-dashboard">
      {/* Hero Dark Blue Section */}
      <section className="relative bg-[#001438] bg-gradient-to-br from-[#00205B] to-[#000d2f] text-white py-12 md:py-20 overflow-hidden min-h-[420px] flex items-center">
        {/* Abstract Isometric Graphics Hotlink Image */}
        <div className="absolute top-0 right-0 w-full md:w-5/12 h-full opacity-15 pointer-events-none select-none">
          <img 
            className="object-cover w-full h-full object-right" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmi-hKWtFV45cGY1O7Jb1b24AWCuWL0OtJyMsPMNK3OD68Kj9TOkZVuq2u0e9dQiqM0ZvsWEwk4bwJbCXjIKxx8Rlo67njnuHJ2VxVl3DWCwh9xRSGdpMlOVH6a1ZiRbT48boKjp8ahk_olvopcFeJfKfFNNPD_NFuQMn4vOLxUT20IJnwSuWxrdljtr6DklagHCSYe40ut-I2I1OJSbeSxP3S3CvyNbwmDOomO7hON8L4WY6vu6V3PFt5UPdnZ8YghnTtN8fiGp9v"
            alt="Singapore Police Force Digital Grid Abstract Background"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Animated Title */}
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white mb-3">
              Civic protection, simplified.
            </h1>
            <p className="font-sans text-base sm:text-lg text-blue-100 opacity-90 leading-relaxed max-w-2xl mb-8">
              Access official police services through our intelligent routing system. Whether reporting an incident or applying for permits, we'll guide you to the right department instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Action Portal Hub Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-20 z-20 pb-16">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 sm:p-8" id="portal-hub-card">
          <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep mb-6">
            What would you like to do?
          </h2>

          {/* Primary Action Buttons: Bento-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Action 1: Apply */}
            <button 
              onClick={() => navigateTo('apply_permits', 'licences')}
              className="group flex flex-col p-5 bg-white border border-gray-200 hover:border-navy-deep rounded-lg text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none"
              id="btn-portal-apply"
            >
              <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                <FileEdit className="text-navy-deep w-6 h-6" />
              </div>
              <span className="font-sans text-lg font-bold text-navy-deep mb-1 group-hover:text-amber-700 transition-colors flex items-center justify-between w-full">
                Apply
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
              <span className="text-xs text-gray-500 leading-normal">
                Licences, permits, or certificates.
              </span>
            </button>

            {/* Action 2: Check Status */}
            <button 
              onClick={() => navigateTo('check_status', 'services')}
              className="group flex flex-col p-5 bg-white border border-gray-200 hover:border-navy-deep rounded-lg text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none"
              id="btn-portal-check-status"
            >
              <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                <ClipboardCheck className="text-navy-deep w-6 h-6" />
              </div>
              <span className="font-sans text-lg font-bold text-navy-deep mb-1 group-hover:text-amber-700 transition-colors flex items-center justify-between w-full">
                Check status
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
              <span className="text-xs text-gray-500 leading-normal">
                Track your existing applications.
              </span>
            </button>

            {/* Action 3: Report (High intensity alert color) */}
            <button 
              onClick={() => navigateTo('report_portal', 'services')}
              className="group flex flex-col p-5 bg-red-50/50 hover:bg-red-50 border border-red-100 hover:border-spf-red rounded-lg text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none"
              id="btn-portal-report"
            >
              <div className="w-11 h-11 bg-red-100/60 rounded-lg flex items-center justify-center mb-4 group-hover:bg-spf-red transition-all duration-300">
                <AlertTriangle className="text-spf-red group-hover:text-white transition-colors w-6 h-6" />
              </div>
              <span className="font-sans text-lg font-bold text-navy-deep mb-1 group-hover:text-spf-red transition-colors flex items-center justify-between w-full">
                Report something
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-spf-red" />
              </span>
              <span className="text-xs text-gray-500 leading-normal">
                Non-emergency incident reporting.
              </span>
            </button>

            {/* Action 4: Submit Info */}
            <button 
              onClick={() => navigateTo('submit_info', 'services')}
              className="group flex flex-col p-5 bg-white border border-gray-200 hover:border-navy-deep rounded-lg text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none"
              id="btn-portal-submit-info"
            >
              <div className="w-11 h-11 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                <Info className="text-navy-deep w-6 h-6" />
              </div>
              <span className="font-sans text-lg font-bold text-navy-deep mb-1 group-hover:text-amber-700 transition-colors flex items-center justify-between w-full">
                Submit information
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </span>
              <span className="text-xs text-gray-500 leading-normal">
                Provide leads or evidence.
              </span>
            </button>

          </div>

          {/* Quick Tools Header */}
          <div className="mt-10 border-t border-gray-100 pt-8" id="quick-tools-section">
            <h3 className="font-sans text-lg font-bold text-navy-deep mb-4">
              Quick Tools
            </h3>

            {/* Two horizontal quick cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Tool 1: Book Appointment */}
              <button 
                onClick={() => navigateTo('book_appointment', 'traffic')}
                className="group flex items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-navy-deep hover:bg-white text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none w-full"
                id="tool-appointment"
              >
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors text-navy-deep shrink-0 shadow-sm">
                  <CalendarRange className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-navy-deep leading-snug group-hover:text-spf-red transition-colors">
                    Book Appointment
                  </span>
                  <span className="text-xs text-gray-500 leading-normal">
                    Driving license collection or conversion.
                  </span>
                </div>
              </button>

              {/* Tool 2: Practice Tests */}
              <button 
                onClick={() => navigateTo('practice_tests', 'traffic')}
                className="group flex items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:border-navy-deep hover:bg-white text-left transition-all duration-300 hover:shadow-md cursor-pointer select-none w-full"
                id="tool-practice-tests"
              >
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors text-navy-deep shrink-0 shadow-sm">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-navy-deep leading-snug group-hover:text-spf-red transition-colors">
                    Practice Tests
                  </span>
                  <span className="text-xs text-gray-500 leading-normal">
                    Theory tests for driving and riding.
                  </span>
                </div>
              </button>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
