import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const AeroQuizModule: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const scorePercentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  let rankTitle = 'Aviation Flight Cadet';
  let rankColor = 'text-slate-400';
  if (scorePercentage === 100) {
    rankTitle = 'Chief Aerodynamicist & Skunk Works Fellow';
    rankColor = 'text-amber-300';
  } else if (scorePercentage >= 75) {
    rankTitle = 'Lead Flight Test Engineer';
    rankColor = 'text-cyan-300';
  } else if (scorePercentage >= 50) {
    rankTitle = 'Aeronautical Systems Specialist';
    rankColor = 'text-teal-300';
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Aerospace Engineering & Historical IQ Assessment</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Aero IQ Knowledge Evaluation
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
          Test your technical understanding of thin airfoil physics, sound barrier phenomena, historical flight milestones, and high-bypass propulsion.
        </p>
      </div>

      {!quizFinished ? (
        <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-cyan-500/20 text-slate-400 mb-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
              Category: {currentQ.category}
            </span>
            <span className="text-cyan-400 font-bold">
              Current Score: {score}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'bg-slate-900/80 hover:bg-slate-800/80 border-slate-700 text-slate-200';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-sans transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full bg-black/40 border border-current flex items-center justify-center font-mono text-xs shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation Reveal */}
          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 font-mono font-bold text-cyan-300">
                <HelpCircle className="w-4 h-4" />
                <span>Engineering Explanation:</span>
              </div>
              <p className="font-sans leading-relaxed text-slate-300 pt-1">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <span>{currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="hud-panel p-8 rounded-2xl border border-cyan-500/40 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            <Award className="w-10 h-10 text-cyan-400" />
          </div>

          <div>
            <span className="font-mono text-xs uppercase text-slate-400 tracking-wider">
              Assessment Completed
            </span>
            <h3 className="font-heading text-3xl font-extrabold text-white mt-1">
              Score: {score} / {QUIZ_QUESTIONS.length} ({scorePercentage}%)
            </h3>
            <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-black/60 border border-cyan-500/30">
              <span className="font-mono text-xs text-slate-400">Awarded Title: </span>
              <strong className={`font-mono text-sm font-bold ${rankColor}`}>
                {rankTitle}
              </strong>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            {scorePercentage >= 75
              ? 'Outstanding performance. You have mastered historical flight milestones, transonic wave drag dynamics, and high-altitude flight physics.'
              : 'Good effort. Review the aircraft hangar and the wind tunnel lab to reinforce your understanding of aerodynamic lift-to-drag and thermodynamic cycles.'}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-xs tracking-wider shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Examination</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

