
import React, { useState, useEffect } from 'react';
import { UserProgress, Badge, Domain } from './types';
import { INITIAL_BADGES, AVAILABLE_DOMAINS, MOCK_RECOMMENDATIONS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LearningView from './components/LearningView';
// Fix: Added Flame to the imported icons from lucide-react
import { Sparkles, BrainCircuit, Bell, Search, Trophy, Flame } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 1,
    points: 450,
    badges: INITIAL_BADGES.slice(0, 2),
    completedLessons: ["What is Marketing?", "Digital Platforms"],
    streak: 5,
    currentCourseId: "course_1",
    currentCourseTitle: "Fundamentals of Digital Marketing",
    totalLessonsInCourse: 12
  });

  const [learningContext, setLearningContext] = useState<{ topic: string, domain: string } | null>(null);

  const startLesson = (topic: string, domain: string) => {
    setLearningContext({ topic, domain });
    setActiveTab('learning');
  };

  const completeLesson = (xpGained: number) => {
    setUserProgress(prev => {
      const newPoints = prev.points + xpGained;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        completedLessons: learningContext ? [...prev.completedLessons, learningContext.topic] : prev.completedLessons
      };
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  Welcome back, <span className="gradient-text">Future Expert!</span> 🚀
                </h1>
                <p className="text-gray-500 font-medium">You're making incredible progress. Ready to learn something new?</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <span className="font-bold text-gray-700">#45 Global</span>
                </div>
              </div>
            </header>

            <Dashboard 
              progress={userProgress} 
              onExplore={() => setActiveTab('explore')}
            />

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <BrainCircuit className="mr-2 text-indigo-500" /> AI Recommendations
                </h2>
                <button className="text-indigo-600 text-sm font-semibold flex items-center hover:underline">
                  <Sparkles size={16} className="mr-1" /> Refresh paths
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_RECOMMENDATIONS.map((topic, i) => {
                  const domainData = AVAILABLE_DOMAINS[i % AVAILABLE_DOMAINS.length];
                  return (
                    <div 
                      key={topic}
                      onClick={() => startLesson(topic, domainData.name)}
                      className="glass-card group p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-indigo-100"
                    >
                      <div className={`w-12 h-12 rounded-2xl ${domainData.color} bg-opacity-10 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform`}>
                        {domainData.icon}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${domainData.color.replace('bg-', 'text-')} mb-2 block`}>
                        {domainData.name}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-4">{topic}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-400">Est. 15 mins</span>
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
      case 'learning':
        return learningContext ? (
          <LearningView 
            {...learningContext}
            level={userProgress.level}
            onComplete={completeLesson}
            onBack={() => setActiveTab('dashboard')}
          />
        ) : (
          <div className="text-center py-20">Select a topic to start learning!</div>
        );
      case 'explore':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h2 className="text-3xl font-bold mb-8">Explore Learning Domains</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {AVAILABLE_DOMAINS.map(domain => (
                 <div 
                  key={domain.name}
                  className="relative group h-64 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                  onClick={() => startLesson("Introduction to " + domain.name, domain.name)}
                 >
                   <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                   <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                     <div className="text-4xl mb-4 group-hover:animate-float">{domain.icon}</div>
                     <h3 className="text-2xl font-bold mb-2">{domain.name}</h3>
                     <p className="text-white/80 text-sm">Level up your beginner skills in {domain.name.toLowerCase()} with AI-crafted lessons.</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <BrainCircuit size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-medium">This module is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">
            M
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">MECHDYANE</span>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search topics, skills..." 
              className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2">
            <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
              <Flame size={14} className="mr-1" /> {userProgress.streak} DAY STREAK
            </div>
          </div>
          <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <Bell size={24} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 border border-indigo-200 overflow-hidden cursor-pointer">
            <img src={`https://picsum.photos/seed/${userProgress.level}/100/100`} alt="Avatar" />
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex pt-20">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64 p-8 min-h-screen max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;

// Helper component for layout transitions
const ArrowRight = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);
