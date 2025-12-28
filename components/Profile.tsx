
import React from 'react';
import { UserProgress } from '../types';
import { AVAILABLE_DOMAINS } from '../constants';
import { User, Settings, Shield, Bell, Target, TrendingUp, Award } from 'lucide-react';

interface ProfileProps {
  progress: UserProgress;
}

const Profile: React.FC<ProfileProps> = ({ progress }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[2.5rem] shadow-xl"></div>
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="w-32 h-32 rounded-[2rem] bg-white p-2 shadow-2xl">
            <div className="w-full h-full rounded-2xl bg-indigo-50 overflow-hidden">
               <img src={`https://picsum.photos/seed/${progress.level}/200/200`} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-black text-white drop-shadow-md">Mechdyane Learner</h2>
            <p className="text-indigo-100 font-medium">Joined June 2024 • Beginner Track</p>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl text-center">
          <Award className="mx-auto text-indigo-500 mb-2" size={32} />
          <p className="text-2xl font-black text-gray-900">{progress.level}</p>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Global Level</p>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center">
          <TrendingUp className="mx-auto text-emerald-500 mb-2" size={32} />
          <p className="text-2xl font-black text-gray-900">{progress.points.toLocaleString()}</p>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total XP Earned</p>
        </div>
        <div className="glass-card p-6 rounded-3xl text-center">
          <Target className="mx-auto text-orange-500 mb-2" size={32} />
          <p className="text-2xl font-black text-gray-900">{progress.streak} Days</p>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Current Streak</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Shield className="mr-2 text-indigo-500" size={20} /> Learning Preferences
          </h3>
          <div className="glass-card p-8 rounded-[2rem] space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-700">Interests</p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_DOMAINS.map(d => (
                  <button key={d.name} className="px-4 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-xl text-sm font-bold border border-gray-100 transition-all">
                    {d.icon} {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t">
              <p className="text-sm font-bold text-gray-700">Daily Goal</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Target: 500 XP / Day</span>
                <span className="text-indigo-600 font-bold text-sm underline cursor-pointer">Edit</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[60%]"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Bell className="mr-2 text-indigo-500" size={20} /> Notifications & Privacy
          </h3>
          <div className="glass-card p-8 rounded-[2rem] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-400">Weekly progress summaries</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-bold text-gray-900">Public Profile</p>
                <p className="text-xs text-gray-400">Show on global leaderboard</p>
              </div>
              <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="pt-6">
               <button className="w-full py-4 rounded-2xl border-2 border-rose-100 text-rose-500 font-bold hover:bg-rose-50 transition-colors">
                 Logout from Account
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
