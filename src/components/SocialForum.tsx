/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare, Users, Globe, ExternalLink } from 'lucide-react';

interface SocialForumProps {
  article?: {
    url: string;
    id: string;
    title: string;
  };
}

export default function SocialForum({ article }: SocialForumProps) {
  // Safe default props mapping the user's requested config fields
  const currentArticle = article || {
    url: typeof window !== 'undefined' ? window.location.href : 'https://spf-dashboard.gov.sg/social',
    id: 'spf-citizens-dashboard-social-v1',
    title: 'Singapore Police Force Citizen Discussion Forum',
  };

  return (
    <div className="w-full bg-gray-50/50 py-8 min-h-[600px]" id="social-forum-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading and Social Header Information */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8 text-left" id="social-board-intro">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 bg-blue-50 text-navy-deep rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#D12B2F] tracking-wider uppercase">Public Consultation</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-navy-deep tracking-tight mt-0.5">
                Community Discussion Board
              </h1>
            </div>
          </div>
          
          <p className="text-sm text-gray-650 leading-relaxed">
            Welcome to the official <strong>Singapore Police Force E-Services Citizen Hub</strong>. 
            This board is designed to encourage civic feedback, ask questions regarding permits and licenses, 
            and share safety advisories about scam prevention and community traffic updates.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#D12B2F]" />
              <div className="text-xs text-gray-500 font-medium">
                <span className="font-bold text-gray-800">Real-Time</span> discussions
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-navy-deep" />
              <div className="text-xs text-gray-500 font-medium">
                Language: <span className="font-bold text-gray-800">Traditional Chinese (zh_TW)</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <div className="text-xs text-gray-500 font-medium">
                Verified: <span className="font-bold text-emerald-700">Official SPF-Board</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disqus Forum Embedding Component at the Bottom of Webpage */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-md p-6 sm:p-8 text-left animate-fade-in" id="disqus-container-card">
          <div className="border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-lg font-bold text-navy-deep flex items-center gap-2">
              <span>SPF Forum Thread</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#00205B]">Disqus</span>
            </h2>
          </div>

          <DiscussionEmbed
            shortname="my-spf-dashboard"
            config={{
              url: currentArticle.url,
              identifier: currentArticle.id,
              title: currentArticle.title,
              language: 'zh_TW',
            }}
          />
        </div>

      </div>
    </div>
  );
}
