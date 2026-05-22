/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PracticeQuestion, ReportItem, LicenseApplication } from './types';

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    referenceNumber: 'SPF-20261012-702',
    category: 'Report a Scam',
    type: 'Police Report (Official Record)',
    fullName: 'David Tan Wei Ming',
    contactNumber: '+65 9182 3456',
    description: 'Received a fraudulent phone call claiming to be from DBS bank security. Authorized a digital token addition, leading to unauthorized transfer of $2,450 to unknown account.',
    status: 'Under Investigation',
    subDate: '2026-05-18',
    attachmentsCount: 3,
  },
  {
    id: 'rep-2',
    referenceNumber: 'SPF-20260405-318',
    category: 'Traffic Incident',
    type: 'Road Incident',
    fullName: 'Sarah Lim Bee Gek',
    contactNumber: '+65 8293 8812',
    description: 'Minor fender bender at intersection of Nicoll Highway and Bras Basah Road. Dashboard camera footage submitted showing the other vehicle failing to yield at a yellow box.',
    status: 'Completed',
    subDate: '2026-05-12',
    attachmentsCount: 1,
  },
  {
    id: 'rep-3',
    referenceNumber: 'SPF-20260520-991',
    category: 'Report a Scam',
    type: 'ScamShield Fast-Track Link',
    fullName: 'Bernard Soh',
    contactNumber: '+65 9123 4567',
    description: 'Phishing SMS received from spoofed shipping group warning about uncollected parcel, pointing to a fraudulent website link.',
    status: 'Pending Verification',
    subDate: '2026-05-20',
    attachmentsCount: 0,
  }
];

export const INITIAL_LICENSES: LicenseApplication[] = [
  {
    id: 'lic-1',
    referenceNumber: 'LIC-79281203-SGP',
    category: 'Licences & Permits',
    fullName: 'Michael Sivalingam',
    contactNumber: '+65 9012 4455',
    email: 'm.sivalingam@fabulousfnb.com',
    nric: 'SXXXX123E',
    entityName: 'Fabulous Bistro Pte Ltd',
    status: 'Approved',
    subDate: '24 Apr 2026',
  },
  {
    id: 'lic-2',
    referenceNumber: 'LIC-88192031-SGP',
    category: 'Events',
    fullName: 'Emma Watson Cheng',
    contactNumber: '+65 8111 2233',
    email: 'emma@spark-events.sg',
    nric: 'TXXXX567A',
    entityName: 'Spark Creative Agency',
    status: 'Pending Review',
    subDate: '15 May 2026',
  }
];

export const THEORY_QUESTIONS: PracticeQuestion[] = [
  // BTT
  {
    id: 1,
    category: 'BTT',
    question: 'When approaching a signalised pedestrian crossing where the green man has just started to flash, you should:',
    options: [
      'Accelerate in order to cross the junction before the red light appears.',
      'Sound your horn to warn pedestrians and drive across without slowing down.',
      'Slow down and be prepared to stop if pedestrians are still on the crossing.'
    ],
    correctIndex: 2,
    explanation: 'A flashing green man signal warns pedestrians that the crossing time is completing. Drivers must reduce speed and prepare to yield to pedestrians still on the roadway.'
  },
  {
    id: 2,
    category: 'BTT',
    question: 'On an expressway, the extreme right lane (Lane 1) must be used for:',
    options: [
      'Normal driving at speeds matching the speed limit.',
      'Overtaking and emergency vehicles only.',
      'Consistent cruising by slow-moving trucks and commercial utility motorcars.'
    ],
    correctIndex: 1,
    explanation: 'Expressway Lane 1 is specifically designated for overtaking vehicles or emergency vehicle routes. Hogging this lane at cruising speed restricts traffic volume flow.'
  },
  {
    id: 3,
    category: 'BTT',
    question: 'Under Singapore law, driving a motor vehicle with a blood alcohol concentration exceeding _______ is a criminal offensive charge.',
    options: [
      '35 microgrammes of alcohol per 100ml of breath.',
      '50 microgrammes of alcohol per 100ml of breath.',
      '80 microgrammes of alcohol per 100ml of breath.'
    ],
    correctIndex: 0,
    explanation: 'The legal drink-driving limit in Singapore is strictly set at 35 microgrammes of alcohol per 100ml of breath (or 80 milligrammes of alcohol per 100ml of blood).'
  },
  {
    id: 4,
    category: 'BTT',
    question: 'A vehicle with a broken outline white lane marker on its side of the center road line is allowed to:',
    options: [
      'Cross the center line to overtake, provided it is safe to do so.',
      'Never cross the line under any road circumstances.',
      'Treat the road as a strictly one-way single car lane.'
    ],
    correctIndex: 0,
    explanation: 'A broken white line denotes that crossing is permitted to overtake or turn, so long as incoming traffic is clear and it is safe.'
  },
  {
    id: 5,
    category: 'BTT',
    question: 'If you are involved in a traffic accident resulting in injury, you must immediately call police and:',
    options: [
      'Settle the matter privately on-site to minimize traffic disruption.',
      'Leave the scene directly to go file a report at a neighbourhood police post.',
      'Render assistance to the injured party and not move any vehicles until police arrive, unless necessary to save lives.'
    ],
    correctIndex: 2,
    explanation: 'In injury accidents, drivers must assist the injured, alert the police/ambulance, and preserve the scene. Leaving without assisting is an offense.'
  },

  // FTT
  {
    id: 6,
    category: 'FTT',
    question: 'If your car begins to skid or slide during braking, the correct reaction should be:',
    options: [
      'Slam the brakes harder to force wheels to lock and slide to a direct stop.',
      'Release the service brake pedal immediately to restore wheel traction, then brake gently.',
      'Pull the handbrake mechanism fully upward and turn wheels in the opposite direction.'
    ],
    correctIndex: 1,
    explanation: 'Releasing the brake allows wheels to spin freely to re-establish traction with the road surface, allowing the driver to steer and regain defensive control.'
  },
  {
    id: 7,
    category: 'FTT',
    question: 'When driving in heavy rain, the hazard of aquaplaning (hydroplaning) is best countered by:',
    options: [
      'Swaying the vehicle side to side slightly to disperse persistent tyre water layers.',
      'Avoiding sudden acceleration, braking, or steering, and reducing overall road speed.',
      'Engaging high gear ratios and revving the engine for torque dispersion.'
    ],
    correctIndex: 1,
    explanation: 'Reducing speed prevents tires from climbing on top of water sheets. Fluid steering, smooth braking, and gentle throttle maintain the tyre patch contacts.'
  },
  {
    id: 8,
    category: 'FTT',
    question: 'When exiting an active roundabout, which indicator signal light should be switched on?',
    options: [
      'The left indicator light inside the last segment prior to exit.',
      'The right indicator light to notify oncoming roundabout entries.',
      'No signal indicators are required once inside roundabouts.'
    ],
    correctIndex: 0,
    explanation: 'To exit a roundabout, you must use your left indicator to signal your exit intention once you have passed the exit prior to your intended exit.'
  },

  // RTT
  {
    id: 9,
    category: 'RTT',
    question: 'When cornering on wet roads, a motorcyclist should maintain defensive control by:',
    options: [
      'Keeping the motorcycle as upright as possible and lowering corner entry speeds.',
      'Leaning aggressively to force high grip corner contact.',
      'Disengaging the clutch entirely and freewheeling throughout the turn.'
    ],
    correctIndex: 0,
    explanation: 'Wet asphalt severely diminishes tyre friction. Lowering entry speed and keeping the bike relatively upright reduces lateral slide risks.'
  },
  {
    id: 10,
    category: 'RTT',
    question: 'To stabilize the motorcycle during low-speed maneuvering and tight U-turns, a rider should primarily employ:',
    options: [
      'The front handbrake ONLY to stop tipping.',
      'The rear footbrake in coordination with smooth "clutch-friction zone" throttle.',
      'Fully locked steering and immediate weight lean away from the turn.'
    ],
    correctIndex: 1,
    explanation: 'The rear brake exerts dragging stabilizing force. In tandem with slipping the clutch inside the friction zone, steady speed is achieved without engine stalling.'
  }
];
