
import React from 'react';
import { UserProgress } from '../types';
import { INITIAL_BADGES } from '../constants';
import { Trophy, Medal, Star, Target, Users } from 'lucide-react';

interface AchievementsProps {
  progress: UserProgress;
}

const Achievements: React.FC<AchievementsProps> = ({ progress }) => {
  const leaderboard = [
    { name: 'Alex Rivera', points: 15400, level: 16, avatar: '1' },
    { name: 'Sarah Chen', points: 12850, level: 13, avatar: '2' },
    { name: 'User (You)', points: progress.points, level: progress.level, avatar: 'you', me: true },
    { name: 'Marcus Todd', points: 9200, level: 10, avatar: '3' },
    { name: 'Elena Gomez', points: 8100, level: 9, avatar: '4' },
  ].sort((a, b) => b.points - a.points);

  const allPossibleBadges = [
    ...INITIAL_BADGES,
    { id: '4', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥' },
    { id: '5', name: 'Polymath', description: 'Complete lessons in 5 domains', icon: '🧠' },
    { id: '6', name: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', icon: '🏃' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-10">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center">
            <Trophy className="mr-3 text-yellow-500" size={32} /> Your Trophy Case
          </h2>
          <p className="text-gray-500">Showcase your dedication and skill mastery.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {allPossibleBadges.map(badge => {
            const isUnlocked = progress.badges.some(b => b.id === badge.id);
            return (
              <div 
                key={badge.id} 
                className={`glass-card p-6 rounded-[2rem] text-center flex flex-col items-center border transition-all duration-300 ${
                  isUnlocked ? 'border-indigo-100 shadow-lg' : 'opacity-40 grayscale border-transparent'
                }`}
              >
                <div className={`text-5xl mb-4 ${isUnlocked ? 'animate-float' : ''}`}>
                  {badge.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{badge.name}</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight">{badge.description}</p>
                {isUnlocked && (
                   <span className="mt-4 text-[10px] font-black text-emerald-600 uppercase">Unlocked</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Unlock Pro Rewards</h3>
            <p className="text-indigo-200 mb-6 max-w-md">Reach Level 10 and unlock exclusive learning paths, early access features, and unique avatars.</p>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="font-bold">Next Milestone: Level {progress.level + 1}</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Medal size={120} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <Users className="mr-2 text-indigo-500" size={20} /> Global Leaderboard
        </h3>
        <div className="glass-card rounded-[2rem] overflow-hidden border border-gray-100">
          {leaderboard.map((user, idx) => (
            <div 
              key={idx} 
              className={`flex items-center justify-between p-4 border-b border-gray-50 last:border-0 ${
                user.me ? 'bg-indigo-50/50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className={`w-6 text-sm font-black ${
                  idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-gray-300'
                }`}>
                  {idx + 1}
                </span>
                <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden">
                   <img src={`https://picsum.photos/seed/${user.avatar}/100/100`} alt="Avatar" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${user.me ? 'text-indigo-600' : 'text-gray-900'}`}>{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Lv. {user.level}</p>
                </div>
              </div>
              <span className="text-xs font-black text-gray-600">{user.points.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
        <button className="w-full py-4 text-indigo-600 font-bold text-sm hover:underline">
          View Detailed Ranking
        </button>
      </div>
    </div>
  );
};

export default Achievements;
