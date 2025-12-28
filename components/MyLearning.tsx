
import React from 'react';
import { UserProgress } from '../types';
import { AVAILABLE_DOMAINS } from '../constants';
import { BookOpen, CheckCircle, Clock, PlayCircle } from 'lucide-react';

interface MyLearningProps {
  progress: UserProgress;
  onContinue: (topic: string, domain: string) => void;
}

const MyLearning: React.FC<MyLearningProps> = ({ progress, onContinue }) => {
  const activeDomain = AVAILABLE_DOMAINS.find(d => d.name === "Marketing"); // Mocked active domain

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">My Learning Path</h2>
        <p className="text-gray-500">Pick up exactly where you left off.</p>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Clock className="mr-2 text-indigo-500" size={20} /> Currently Learning
        </h3>
        
        {progress.currentCourseTitle ? (
          <div className="glass-card p-8 rounded-[2.5rem] border border-indigo-50 flex flex-col md:flex-row items-center gap-8 group">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-indigo-100 group-hover:scale-105 transition-transform">
              <BookOpen size={40} />
            </div>
            <div className="flex-1 space-y-3">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                {activeDomain?.name || 'In Progress'}
              </span>
              <h4 className="text-2xl font-bold text-gray-900">{progress.currentCourseTitle}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center"><CheckCircle size={14} className="mr-1 text-emerald-500" /> {progress.completedLessons.length} Lessons Done</span>
                <span>•</span>
                <span>{progress.totalLessonsInCourse || 10} Total Lessons</span>
              </div>
            </div>
            <button 
              onClick={() => onContinue("Market Research Basics", "Marketing")}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              <PlayCircle size={20} />
              <span>Continue Course</span>
            </button>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No active courses. Start one from the Explore tab!</p>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <CheckCircle className="mr-2 text-emerald-500" size={20} /> Completed Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progress.completedLessons.map((lesson, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-emerald-200 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{lesson}</p>
                  <p className="text-xs text-gray-400 uppercase font-black tracking-widest">Mastered</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+100 XP</span>
            </div>
          ))}
          {progress.completedLessons.length === 0 && (
             <div className="col-span-full py-10 text-center text-gray-400">
               Finish your first lesson to see it here!
             </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyLearning;
