/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare, Users, Globe, ExternalLink, MessageCircle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface ArticleType {
  url: string;
  id: string;
  title: string;
}

interface SocialForumProps {
  article: ArticleType;
}

class IsolatedDisqus extends React.Component<SocialForumProps> {
  shouldComponentUpdate() {
    // Lock updating to avoid Disqus wrapper script reloads / reset loops
    return false;
  }

  render() {
    return (
      <DiscussionEmbed
          shortname='my-spf-dashboard'
          config={
              {
                  url: this.props.article.url,
                  identifier: this.props.article.id,
                  title: this.props.article.title,
                  language: 'EN' //e.g. for Traditional Chinese (Taiwan)
              }
          }
      />
    );
  }
}

interface SocialForumState {
  checkingStatus: boolean;
  isBlockedByBrowser: boolean;
}

export default class SocialForum extends React.Component<SocialForumProps, SocialForumState> {
  private timer: any = null;

  constructor(props: SocialForumProps) {
    super(props);
    this.state = {
      checkingStatus: true,
      isBlockedByBrowser: false,
    };
  }

  componentDidMount() {
    // Check after 3 seconds if Disqus script has successfully inserted the iframe, or if DISQUS global is defined
    this.timer = setTimeout(() => {
      const threadEl = document.getElementById('disqus_thread');
      const hasIframe = threadEl ? threadEl.getElementsByTagName('iframe').length > 0 : false;
      const isLoaded = typeof (window as any).DISQUS !== 'undefined' || hasIframe;
      
      this.setState({
        checkingStatus: false,
        isBlockedByBrowser: !isLoaded,
      });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { isBlockedByBrowser, checkingStatus } = this.state;
    // Safe link to open current app in new tab to completely bypass iframe privacy restrictions
    const currentUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}${window.location.pathname}?view=social&tab=social` 
      : '';

    return (
      <div className="w-full bg-gray-50/50 py-8 min-h-[600px] text-left" id="social-forum-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Editorial Heading and Social Header Information */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8 text-left" id="social-board-intro">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 bg-blue-50 text-navy-deep rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00205B]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D12B2F] tracking-wider uppercase">Public Consultation</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#00205B] tracking-tight mt-0.5">
                  Community Discussion Board
                </h1>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed">
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
                <Globe className="w-4 h-4 text-[#00205B]" />
                <div className="text-xs text-gray-500 font-medium">
                  Language: <span className="font-bold text-gray-800">English (en)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div className="text-xs text-gray-500 font-medium">
                  Verified: <span className="font-bold text-emerald-700">Official SPF-Board</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disqus Diagnostics and Iframe Help Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 text-left text-sm" id="disqus-diagnostics-bar">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#00205B] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#00205B] mb-1">Embedding Diagnostics & Preview Notice</h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-normal mb-3">
                  This page embeds the live **Disqus comment and forum thread engine**. 
                  If you see a blank area below or the thread is loading indefinitely, the script is being shielded by your **browser's ad-blocker**, **strict private browsing mode**, or **third-party cookie/iframe restrictions** inherent to sandboxed workspace environments.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href={currentUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00205B] hover:bg-[#00102E] text-white font-bold text-xs rounded-lg transition-colors shadow-sm select-none"
                    id="link-open-new-tab"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-xs text-gray-500">
                    {checkingStatus ? (
                      <span className="animate-pulse">Checking Disqus load status...</span>
                    ) : isBlockedByBrowser ? (
                      <span className="text-amber-700 font-medium">⚠️ Disqus is currently shielded on this page (blocked by browser/adblocker). Use the New Tab link above!</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">✓ Disqus script loaded successfully!</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Disqus Forum Embedding Component at the Bottom of Webpage */}
          <div className="bg-white rounded-xl border border-gray-200/80 shadow-md p-6 sm:p-8 text-left animate-fade-in" id="disqus-container-card">
            <div className="border-b border-gray-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-[#00205B] flex items-center gap-2">
                <span>SPF Forum Thread</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#00205B]">Disqus Line-In</span>
              </h2>
            </div>

            {/* Exactly requested Disqus code chunk (Wrapped in an update-isolated block) */}
            <IsolatedDisqus article={this.props.article} />
          </div>

        </div>
      </div>
    );
  }
}
