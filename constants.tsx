
import React from 'react';
import { Domain, Badge } from './types';

export const INITIAL_BADGES: Badge[] = [
  { id: '1', name: 'First Step', description: 'Complete your first lesson', icon: '🌱' },
  { id: '2', name: 'Quick Learner', description: 'Complete a quiz with 100% accuracy', icon: '⚡' },
  { id: '3', name: 'Curiosity Explorer', description: 'Try courses in 3 different domains', icon: '🔍' },
];

export const AVAILABLE_DOMAINS = [
  { name: Domain.COMPUTER_STUDIES, icon: '💻', color: 'bg-blue-500', gradient: 'from-blue-400 to-blue-600' },
  { name: Domain.MARKETING, icon: '📈', color: 'bg-orange-500', gradient: 'from-orange-400 to-orange-600' },
  { name: Domain.HEALTHCARE, icon: '🏥', color: 'bg-emerald-500', gradient: 'from-emerald-400 to-emerald-600' },
  { name: Domain.FINANCE, icon: '💰', color: 'bg-purple-500', gradient: 'from-purple-400 to-purple-600' },
  { name: Domain.DESIGN, icon: '🎨', color: 'bg-pink-500', gradient: 'from-pink-400 to-pink-600' },
];

export const MOCK_RECOMMENDATIONS = [
  "Introduction to Python Basics",
  "Social Media Marketing Strategies",
  "Anatomy Fundamentals",
  "Understanding Stock Markets",
  "UI/UX Design Principles"
];
