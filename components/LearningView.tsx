
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateLessonContent } from '../services/geminiService';
import { Lesson, Question } from '../types';
import { ChevronLeft, CheckCircle2, AlertCircle, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface LearningViewProps {
  topic: string;
  domain: string;
  level: number;
  onComplete: (xp: number) => void;
  onBack: () => void;
}

const LearningView: React.FC<LearningViewProps> = ({ topic, domain, level, onComplete, onBack }) => {
  const [lesson, setLesson] = useState<Partial<Lesson> | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<'reading' | 'quiz'>('reading');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<{ score: number, finished: boolean } | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const content = await generateLessonContent(domain, topic, level);
        setLesson(content);
      } catch (error) {
        console.error("Failed to generate lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [topic, domain, level]);

  const handleQuizSubmit = () => {
    if (!lesson?.quiz) return;
    let score = 0;
    lesson.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizResults({ score, finished: true });
    
    // Reward logic
    const xpGained = (score / lesson.quiz.length) * 100 + 50;
    if (score === lesson.quiz.length) {
      // Bonus for perfect score
      onComplete(Math.round(xpGained + 50));
    } else {
      onComplete(Math.round(xpGained));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">Personalizing your {domain} lesson...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-6 group"
      >
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Dashboard</span>
      </button>

      <div className="glass-card rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-100 h-1.5 w-full">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500" 
            style={{ width: step === 'reading' ? '50%' : quizResults?.finished ? '100%' : '75%' }}
          ></div>
        </div>

        <div className="p-8 md:p-12">
          {step === 'reading' ? (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {domain}
                </span>
                <span className="flex items-center text-amber-500 text-xs font-bold">
                  <Sparkles size={14} className="mr-1" /> AI Generated
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{lesson?.title}</h1>
              <div className="prose prose-indigo max-w-none prose-lg text-gray-700 mb-12">
                <ReactMarkdown>{lesson?.content || ''}</ReactMarkdown>
              </div>
              
              <div className="flex justify-end border-t pt-8">
                <button 
                  onClick={() => setStep('quiz')}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 hover:shadow-lg transition-all"
                >
                  <span>Ready for Quiz?</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ) : !quizResults?.finished ? (
            <div className="animate-in slide-in-from-right-4 duration-500">
              <h2 className="text-3xl font-bold mb-8">Quick Knowledge Check</h2>
              <div className="space-y-10">
                {lesson?.quiz?.map((q, idx) => (
                  <div key={q.id} className="space-y-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-1 gap-3">
                      {q.options.map((option, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                          className={`p-4 rounded-2xl text-left transition-all border-2 ${
                            quizAnswers[q.id] === optIdx 
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <span className="inline-block w-8 h-8 rounded-full bg-white border border-gray-200 text-center leading-8 mr-3 font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex justify-between items-center border-t pt-8">
                <button 
                  onClick={() => setStep('reading')}
                  className="text-gray-500 font-semibold hover:text-gray-800"
                >
                  Review Lesson Content
                </button>
                <button 
                  disabled={Object.keys(quizAnswers).length < (lesson?.quiz?.length || 0)}
                  onClick={handleQuizSubmit}
                  className="bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Lesson Complete!</h2>
              <p className="text-gray-500 text-lg mb-8">
                You scored <span className="text-indigo-600 font-bold">{quizResults.score}/{lesson?.quiz?.length}</span> and earned some XP!
              </p>
              
              <div className="bg-gray-50 rounded-3xl p-8 mb-10 max-w-lg mx-auto text-left">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle size={18} className="mr-2 text-indigo-500" /> Review Feedack
                </h3>
                <div className="space-y-6">
                  {lesson?.quiz?.map((q, idx) => (
                    <div key={q.id} className="text-sm">
                      <p className="font-semibold text-gray-700 mb-1">{idx+1}. {q.text}</p>
                      <p className={`mb-1 ${quizAnswers[q.id] === q.correctIndex ? 'text-emerald-600' : 'text-rose-500'}`}>
                        Your answer: {q.options[quizAnswers[q.id]]}
                      </p>
                      <p className="text-gray-500 italic">"{q.explanation}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onBack}
                className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningView;
