/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { questions, Question } from './questions';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Info, Play, Copy, Check, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [reattemptCodeInput, setReattemptCodeInput] = useState('');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(questions);
  const [allQuestionStatuses, setAllQuestionStatuses] = useState<number[]>(new Array(questions.length).fill(0));
  const [bookmarks, setBookmarks] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<{ question: Question; userAnswer: string }[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateReattemptCode = (statuses: number[], currentBookmarks: boolean[]) => {
    let code = BigInt(0);
    for (let i = 0; i < questions.length; i++) {
      let val;
      if (currentBookmarks[i]) {
        val = 0;
      } else if (statuses[i] === 0 || statuses[i] === 1) {
        val = 1;
      } else {
        val = 2;
      }
      code += BigInt(val) * (BigInt(3) ** BigInt(i));
    }
    return code.toString();
  };

  const decodeReattemptCode = (codeStr: string) => {
    try {
      let code = BigInt(codeStr);
      const statuses: number[] = [];
      const decodedBookmarks: boolean[] = [];
      for (let i = 0; i < questions.length; i++) {
        const val = Number(code % BigInt(3));
        if (val === 0) {
          decodedBookmarks.push(true);
          statuses.push(0);
        } else if (val === 1) {
          decodedBookmarks.push(false);
          statuses.push(0);
        } else {
          decodedBookmarks.push(false);
          statuses.push(2);
        }
        code /= BigInt(3);
      }
      return { statuses, bookmarks: decodedBookmarks };
    } catch (e) {
      return { 
        statuses: new Array(questions.length).fill(0), 
        bookmarks: new Array(questions.length).fill(false) 
      };
    }
  };

  const handleStart = () => {
    let baseQuestions = questions;
    let statuses = new Array(questions.length).fill(0);
    let initialBookmarks = new Array(questions.length).fill(false);

    if (reattemptCodeInput.trim()) {
      const decoded = decodeReattemptCode(reattemptCodeInput.trim());
      statuses = decoded.statuses;
      initialBookmarks = decoded.bookmarks;
      
      const filtered = questions.filter((q) => {
        const idx = q.questionNumber - 1;
        // Include if bookmarked (val 0) or unattempted/wrong (val 1)
        // In our decoded logic, val 0 and 1 both result in statuses[idx] being 0 (unattempted)
        // but we can check the original code logic: val 0 or 1.
        // Let's re-decode properly to filter.
        let code = BigInt(reattemptCodeInput.trim());
        for(let i=0; i<idx; i++) code /= BigInt(3);
        const val = Number(code % BigInt(3));
        return val === 0 || val === 1;
      });

      if (filtered.length > 0) {
        baseQuestions = filtered;
      }
    }
    
    setAllQuestionStatuses(statuses);
    setBookmarks(initialBookmarks);
    setActiveQuestions(shuffleArray(baseQuestions));
    setShowWelcome(false);
  };

  const handleOptionSelect = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !isSubmitted) {
      setIsSubmitted(true);
      const qIdx = currentQuestion.questionNumber - 1;
      const newStatuses = [...allQuestionStatuses];
      
      if (selectedOption === currentQuestion.answer) {
        setScore(prev => prev + 1);
        newStatuses[qIdx] = 2;
      } else {
        setWrongAttempts(prev => [...prev, { question: currentQuestion, userAnswer: selectedOption }]);
        newStatuses[qIdx] = 1;
      }
      setAllQuestionStatuses(newStatuses);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setWrongAttempts([]);
    setQuizComplete(false);
    setShowWelcome(true);
    setReattemptCodeInput('');
  };

  const handleEndQuiz = () => {
    setQuizComplete(true);
  };

  const toggleBookmark = () => {
    const qIdx = currentQuestion.questionNumber - 1;
    const newBookmarks = [...bookmarks];
    newBookmarks[qIdx] = !newBookmarks[qIdx];
    setBookmarks(newBookmarks);
  };

  const copyToClipboard = () => {
    const code = generateReattemptCode(allQuestionStatuses, bookmarks);
    navigator.clipboard.writeText(code);
    setShowCopyPopup(true);
    setTimeout(() => setShowCopyPopup(false), 2000);
  };

  if (showHowToUse) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-zinc-200 overflow-y-auto max-h-[90vh] custom-scrollbar"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-zinc-900">How to Use</h2>
            <button 
              onClick={() => setShowHowToUse(false)}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <XCircle className="w-8 h-8 text-zinc-400" />
            </button>
          </div>

          <div className="space-y-8 text-left">
            <section>
              <h3 className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2">
                <Play className="w-5 h-5 text-zinc-900 fill-current" />
                Question Screen
              </h3>
              <p className="text-xs text-zinc-400 mb-4 ml-7">Explanation of buttons and controls during the quiz:</p>
              <ul className="space-y-3 text-zinc-600 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">A, B, C, D:</span>
                  Select your answer by clicking the option buttons in the header or the cards below.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">Bookmark:</span>
                  <span>
                    Click the bookmark icon <Bookmark className="w-4 h-4 inline-block text-zinc-400 align-text-bottom" /> to mark a question for review, regardless of whether you get it right or wrong.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">Submit:</span>
                  Confirm your choice and see the feedback.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">End Quiz:</span>
                  Stop the quiz early and jump straight to the report.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-zinc-900" />
                Explanation Screen
              </h3>
              <ul className="space-y-3 text-zinc-600 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">Feedback:</span>
                  Instantly see if you were correct or incorrect.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">Explanation:</span>
                  Read the detailed reasoning behind the correct answer to improve your understanding.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-zinc-900">Next/Finish:</span>
                  Move to the next question in the randomized set.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-zinc-900" />
                Reattempt Code
              </h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-3">
                At the end of each session, you'll get a unique code used to filter the questions in the next attempt:
              </p>
              <ul className="space-y-2 text-zinc-600 text-sm mb-4">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Bookmarked questions will always appear in the next attempt.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Wrong or unattempted questions will appear in the next attempt.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Correct (non-bookmarked) questions will be filtered out and not appear.</span>
                </li>
              </ul>
              <p className="text-zinc-600 text-sm italic">
                Paste this code on the welcome screen to focus only on the questions you need to review.
              </p>
            </section>
          </div>

          <button
            onClick={() => setShowHowToUse(false)}
            className="w-full mt-10 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg"
          >
            Got it!
          </button>
        </motion.div>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center border border-zinc-200"
        >
          <div className="mb-8 inline-flex p-5 bg-zinc-900 rounded-2xl">
            <Play className="w-10 h-10 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-black text-zinc-900 mb-4">BM MC Revision</h1>
          <p className="text-zinc-500 mb-10 leading-relaxed">
            Welcome to the revision quiz of<br />C3 Ch 1 Time Value of Money
          </p>

          <div className="space-y-6 text-left mb-10">
            <button
              onClick={() => setShowHowToUse(true)}
              className="w-full py-3 bg-zinc-200 text-zinc-900 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-300 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Info className="w-4 h-4" />
              How to use
            </button>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3 ml-1">
                Reattempt Code (Optional)
              </label>
              <input 
                type="text"
                value={reattemptCodeInput}
                onChange={(e) => setReattemptCodeInput(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full px-5 py-4 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:border-zinc-900 focus:outline-none transition-all font-mono text-sm"
              />
              <p className="text-[10px] text-zinc-400 mt-2 ml-1">
                Enter a code from a previous session to reattempt wrong or unattempted questions.
              </p>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl active:scale-[0.98]"
          >
            Start Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  if (quizComplete) {
    const reattemptCode = generateReattemptCode(allQuestionStatuses, bookmarks);
    const attemptedCount = isSubmitted ? currentQuestionIndex + 1 : currentQuestionIndex;
    return (
      <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
        {/* Header for Report Screen */}
        <div className="sticky top-0 z-10 bg-white border-bottom border-zinc-200 shadow-sm px-4 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-zinc-900">Quiz Report</h2>
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-zinc-900 text-white rounded-xl font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Restart Quiz
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center py-8 px-4">
          <div className="max-w-2xl w-full space-y-6">
            {/* Reattempt Code Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={copyToClipboard}
              className="bg-white p-6 rounded-2xl shadow-md border border-zinc-200 cursor-pointer hover:border-zinc-400 transition-all group relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Reattempt Code</span>
                <Copy className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
              </div>
              <div className="font-mono text-lg font-bold text-zinc-900 break-all bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                {reattemptCode}
              </div>
              <p className="text-[10px] text-zinc-400 mt-3 text-center">Click to copy code for next session</p>
              
              <AnimatePresence>
                {showCopyPopup && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xl"
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                    Code Copied!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-2xl shadow-xl w-full text-center border border-zinc-200"
            >
              <div className="mb-6 inline-flex p-4 bg-emerald-50 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">Quiz Complete!</h2>
              <p className="text-zinc-500 mb-8">You've finished the BAFS business environment module.</p>
              
              <div className="bg-zinc-50 rounded-xl p-6 mb-8 border border-zinc-100 flex justify-around items-center">
                <div>
                  <div className="text-sm uppercase tracking-wider text-zinc-400 font-semibold mb-1">Final Score</div>
                  <div className="text-5xl font-black text-zinc-900">
                    {score} <span className="text-zinc-300 text-3xl">/ {attemptedCount}</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-zinc-200" />
                <div>
                  <div className="text-sm uppercase tracking-wider text-zinc-400 font-semibold mb-1">Accuracy</div>
                  <div className="text-5xl font-black text-zinc-900">
                    {attemptedCount > 0 ? Math.round((score / attemptedCount) * 100) : 0}%
                  </div>
                </div>
              </div>

              {wrongAttempts.length > 0 && (
                <div className="text-left mb-8">
                  <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-rose-500" />
                    Review Wrong Attempts ({wrongAttempts.length})
                  </h3>
                  <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {wrongAttempts.map((attempt, idx) => (
                      <div key={idx} className="p-6 rounded-xl border border-zinc-100 bg-zinc-50/50 space-y-4">
                        <div>
                          <p className="text-zinc-800 font-medium whitespace-pre-line">{attempt.question.text}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-lg">
                            <XCircle className="w-4 h-4" />
                            Your Answer: {attempt.userAnswer}
                          </div>
                          <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg">
                            <CheckCircle2 className="w-4 h-4" />
                            Correct: {attempt.question.answer}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-200">
                          <div className="flex items-center gap-2 mb-2 text-zinc-400">
                            <Info className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Explanation</span>
                          </div>
                          <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">
                            {attempt.question.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Top Control Bar */}
      <div className="sticky top-0 z-10 bg-white border-bottom border-zinc-200 shadow-sm px-4 py-4">
        <div className="max-w-3xl mx-auto flex flex-col-reverse md:grid md:grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
            {(['A', 'B', 'C', 'D'] as const).map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                disabled={isSubmitted}
                className={`
                  w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200
                  ${selectedOption === option 
                    ? 'bg-zinc-900 text-white shadow-lg scale-105' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 active:scale-95'}
                  ${isSubmitted && option === currentQuestion.answer ? 'ring-4 ring-emerald-500 ring-offset-2' : ''}
                  ${isSubmitted && selectedOption === option && option !== currentQuestion.answer ? 'ring-4 ring-rose-500 ring-offset-2' : ''}
                  disabled:cursor-default
                `}
              >
                {option}
              </button>
            ))}
            <div className="w-px h-8 bg-zinc-200 mx-1 hidden md:block" />
            <button
              onClick={toggleBookmark}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                ${bookmarks[currentQuestion.questionNumber - 1] 
                  ? 'bg-amber-100 text-amber-600 shadow-inner' 
                  : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'}
              `}
              title="Bookmark Question"
            >
              <Bookmark className={`w-5 h-5 ${bookmarks[currentQuestion.questionNumber - 1] ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="hidden md:flex justify-center w-full">
            {isSubmitted && (
              <button
                onClick={handleEndQuiz}
                className="px-6 py-3 bg-white border-2 border-zinc-200 text-zinc-600 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
              >
                End Quiz
              </button>
            )}
          </div>

          <div className="w-full md:w-auto flex gap-2 justify-center md:justify-end">
            {isSubmitted && (
              <button
                onClick={handleEndQuiz}
                className="md:hidden flex-1 px-4 py-3 bg-white border-2 border-zinc-200 text-zinc-600 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all shadow-sm active:scale-95"
              >
                End
              </button>
            )}
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className={`
                  flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all
                  ${!selectedOption 
                    ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md active:scale-95'}
                `}
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 md:flex-none px-8 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                {currentQuestionIndex < activeQuestions.length - 1 ? 'Next' : 'Finish'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6 pt-12">
        {/* Feedback Section */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 mb-12"
            >
              <div className={`p-6 rounded-2xl flex items-start gap-4 ${
                selectedOption === currentQuestion.answer 
                  ? 'bg-emerald-50 border border-emerald-100' 
                  : 'bg-rose-50 border border-rose-100'
              }`}>
                {selectedOption === currentQuestion.answer ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className={`font-bold text-lg ${
                    selectedOption === currentQuestion.answer ? 'text-emerald-900' : 'text-rose-900'
                  }`}>
                    {selectedOption === currentQuestion.answer ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className={selectedOption === currentQuestion.answer ? 'text-emerald-700' : 'text-rose-700'}>
                    The correct answer is <span className="font-bold">{currentQuestion.answer}</span>.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-zinc-400">
                  <Info className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Explanation</span>
                </div>
                <p className="text-zinc-600 leading-relaxed whitespace-pre-line">
                  {currentQuestion.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Question {currentQuestionIndex + 1} of {activeQuestions.length}
            </span>
          </div>
          
          <h1 className="text-lg font-medium leading-tight text-zinc-900 whitespace-pre-line">
            {currentQuestion.text}
          </h1>
        </div>

        {/* Options Display */}
        <div className="grid gap-4 mb-12">
          {(Object.entries(currentQuestion.options) as [keyof Question['options'], string][]).map(([key, value]) => (
            <div 
              key={key}
              onClick={() => handleOptionSelect(key as 'A' | 'B' | 'C' | 'D')}
              className={`
                p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4
                ${selectedOption === key 
                  ? 'border-zinc-900 bg-zinc-900/5' 
                  : 'border-zinc-100 hover:border-zinc-200 bg-white'}
                ${isSubmitted && key === currentQuestion.answer ? 'border-emerald-500 bg-emerald-50' : ''}
                ${isSubmitted && selectedOption === key && key !== currentQuestion.answer ? 'border-rose-500 bg-rose-50' : ''}
              `}
            >
              <span className={`
                flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold
                ${selectedOption === key ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'}
                ${isSubmitted && key === currentQuestion.answer ? 'bg-emerald-500 text-white' : ''}
                ${isSubmitted && selectedOption === key && key !== currentQuestion.answer ? 'bg-rose-500 text-white' : ''}
              `}>
                {key}
              </span>
              <p className="text-lg text-zinc-700 pt-0.5">{value}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-zinc-200">
        <motion.div 
          className="h-full bg-zinc-900"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + (isSubmitted ? 1 : 0)) / activeQuestions.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
