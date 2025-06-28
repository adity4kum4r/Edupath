import React, { useState } from 'react';
import { Play, BookmarkPlus, Clock, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    color: 'from-blue-500 to-cyan-500',
    icon: '📐',
    chapters: 12,
    completed: 8,
    description: 'Master algebra, geometry, and calculus'
  },
  {
    id: 'science',
    name: 'Science',
    color: 'from-green-500 to-emerald-500',
    icon: '🔬',
    chapters: 15,
    completed: 6,
    description: 'Explore physics, chemistry, and biology'
  },
  {
    id: 'english',
    name: 'English',
    color: 'from-purple-500 to-pink-500',
    icon: '📚',
    chapters: 10,
    completed: 5,
    description: 'Improve reading, writing, and grammar'
  },
  {
    id: 'history',
    name: 'History',
    color: 'from-orange-500 to-red-500',
    icon: '🏛️',
    chapters: 8,
    completed: 3,
    description: 'Journey through world civilizations'
  },
];

const sampleChapters = [
  {
    id: 1,
    title: 'Introduction to Algebra',
    duration: 45,
    isCompleted: true,
    difficulty: 'Easy',
    rating: 4.8
  },
  {
    id: 2,
    title: 'Linear Equations',
    duration: 52,
    isCompleted: true,
    difficulty: 'Medium',
    rating: 4.6
  },
  {
    id: 3,
    title: 'Quadratic Functions',
    duration: 38,
    isCompleted: false,
    difficulty: 'Medium',
    rating: 4.9
  },
  {
    id: 4,
    title: 'Polynomial Operations',
    duration: 41,
    isCompleted: false,
    difficulty: 'Hard',
    rating: 4.7
  },
];

export default function VideoLessons() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = sampleChapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Lessons</h1>
            <p className="text-gray-600">Master concepts with engaging video content</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSubject(subject)}
              className={`cursor-pointer rounded-xl p-4 transition-all ${
                selectedSubject.id === subject.id
                  ? 'ring-2 ring-primary-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className={`bg-gradient-to-r ${subject.color} rounded-lg p-4 mb-3`}>
                <div className="text-3xl mb-2">{subject.icon}</div>
                <h3 className="text-white font-semibold text-lg">{subject.name}</h3>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{subject.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{subject.chapters} chapters</span>
                  <span className="text-green-600 font-medium">
                    {subject.completed}/{subject.chapters} done
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(subject.completed / subject.chapters) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chapter List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {selectedSubject.name} Chapters
          </h2>
          <div className="grid gap-4">
            {filteredChapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      chapter.isCompleted 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-primary-100 text-primary-600'
                    }`}>
                      {chapter.isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{chapter.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{chapter.duration} min</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          chapter.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          chapter.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {chapter.difficulty}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{chapter.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-primary-600 transition-colors">
                      <BookmarkPlus className="h-5 w-5" />
                    </button>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      chapter.isCompleted
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}>
                      {chapter.isCompleted ? 'Review' : 'Start'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}