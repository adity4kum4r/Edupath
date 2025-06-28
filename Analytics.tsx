import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Calendar, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const chartData = {
  weekly: [
    { day: 'Mon', lessons: 25, quizzes: 15, students: 45 },
    { day: 'Tue', lessons: 32, quizzes: 22, students: 52 },
    { day: 'Wed', lessons: 28, quizzes: 18, students: 48 },
    { day: 'Thu', lessons: 35, quizzes: 25, students: 58 },
    { day: 'Fri', lessons: 42, quizzes: 30, students: 65 },
    { day: 'Sat', lessons: 38, quizzes: 28, students: 55 },
    { day: 'Sun', lessons: 22, quizzes: 12, students: 35 }
  ],
  subjects: [
    { name: 'Mathematics', students: 45, completion: 78, avgScore: 85 },
    { name: 'Science', students: 38, completion: 82, avgScore: 88 },
    { name: 'English', students: 42, completion: 75, avgScore: 82 },
    { name: 'History', students: 28, completion: 68, avgScore: 79 }
  ]
};

export default function Analytics() {
  const maxValue = Math.max(...chartData.weekly.map(d => Math.max(d.lessons, d.quizzes, d.students)));

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">153</div>
              <div className="text-blue-100">Total Students</div>
            </div>
            <Users className="h-10 w-10 text-blue-200" />
          </div>
          <div className="mt-4 flex items-center text-blue-100">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+12% this month</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">1,247</div>
              <div className="text-green-100">Lessons Completed</div>
            </div>
            <BookOpen className="h-10 w-10 text-green-200" />
          </div>
          <div className="mt-4 flex items-center text-green-100">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+8% this week</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">84%</div>
              <div className="text-purple-100">Average Score</div>
            </div>
            <Award className="h-10 w-10 text-purple-200" />
          </div>
          <div className="mt-4 flex items-center text-purple-100">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+3% improvement</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">92%</div>
              <div className="text-orange-100">Engagement Rate</div>
            </div>
            <Target className="h-10 w-10 text-orange-200" />
          </div>
          <div className="mt-4 flex items-center text-orange-100">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+5% this month</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
          
          <div className="space-y-4">
            {chartData.weekly.map((day, index) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{day.day}</span>
                  <span className="text-gray-500">{day.students} students</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-600">Lessons</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.lessons / maxValue) * 100}%` }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8">{day.lessons}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-600">Quizzes</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.quizzes / maxValue) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8">{day.quizzes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Performance</h2>
          
          <div className="space-y-6">
            {chartData.subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                  <span className="text-sm text-gray-600">{subject.students} students</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">{subject.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.completion}%` }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                      className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">{subject.avgScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.avgScore}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
          {[
            { time: '2 hours ago', activity: 'Alice Johnson completed "Quadratic Functions" lesson', type: 'lesson' },
            { time: '3 hours ago', activity: 'Bob Smith scored 95% on Algebra Quiz', type: 'quiz' },
            { time: '5 hours ago', activity: 'Carol Davis asked a question about photosynthesis', type: 'question' },
            { time: '1 day ago', activity: 'David Wilson uploaded new Math video lesson', type: 'upload' },
            { time: '1 day ago', activity: 'Emily Brown earned "Week Streak" badge', type: 'badge' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'lesson' ? 'bg-blue-100 text-blue-600' :
                activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                activity.type === 'question' ? 'bg-purple-100 text-purple-600' :
                activity.type === 'upload' ? 'bg-orange-100 text-orange-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {activity.type === 'lesson' ? <BookOpen className="h-5 w-5" /> :
                 activity.type === 'quiz' ? <Target className="h-5 w-5" /> :
                 activity.type === 'question' ? <Users className="h-5 w-5" /> :
                 activity.type === 'upload' ? <TrendingUp className="h-5 w-5" /> :
                 <Award className="h-5 w-5" />}
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.activity}</div>
                <div className="text-sm text-gray-600 flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}