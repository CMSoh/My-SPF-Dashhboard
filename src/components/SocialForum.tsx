/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  MessageSquare, 
  Users, 
  Globe, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  AlertTriangle, 
  ShieldCheck,
  User,
  Heart,
  Filter,
  Search
} from 'lucide-react';

interface ArticleType {
  url: string;
  id: string;
  title: string;
}

interface SocialForumProps {
  article: ArticleType;
}

interface ForumReply {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  isOfficial: boolean;
  avatarColor: string;
}

interface ForumPost {
  id: string;
  category: 'Enquiry' | 'Scam Alert' | 'Traffic' | 'General';
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  replies: ForumReply[];
  isLocked?: boolean;
}

interface SocialForumState {
  searchQuery: string;
  selectedCategory: string;
  posts: ForumPost[];
  newPostTitle: string;
  newPostContent: string;
  newPostCategory: 'Enquiry' | 'Scam Alert' | 'Traffic' | 'General';
  newPostAuthor: string;
  replyInputs: { [postId: string]: string };
  replyAuthors: { [postId: string]: string };
}

export default class SocialForum extends React.Component<SocialForumProps, SocialForumState> {
  constructor(props: SocialForumProps) {
    super(props);
    this.state = {
      searchQuery: '',
      selectedCategory: 'All',
      newPostTitle: '',
      newPostContent: '',
      newPostCategory: 'Enquiry',
      newPostAuthor: '',
      replyInputs: {},
      replyAuthors: {},
      posts: [
        {
          id: 'post-1',
          category: 'Scam Alert',
          title: 'Suspicious overseas phone calls pretending to be SPF officers (+65...)',
          content: 'Hi everyone, is anyone else receiving calls from "+65" prefix numbers starting with a recording that says "Singapore Police Force has detected an anomaly in your account status"? I would like to warn my elderly neighbors. Please stay vigilant!',
          author: 'Tan Wei Ming',
          timestamp: '2 hours ago',
          likes: 42,
          hasLiked: false,
          replies: [
            {
              id: 'reply-1-1',
              author: 'Sgt. Kenneth Ong (Anti-Scam Command)',
              role: 'Official SPF Moderator',
              content: 'Thank you for raising this alert, Wei Ming. The SPF will NEVER make outbound automated recording calls to public members, nor do we ask for passwords, OTPs, or bank transfers over the phone. Please urge your neighbors to ignore these call prefixes (+65 is typically spoofed).',
              timestamp: '1 hour ago',
              isOfficial: true,
              avatarColor: 'bg-[#00205B] text-white'
            },
            {
              id: 'reply-1-2',
              author: 'Aisha_92',
              role: 'Citizen Advocate',
              content: 'Yes! My grandmother received one of these calls yesterday. Luckily, she remembered the SPF flyers and hung up. Thanks for sharing!',
              timestamp: '45 mins ago',
              isOfficial: false,
              avatarColor: 'bg-emerald-100 text-emerald-800'
            }
          ]
        },
        {
          id: 'post-2',
          category: 'Enquiry',
          title: 'Processing times for Public Entertainment Permit (Ad-hoc Events)',
          content: 'Can anyone clarify if the 14-day rule for submitting a public entertainment license/permit is strictly enforced? I have an ad-hoc community art exhibit coming up in 10 days and only just submitted the form.',
          author: 'Siti Rahma',
          timestamp: 'Yesterday',
          likes: 8,
          replies: [
            {
              id: 'reply-2-1',
              author: 'Inspector Lim (Licensing Division)',
              role: 'Official SPF Moderator',
              content: 'Hello Siti, yes, the processing time of 14 working days is required to complete cross-department consultation. We recommend contacting our Licensing division immediately at spf_licensing@spf.gov.sg with your application reference number to seek an urgent assessment.',
              timestamp: '18 hours ago',
              isOfficial: true,
              avatarColor: 'bg-[#00205B] text-white'
            }
          ]
        },
        {
          id: 'post-3',
          category: 'Traffic',
          title: 'Community Traffic Speed Feedback along Pasir Ris Drive 3',
          content: 'There has been an increase in night speeding and modified exhausts around midnight. Would it be possible to request speed enforcement cameras or a police patrol near the residential crossings?',
          author: 'MarcusG',
          timestamp: '3 days ago',
          likes: 29,
          replies: [
            {
              id: 'reply-3-1',
              author: 'Senior Stn. Inspector Chen (Traffic Police)',
              role: 'Official SPF Moderator',
              content: 'Hello Marcus, feedback noted. We routinely deploy mobile speed speed enforcement enforcement devices and nocturnal patrol vehicles based on residential reports. Your feedback has been safely logged with the Traffic Police planning branch.',
              timestamp: '2 days ago',
              isOfficial: true,
              avatarColor: 'bg-[#00205B] text-white'
            }
          ]
        }
      ]
    };
  }

  handleLike = (postId: string) => {
    this.setState(prevState => ({
      posts: prevState.posts.map(post => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            likes: hasLiked ? post.likes + 1 : post.likes - 1,
            hasLiked
          };
        }
        return post;
      })
    }));
  };

  handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const { newPostTitle, newPostContent, newPostCategory, newPostAuthor } = this.state;
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const authorName = newPostAuthor.trim() || 'Anonymous Singaporean';
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      category: newPostCategory,
      title: newPostTitle,
      content: newPostContent,
      author: authorName,
      timestamp: 'Just now',
      likes: 0,
      hasLiked: false,
      replies: []
    };

    this.setState(prevState => ({
      posts: [newPost, ...prevState.posts],
      newPostTitle: '',
      newPostContent: '',
      newPostAuthor: '',
    }));
  };

  handleReplySubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const replyText = this.state.replyInputs[postId] || '';
    const replyAuthor = this.state.replyAuthors[postId] || '';
    if (!replyText.trim()) return;

    const authorName = replyAuthor.trim() || 'Anonymous Citizen';
    const newReply: ForumReply = {
      id: `reply-${Date.now()}`,
      author: authorName,
      role: 'Community Member',
      content: replyText,
      timestamp: 'Just now',
      isOfficial: false,
      avatarColor: 'bg-indigo-100 text-indigo-800'
    };

    this.setState(prevState => {
      const updatedPosts = prevState.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [...post.replies, newReply]
          };
        }
        return post;
      });

      return {
        posts: updatedPosts,
        replyInputs: { ...prevState.replyInputs, [postId]: '' },
        replyAuthors: { ...prevState.replyAuthors, [postId]: '' }
      };
    });
  };

  handleReplyInputChange = (postId: string, value: string) => {
    this.setState(prevState => ({
      replyInputs: { ...prevState.replyInputs, [postId]: value }
    }));
  };

  handleReplyAuthorChange = (postId: string, value: string) => {
    this.setState(prevState => ({
      replyAuthors: { ...prevState.replyAuthors, [postId]: value }
    }));
  };

  render() {
    const { 
      posts, 
      searchQuery, 
      selectedCategory, 
      newPostTitle, 
      newPostContent, 
      newPostCategory, 
      newPostAuthor 
    } = this.state;

    // Filtered discussions
    const filteredPosts = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const categories: ('All' | 'Enquiry' | 'Scam Alert' | 'Traffic' | 'General')[] = [
      'All', 'Enquiry', 'Scam Alert', 'Traffic', 'General'
    ];

    return (
      <div className="w-full bg-gray-50/50 py-8 min-h-[600px]" id="social-forum-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Official Forum Banner & Intro */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8 text-left" id="social-board-intro">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 bg-blue-50 text-navy-deep rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00205B]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D12B2F] tracking-wider uppercase">Public Consultation</span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#00205B] tracking-tight mt-0.5">
                  Citizen Hub Discussion Board
                </h1>
              </div>
            </div>
            
            <p className="text-sm text-gray-650 leading-relaxed">
              Welcome to the official **Singapore Police Force e-Services Citizen Hub**.
              We have dismantled external scripting trackers (Unbuilt Disqus modules) to protect citizen privacy, load seamlessly 
              across all corporate firewalls, and prevent loop errors. Submit safety inquiries, scam warnings, licensing questions,
              and receive real-time answers from verified SPF officers.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4.5 h-4.5 text-[#D12B2F]" />
                <div className="text-xs text-gray-500 font-medium">
                  <span className="font-bold text-gray-800">100% Secure & Sandbox-Friendly</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4.5 h-4.5 text-[#00205B]" />
                <div className="text-xs text-gray-500 font-medium">
                  Language setting: <span className="font-bold text-gray-800">English (EN)</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                <div className="text-xs text-gray-500 font-medium">
                  Status: <span className="font-bold text-emerald-700">Official SPF Board</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left/Main Column: Discussions Thread */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Filter controls */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => this.setState({ selectedCategory: cat })}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                          selectedCategory === cat 
                            ? 'bg-[#00205B] text-white shadow-sm' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-48 leading-none">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => this.setState({ searchQuery: e.target.value })}
                    className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg py-2 pl-8 pr-3 outline-none focus:ring-1 focus:ring-[#00205B] focus:bg-white"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Thread list */}
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center" id="empty-forum-state">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-800">No matching threads found</p>
                  <p className="text-xs text-gray-500 mt-1">Be the first to post a new inquiry using the board on the right!</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <div 
                    key={post.id} 
                    className="bg-white rounded-xl border border-gray-200/80 shadow-md overflow-hidden text-left"
                    id={`post-card-${post.id}`}
                  >
                    {/* Header info */}
                    <div className="p-5 sm:p-6 border-b border-gray-50 bg-gray-50/40">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          post.category === 'Scam Alert' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                            : post.category === 'Enquiry'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">{post.timestamp}</span>
                      </div>
                      
                      <h2 className="text-base sm:text-lg font-bold text-[#00205B] line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                          {post.author.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-gray-600">By {post.author}</span>
                      </div>
                    </div>

                    {/* Content body */}
                    <div className="p-5 sm:p-6">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>

                      {/* Thread Control Panel */}
                      <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
                        <button 
                          onClick={() => this.handleLike(post.id)}
                          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-all px-3 py-1.5 rounded-lg border ${
                            post.hasLiked 
                              ? 'bg-rose-50 border-rose-200 text-[#D12B2F]' 
                              : 'bg-gray-50 border-gray-200/60 text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.likes} {post.hasLiked ? 'Liked' : 'Like'}</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                          <span>{post.replies.length} comments</span>
                        </div>
                      </div>
                    </div>

                    {/* Replies list */}
                    {post.replies.length > 0 && (
                      <div className="bg-gray-50/60 border-t border-gray-100 p-5 sm:p-6 space-y-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Comments</h4>
                        {post.replies.map(reply => (
                          <div 
                            key={reply.id} 
                            className={`p-3.5 rounded-lg border text-sm text-left ${
                              reply.isOfficial 
                                ? 'bg-blue-50/80 border-blue-100 shadow-sm' 
                                : 'bg-white border-gray-100'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${reply.avatarColor}`}>
                                  {reply.isOfficial ? '★' : reply.author.slice(0, 1).toUpperCase()}
                                </div>
                                <div>
                                  <span className={`text-xs font-bold ${reply.isOfficial ? 'text-[#00205B]' : 'text-gray-700'}`}>
                                    {reply.author}
                                  </span>
                                  {reply.isOfficial && (
                                    <span className="ml-1.5 text-[9px] font-bold bg-[#00205B] text-white px-1.5 py-0.5 rounded">
                                      OFFICIAL
                                    </span>
                                  )}
                                </div>
                              </div>
                              <span className="text-[10px] text-gray-400 font-mono">{reply.timestamp}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-normal pl-7">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Submit Comment/Reply Form */}
                    <div className="bg-white border-t border-gray-100 p-4 sm:p-5">
                      <form onSubmit={(e) => this.handleReplySubmit(post.id, e)} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Your Name (defaults to Anonymous)"
                            value={this.state.replyAuthors[post.id] || ''}
                            onChange={(e) => this.handleReplyAuthorChange(post.id, e.target.value)}
                            className="bg-gray-50/50 text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-[#00205B]"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Write a comment / answer..."
                            value={this.state.replyInputs[post.id] || ''}
                            onChange={(e) => this.handleReplyInputChange(post.id, e.target.value)}
                            className="flex-1 bg-gray-50/50 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-[#00205B]"
                            required
                          />
                          <button
                            type="submit"
                            className="bg-[#00205B] hover:bg-[#00102E] text-white p-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    </div>

                  </div>
                ))
              )}

            </div>

            {/* Right Column: Submit a new Topic */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 sm:p-6 text-left">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                  <MessageSquare className="w-5 h-5 text-[#D12B2F]" />
                  <h3 className="font-bold text-[#00205B] text-base">New Discussion</h3>
                </div>

                <form onSubmit={this.handleCreatePost} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Topic Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => this.setState({ newPostCategory: e.target.value as any })}
                      className="w-full bg-gray-50 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-[#00205B]"
                    >
                      <option value="Enquiry">Enquiry</option>
                      <option value="Scam Alert">Scam Alert</option>
                      <option value="Traffic">Traffic Speed / Road Safety</option>
                      <option value="General">General Safety</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Author / Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. concerned_citizen"
                      value={newPostAuthor}
                      onChange={(e) => this.setState({ newPostAuthor: e.target.value })}
                      className="w-full bg-gray-50 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-[#00205B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase font-sans">Thread Title</label>
                    <input
                      type="text"
                      placeholder="Brief topic summary..."
                      value={newPostTitle}
                      onChange={(e) => this.setState({ newPostTitle: e.target.value })}
                      className="w-full bg-gray-50 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-[#00205B]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Message Details</label>
                    <textarea
                      placeholder="Explain your advice, question or feedback..."
                      rows={4}
                      value={newPostContent}
                      onChange={(e) => this.setState({ newPostContent: e.target.value })}
                      className="w-full bg-gray-50 text-xs border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-[#00205B] resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#00205B] hover:bg-[#00143B] text-white py-2.5 px-4 rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Thread</span>
                  </button>
                </form>
              </div>

              {/* Citizen Advisory Panel */}
              <div className="bg-gray-900 text-white rounded-xl p-5 text-left border border-gray-850">
                <h4 className="font-bold text-xs uppercase tracking-widest text-amber-500 mb-2">Community Guidelines</h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Avoid posting sensitive personal data, case files under active investigation, or derogatory messages. Keep conversations aligned with civic safety, scam warnings, and educational feedback.
                </p>
                <div className="mt-4 pt-3 border-t border-gray-800 text-[11px] text-gray-400">
                  Moderated strictly by <strong>Singapore Police Force (SPF) Public Relations unit</strong>.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}
