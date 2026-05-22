/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { PracticeQuestion, TestResult } from '../types';
import { THEORY_QUESTIONS } from '../data';

interface PracticeTestsProps {
  setCurrentView: (view: any) => void;
  setActiveTab: (tab: any) => void;
}

export default function PracticeTests({ setCurrentView, setActiveTab }) {
  const [testCategory, setTestCategory] = useState<'BTT' | 'FTT' | 'RTT'>('BTT');
  
  // Quiz session state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Past database logger for results
  const [pastResults, setPastResults] = useState<TestResult[]>([
    { category: 'BTT', score: 4, total: 5, date: '18 May 2026', passed: true },
    { category: 'FTT', score: 2, total: 3, date: '15 May 2026', passed: true }
  ]);

  // Filter current questions
  const currentQuestions = THEORY_QUESTIONS.filter((q) => q.category === testCategory);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswersCount(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (selectedAnswer !== null) return; // Answer locked

    setSelectedAnswer(optionIdx);
    const activeQuestion = currentQuestions[currentIndex];
    
    if (optionIdx === activeQuestion.correctIndex) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Completed, save result
      const passMark = Math.ceil(currentQuestions.length * 0.8);
      const passed = correctAnswersCount >= passMark;

      const newLog: TestResult = {
        category: testCategory,
        score: correctAnswersCount,
        total: currentQuestions.length,
        date: 'Today',
        passed
      };

      setPastResults((prev) => [newLog, ...prev]);
      setQuizCompleted(true);
    }
  };

  const quitQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen" id="driving-theory-view">
      
      {/* Banner */}
      <section className="bg-[#00205B] text-white py-12 relative overflow-hidden" id="practice-test-hero">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <nav className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-200 select-none">
            <button onClick={() => { setActiveTab('services'); setCurrentView('home'); }} className="hover:underline">Home</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <button onClick={() => quitQuiz()} className="hover:underline">Traffic</button>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white">Practice Tests</span>
          </nav>

          <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            Theory Test Practice Portal
          </h1>
          <p className="font-sans text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            Revise and assess Singapore highway driving and riding theory rules. Choose Basic, Final, or Riding modules below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel Selection list */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs" id="practice-sidebar">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-left">
                <h2 className="font-sans text-base font-bold text-navy-deep">Revision Categories</h2>
                <p className="text-[11px] text-gray-550 mt-0.5">Please choose a quiz syllabus</p>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <button
                  disabled={quizStarted && !quizCompleted}
                  onClick={() => { setTestCategory('BTT'); quitQuiz(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    testCategory === 'BTT' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-650'
                  } ${quizStarted && !quizCompleted ? 'opacity-40 cursor-not-allowed' : ''}`}
                  id="tab-btt"
                >
                  <span className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-navy-deep" />
                    <span>Basic Theory Test (BTT)</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-navy-deep" />
                </button>

                <button
                  disabled={quizStarted && !quizCompleted}
                  onClick={() => { setTestCategory('FTT'); quitQuiz(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    testCategory === 'FTT' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-650'
                  } ${quizStarted && !quizCompleted ? 'opacity-40 cursor-not-allowed' : ''}`}
                  id="tab-ftt"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>Final Theory Test (FTT)</span>
                  </span>
                </button>

                <button
                  disabled={quizStarted && !quizCompleted}
                  onClick={() => { setTestCategory('RTT'); quitQuiz(); }}
                  className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-lg text-left text-xs font-semibold hover:bg-gray-50 transition-all ${
                    testCategory === 'RTT' ? 'bg-[#dae2ff] text-navy-deep border-l-4 border-navy-deep font-bold' : 'text-gray-650'
                  } ${quizStarted && !quizCompleted ? 'opacity-40 cursor-not-allowed' : ''}`}
                  id="tab-rtt"
                >
                  <span className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>Riding Theory Test (RTT)</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Past attempts log metric */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 text-left shadow-xs">
              <span className="text-xs font-bold text-navy-deep flex items-center gap-1 mb-3">
                <TrendingUp className="w-4 h-4 text-navy-deep" />
                Past Sessions Log
              </span>
              <div className="space-y-2.5">
                {pastResults.map((hist, i) => (
                  <div key={i} className="flex justify-between items-center text-xs pb-2 border-b border-gray-100 last:border-none last:pb-0">
                    <div className="space-y-0.5">
                      <p className="font-bold text-gray-700">{hist.category} Mock Exam</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{hist.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy-deep font-mono">{hist.score} / {hist.total}</p>
                      <span className={`text-[9px] font-bold ${hist.passed ? 'text-green-600' : 'text-spf-red'}`}>
                        {hist.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right workspace panel: Quiz Sheet */}
          <main className="lg:col-span-8 bg-white border border-gray-250/80 rounded-xl shadow-xs p-6 sm:p-8 min-h-[500px]">
            
            {quizCompleted ? (
              /* RESULTS SUMMARY CARD (Screenshot 8) */
              <div id="results-dashboard" className="text-center py-8 px-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-50 border border-blue-200 text-navy-deep rounded-full flex items-center justify-center mb-6">
                  <Award className="w-10 h-10 text-navy-deep" />
                </div>
                
                <h3 className="font-sans text-2xl font-extrabold text-navy-deep tracking-tight mb-2">Practice Session Finished</h3>
                <p className="text-xs text-gray-500 mb-6 font-semibold">revised category: {testCategory} Practice Questionnaire</p>

                {/* Score bar */}
                <div className="bg-gray-55/35  border border-gray-200 rounded-lg p-6 w-full max-w-sm mb-8 text-center space-y-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">YOUR RETURNING SCORE</p>
                  
                  <div className="space-y-1">
                    <p className="text-4xl font-extrabold text-navy-deep font-mono">
                      {correctAnswersCount} <span className="text-gray-400 text-2xl font-normal">/ {currentQuestions.length}</span>
                    </p>
                    <p className="text-xs font-bold text-gray-600 font-mono">
                      (Percentage Achieved: {Math.round((correctAnswersCount / currentQuestions.length) * 100)}%)
                    </p>
                  </div>

                  {/* Criteria Badge */}
                  <div className="inline-block pt-1">
                    {correctAnswersCount >= Math.ceil(currentQuestions.length * 0.8) ? (
                      <span className="bg-green-100 text-green-700 font-bold text-xs tracking-wide border border-green-200 py-1.5 px-6 rounded-full inline-block">
                        EXAM PASSED (80% req)
                      </span>
                    ) : (
                      <span className="bg-red-100 text-spf-red font-bold text-xs tracking-wide border border-red-200 py-1.5 px-6 rounded-full inline-block">
                        EXAM FAILED (80% req)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button 
                    onClick={startQuiz}
                    className="px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-sm select-none transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-white" />
                    Try Again
                  </button>
                  <button 
                    onClick={quitQuiz}
                    className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg text-sm select-none transition-colors"
                  >
                    Change Category
                  </button>
                </div>
              </div>
            ) : quizStarted ? (
              /* THE ACTIVE QUIZ SCREEN (Screenshot 8) */
              <div id="quiz-workspace" className="text-left space-y-6">
                
                {/* Active index banner header */}
                <div className="flex justify-between items-center border-b border-gray-150 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] bg-blue-50 text-navy-deep font-bold px-2 py-0.5 rounded border border-blue-100">{testCategory} Syllabus</span>
                    <h3 className="font-sans text-sm font-bold text-navy-deep pt-1.5">Question {currentIndex + 1} of {currentQuestions.length}</h3>
                  </div>
                  <button 
                    onClick={quitQuiz} 
                    type="button" 
                    className="text-xs text-red-500 hover:text-red-700 font-bold select-none"
                  >
                    Exit Revision
                  </button>
                </div>

                {/* Progress bar timeline */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden select-none">
                  <div 
                    className="bg-[#00205B] h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>

                {/* Specific perspectives images if any */}
                {testCategory === 'BTT' && currentIndex === 0 && (
                  <div className="h-56 overflow-hidden rounded-xl border border-gray-150 select-none bg-zinc-100 flex items-center justify-center">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgKtZ37nPWMYHK7jCNX3BK2Hzv3i_FU294AhRR793ss68w1LjSeLkXVCOvyfPhaQmkAHx53vbjrfBppOLFosoowavUoLB0AQe3H3r9D1vigc80n1zUwZjkRJdDMn6d3nhJfjPeMpZ1X1ZtNgE8-ePzf78s5qHw-BCRJwtZq81X-dYmly86x9-4Qwg2Ugizs_-SeeNqkP9oOGCkm8Di8Rbc6ioCXl2fp2zyi3KN8GWKaXzGZj9K-QxF2eMBPwZ53M2SBRHRYrm1SGT2"
                      alt="Bukit Batok Signal Junction Driving perspective" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {testCategory === 'FTT' && currentIndex === 1 && (
                  <div className="h-56 overflow-hidden rounded-xl border border-gray-150 select-none bg-zinc-100 flex items-center justify-center font-bold">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuArCM6ycpwE9aUCSwW1DAqnuLkKM8QhpRItwvTmsWXzFcQTzfAaBO8mVmQAySNRg4XXWXeqkHvsHf-uYJ_kklOFpSxPTdtpg1iVVhGqBXrjdVqf1nMKhG6iZwlM74E10BIqcDRS2REve7ff8G3JMWr-t55KCeZpYvPYx4ZqaYo42jV97dFRsDZdBIQ5bM3CgPMJANEZUZPgxoIBc-yZN9o0CIsN_jfNx_BF7qfzKYJrTBGsqM9_G3Dzzew3Fi2q4DxjaXr5UBLiGSJR"
                      alt="ComfortDelGro expressway tracking perspective" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {testCategory === 'RTT' && currentIndex === 0 && (
                  <div className="h-56 overflow-hidden rounded-xl border border-gray-150 select-none bg-zinc-100 flex items-center justify-center font-bold">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCms2CzolztRhKDshOSu3LlzA6J5ycUsijeOOny33F35kkd_PPPALToB2bvVoqZkgJWNTjUbemmrGqs__g4YxLQDW7di4qK_vRT1zLsJ3URUNt5R9gZ_HStfe8kWEo9YKMcSvYK0yjL7KRu8_mn6g0m5ct84_7knTIA0QR85PJbnZJNlBCdpBMw4_TQDWagyWnNUnqVfPMT8ygTq8bXujqQmJaswwBKpy8qpSGhpGRqLlalerrlP2Y-Qnqs0ThCXxwx6EirQix0dQb2"
                      alt="Singapore safety road cornering simulation perspective" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Question Text */}
                <div className="space-y-2">
                  <p className="font-sans text-base font-bold text-navy-deep leading-relaxed">
                    {currentQuestions[currentIndex].question}
                  </p>
                </div>

                {/* Multiple choice selections */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {currentQuestions[currentIndex].options.map((option, choiceIdx) => {
                    const isSelected = selectedAnswer === choiceIdx;
                    const isCorrectAnswer = choiceIdx === currentQuestions[currentIndex].correctIndex;
                    const isWrongSelection = isSelected && !isCorrectAnswer;

                    return (
                      <button
                        key={choiceIdx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelect(choiceIdx)}
                        className={`p-4 border rounded-xl text-left text-xs font-bold leading-relaxed transition-all flex items-start gap-3 w-full ${
                          selectedAnswer === null 
                            ? 'bg-white border-gray-200 hover:border-navy-deep hover:bg-gray-50/50 cursor-pointer'
                            : isCorrectAnswer
                              ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                              : isWrongSelection
                                ? 'bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500'
                                : 'bg-white border-gray-100 text-gray-400 opacity-60'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[10px] font-extrabold ${
                          selectedAnswer === null 
                            ? 'border-gray-300 text-gray-500 bg-gray-50'
                            : isCorrectAnswer
                              ? 'border-green-500 bg-green-500 text-white'
                              : isWrongSelection
                                ? 'border-red-500 bg-red-500 text-white'
                                : 'border-gray-200 text-gray-400'
                        }`}>
                          {choiceIdx === 0 ? 'A' : choiceIdx === 1 ? 'B' : 'C'}
                        </span>
                        <span className="flex-grow">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Render Explanation scrolling notes if answer chosen */}
                {selectedAnswer !== null && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg flex gap-3 text-left animate-fade-in text-xs leading-normal text-gray-600 select-none">
                    <AlertCircle className="w-5 h-5 text-navy-deep shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-navy-deep">Explanation & Highway Code</p>
                      <p className="mt-1 leading-relaxed text-gray-550">{currentQuestions[currentIndex].explanation}</p>
                    </div>
                  </div>
                )}

                {/* Submittal and progression button */}
                <div className="border-t border-gray-150 pt-4 flex justify-end">
                  <button
                    disabled={selectedAnswer === null}
                    onClick={handleNextQuestion}
                    className={`px-6 py-2.5 bg-navy-deep hover:bg-navy-deep/90 text-white font-bold rounded-lg text-xs tracking-wide transition-all select-none flex items-center gap-1.5 ${
                      selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span>{currentIndex + 1 === currentQuestions.length ? 'Finish Test' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>

              </div>
            ) : (
              /* DEFAULT PORTAL DIRECTORY CARD */
              <div id="practice-landing" className="text-left space-y-6">
                <div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold text-navy-deep">
                    {testCategory === 'BTT' ? 'Basic Theory Practice' : 
                     testCategory === 'FTT' ? 'Final Theory Practice' : 'Riding Theory Practice'}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Review rules of the road and complete instant self-assessments to ensure high proficiency before scheduled driving license exams at Bukit Batok or ComfortDelgro driving centres.
                  </p>
                </div>

                {/* Quick Info card description details */}
                <div className="bg-gray-50/70 border border-gray-200 rounded-xl p-5 hover:bg-white hover:border-navy-deep hover:shadow-xs transition-all relative flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-3 max-w-md">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full select-none">
                      <BookOpen className="w-3.5 h-3.5" />
                      Passing Mark: 80% (4/5)
                    </span>
                    <h3 className="font-sans text-base font-bold text-navy-deep">Simulator Exam Parameters</h3>
                    <p className="text-xs text-gray-550 leading-relaxed">
                      Questions simulate the genuine system curriculum exactly. Test includes active lane markings diagrams, traffic sign descriptions, and drink-driving regulatory constraints.
                    </p>
                  </div>
                  <div className="my-auto self-end sm:self-center shrink-0">
                    <button 
                      onClick={startQuiz}
                      className="px-6 py-2.5 bg-[#00205B] hover:bg-[#001438] text-white font-bold rounded-lg text-xs tracking-wide transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                      id="btn-start-revision"
                    >
                      Start Mock Exam
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>
      </section>

    </div>
  );
}
