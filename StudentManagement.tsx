import React, { useState } from 'react';
import { Search, Filter, Users, TrendingUp, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const students = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@student.edu',
    grade: 10,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face',
    totalPoints: 2450,
    streak: 12,
    completedLessons: 45,
    averageScore: 85,
    subjects: ['Math', 'Science', 'English'],
    lastActive: '2 hours ago',
    status: 'active'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@student.edu',
    grade: 11,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop&crop=face',
    totalPoints: 1890,
    streak: 8,
    completedLessons: 32,
    averageScore: 78,
    subjects: ['Math', 'History'],
    lastActive: '1 day ago',
    status: 'active'
  },
  {
    id: 3,
    name: 'Carol Davis',
    email: 'carol@student.edu',
    grade: 9,
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop&crop=face',
    totalPoints: 3200,
    streak: 15,
    completedLessons: 67,
    averageScore: 92,
    subjects: ['Science', 'English', 'History'],
    lastActive: '30 minutes ago',
    status: 'active'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david@student.edu',
    grade: 12,
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=100&h=100&fit=crop&crop=face',
    totalPoints: 1560,
    streak: 3,
    completedLessons: 28,
    averageScore: 72,
    subjects: ['Math', 'Science'],
    lastActive: '3 days ago',
    status: 'inactive'
  },
];

export default function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sortBy, setSortBy] = useState('points');

  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGrade = selectedGrade === 'all' || student.grade.toString() === selectedGrade;
      return matchesSearch && matchesGrade;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.totalPoints - a.totalPoints;
        case 'score':
          return b.averageScore - a.averageScore;
        case 'lessons':
          return b.completedLessons - a.completedLessons;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const averageScore = Math.round(students.reduce((sum, s) => sum + s.averageScore, 0) / students.length);
  const totalLessons = students.reduce((sum, s) => sum + s.completedLessons, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <div className="text-blue-100">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{activeStudents}</div>
              <div className="text-green-100">Active Students</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <div className="text-purple-100">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8" />
            <div>
              <div className="text-2xl font-bold">{totalLessons}</div>
              <div className="text-orange-100">Lessons Completed</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Student Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
            <p className="text-gray-600">Monitor and track your students' progress</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Grades</option>
            {[9, 10, 11, 12].map(grade => (
              <option key={grade} value={grade.toString()}>Grade {grade}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="points">Sort by Points</option>
            <option value="score">Sort by Score</option>
            <option value="lessons">Sort by Lessons</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Grade</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Points</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Streak</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Lessons</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Score</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-600">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                      Grade {student.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {student.totalPoints.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-orange-500">🔥</span>
                      <span className="font-medium">{student.streak}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {student.completedLessons}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      student.averageScore >= 90 ? 'text-green-600' :
                      student.averageScore >= 80 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {student.averageScore}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {student.lastActive}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}