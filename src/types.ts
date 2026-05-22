/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MainTab = 'services' | 'traffic' | 'licences' | 'documents';

export type CurrentView = 
  | 'home'
  | 'report_portal'
  | 'scam_report'
  | 'apply_permits'
  | 'submit_info'
  | 'check_status'
  | 'book_appointment'
  | 'practice_tests';

export interface ReportItem {
  id: string;
  referenceNumber: string;
  category: string;
  type: string;
  fullName: string;
  contactNumber: string;
  description: string;
  status: 'Pending Verification' | 'Under Investigation' | 'Awaiting Documents' | 'Completed' | 'Rejected';
  subDate: string;
  attachmentsCount: number;
}

export interface LicenseApplication {
  id: string;
  referenceNumber: string;
  category: string;
  fullName: string;
  contactNumber: string;
  email: string;
  nric: string;
  entityName?: string;
  status: 'Pending Review' | 'Approved' | 'Requires Clarification' | 'Rejected';
  subDate: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  serviceType: string;
  date: string;
  location: string;
}

export interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'BTT' | 'FTT' | 'RTT';
  image?: string;
}

export interface TestResult {
  category: 'BTT' | 'FTT' | 'RTT';
  score: number;
  total: number;
  date: string;
  passed: boolean;
}
