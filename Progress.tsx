import React from 'react';
import { Trophy, Star, Calendar, TrendingUp, Award, Target, Clock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  { id: 1, name: 'First Quiz', icon: '🎯', color: 'from-blue-400 to-blue-600', earned: true },
  { id: 2, name: 'Week Streak', icon: '🔥', color: 'from-orange-400 to-red-600', earned: true },
  { id: 3, name: 'Math Master', icon: '🧮', color: 'from-purple-400 to-purple-600', earned: true },
  { id: 4, name: 'Perfect Score', icon: '⭐', color: 'from-yellow-400 to-yellow-600', earned: false },
  { id: 5, name: 'Helper', icon: '🤝', color: 'from-green-400 to-green-600', earned: false },
  { id: 6, name: 'Speedster', icon: '⚡', color: 'from-indigo-400 to-indigo-600', earned: false },
];

const subjectProgress = [
  { subject: 'Mathematics', completed: 8, total: 12, score: 85 },
  { subject: 'Science', completed: 6, total: 15, score: 92 },
  { subject: 'English', completed: 5, total: 10, score: 78 },
  { subject: 'History', completed: 3, total: 8, score: 88 },
];

const recentActivity = [
  { date: '2024-01-15', activity: 'Completed "Quadratic Functions" lesson', points: 25 },
  { date: '2024-01-14', activity: 'Scored 95% on Algebra Quiz', points: 50 },
  { date: '2024-01-13', activity: 'Helped answer a student question', points: 15 },
  { date: '2024-01-12', activity: 'Watched "Photosynthesis" video', points: 20 },
];

export default function Progress() {
  const totalPoints = 2450;
  const currentStreak = 12;
  const nextBadge = badges.find(badge => !badge.earned);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{totalPoints}</div>
              <div className="text-primary-100">Total Points</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-orange-100">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">22</div>
              <div className="text-green-100">Lessons Done</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-purple-100">Badges Earned</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Progress</h2>
          
          <div className="space-y-6">
            {subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                  <span className="text-sm text-gray-600">
                    {subject.completed}/{subject.total} chapters
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(subject.completed / subject.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {Math.round((subject.completed / subject.total) * 100)}% complete
                  </span>
                  <span className="font-medium text-green-600">
                    Avg Score: {subject.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievement Badges</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative p-4 rounded-xl text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-r ' + badge.color + ' text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-sm font-medium">{badge.name}</div>
                {badge.earned && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="h-3 w-3 text-yellow-800 fill-current" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {nextBadge && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Next Badge</h3>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{nextBadge.icon}</div>
                <div>
                  <div className="font-medium text-gray-900">{nextBadge.name}</div>
                  <div className="text-sm text-gray-600">Complete 3 more quizzes to unlock</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                {activity.activity.includes('lesson') ? (
                  <BookOpen className="h-5 w-5 text-primary-600" />
                ) : activity.activity.includes('Quiz') ? (
                  <Target className="h-5 w-5 text-primary-600" />
                ) : activity.activity.includes('question') ? (
                  <Award className="h-5 w-5 text-primary-600" />
                ) : (
                  <Clock className="h-5 w-5 text-primary-600" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.activity}</div>
                <div className="text-sm text-gray-600">{activity.date}</div>
              </div>
              
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">+{activity.points}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}