
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { UserProgress, Badge } from '../types';
import { Trophy, Flame, Target, Star, PlayCircle, BookOpen, Compass } from 'lucide-react';

const data = [
  { name: 'Mon', xp: 400 },
  { name: 'Tue', xp: 300 },
  { name: 'Wed', xp: 600 },
  { name: 'Thu', xp: 800 },
  { name: 'Fri', xp: 500 },
  { name: 'Sat', xp: 900 },
  { name: 'Sun', xp: 1200 },
];

interface DashboardProps {
  progress: UserProgress;
  onExplore: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onExplore }) => {
  const isCourseActive = !!progress.currentCourseId && !!progress.currentCourseTitle;
  const completedCount = progress.completedLessons.length;
  const totalCount = progress.totalLessonsInCourse || 10;
  const progressPercent = Math.min(Math.round((completedCount / totalCount) * 100), 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Current Course Progress Card */}
      <div className="glass-card rounded-[2.5rem] p-8 shadow-sm border border-indigo-50 overflow-hidden relative">
        {isCourseActive ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-100">
              <BookOpen size={32} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Active Course</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-xs font-semibold text-gray-400">{completedCount} of {totalCount} lessons finished</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{progress.currentCourseTitle}</h2>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mt-4">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-2xl font-black text-indigo-600">{progressPercent}%</p>
                <p className="text-xs font-bold text-gray-400 uppercase">Progress</p>
              </div>
              <button 
                onClick={onExplore}
                className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <PlayCircle size={20} />
                <span>Resume</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shrink-0">
                <Compass size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Ready to start your journey?</h2>
                <p className="text-gray-500">Pick a course from our explore page and start leveling up today!</p>
              </div>
            </div>
            <button 
              onClick={onExplore}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center space-x-2 hover:bg-indigo-700 hover:shadow-xl transition-all"
            >
              <Compass size={20} />
              <span>Explore Courses</span>
            </button>
          </div>
        )}
        
        {/* Subtle background decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
              <Flame size={24} />
            </div>
            <span className="text-sm font-medium text-gray-400">Streak</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{progress.streak} Days</div>
          <div className="text-xs text-orange-500 mt-1 font-medium">Keep it up! 🔥</div>
        </div>

        <div className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Trophy size={24} />
            </div>
            <span className="text-sm font-medium text-gray-400">Level</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">Lv. {progress.level}</div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full rounded-full" 
              style={{ width: `${(progress.points % 1000) / 10}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Star size={24} />
            </div>
            <span className="text-sm font-medium text-gray-400">Total XP</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{progress.points.toLocaleString()}</div>
          <div className="text-xs text-emerald-500 mt-1 font-medium">+120 today</div>
        </div>

        <div className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Target size={24} />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Done</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{progress.completedLessons.length}</div>
          <div className="text-xs text-purple-500 mt-1 font-medium">Lessons finished</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Learning Activity</h3>
              <p className="text-gray-500 text-sm">XP earned over the last week</p>
            </div>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-xl px-4 py-2">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  cursor={{stroke: '#6366f1', strokeWidth: 2}}
                />
                <Area 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorXp)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Badges/Achievements mini section */}
        <div className="glass-card p-8 rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Top Badges</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {progress.badges.slice(0, 4).map((badge) => (
              <div key={badge.id} className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:bg-indigo-50 transition-all duration-300">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</span>
                <span className="text-xs font-bold text-gray-700">{badge.name}</span>
              </div>
            ))}
            {progress.badges.length < 4 && (
              <div onClick={onExplore} className="border-2 border-dashed border-gray-200 p-4 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-300 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-1 text-gray-400">
                  <Star size={16} />
                </div>
                <span className="text-[10px] font-bold text-gray-400">Unlock More</span>
              </div>
            )}
          </div>
          <div className="mt-8">
            <div className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-indigo-100 text-sm mb-1">Current Challenge</p>
                <h4 className="font-bold text-lg mb-4">Complete 3 lessons in Marketing</h4>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                  Go to Domain
                </button>
              </div>
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
