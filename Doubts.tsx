import React, { useState } from 'react';
import { MessageCircle, Plus, Search, Clock, CheckCircle, ThumbsUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const sampleDoubts = [
  {
    id: 1,
    title: "How to solve quadratic equations?",
    subject: "Mathematics",
    author: "Sarah Johnson",
    timeAgo: "2 hours ago",
    isResolved: false,
    replies: 3,
    likes: 5,
    preview: "I'm having trouble understanding the quadratic formula and when to use it..."
  },
  {
    id: 2,
    title: "Difference between mitosis and meiosis",
    subject: "Science",
    author: "Mike Chen",
    timeAgo: "5 hours ago",
    isResolved: true,
    replies: 7,
    likes: 12,
    preview: "Can someone explain the key differences between these two processes?"
  },
  {
    id: 3,
    title: "Shakespeare's writing style",
    subject: "English",
    author: "Emily Davis",
    timeAgo: "1 day ago",
    isResolved: false,
    replies: 2,
    likes: 8,
    preview: "What makes Shakespeare's writing unique compared to other authors?"
  },
];

export default function Doubts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showNewDoubtForm, setShowNewDoubtForm] = useState(false);
  const [newDoubt, setNewDoubt] = useState({
    title: '',
    subject: '',
    description: ''
  });

  const subjects = ['All', 'Mathematics', 'Science', 'English', 'History'];

  const filteredDoubts = sampleDoubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doubt.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || doubt.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleSubmitDoubt = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('New doubt:', newDoubt);
    setShowNewDoubtForm(false);
    setNewDoubt({ title: '', subject: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Doubts</h1>
            <p className="text-gray-600">Ask questions and help fellow students</p>
          </div>
          <button
            onClick={() => setShowNewDoubtForm(true)}
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Ask Question</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-8 w-8 text-primary-600" />
              <div>
                <div className="text-2xl font-bold text-primary-900">24</div>
                <div className="text-sm text-primary-700">Active Questions</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">189</div>
                <div className="text-sm text-green-700">Resolved</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">456</div>
                <div className="text-sm text-purple-700">Contributors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Doubts List */}
        <div className="space-y-4">
          {filteredDoubts.map((doubt, index) => (
            <motion.div
              key={doubt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                      {doubt.title}
                    </h3>
                    {doubt.isResolved && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{doubt.preview}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-medium">{doubt.author}</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {doubt.subject}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{doubt.timeAgo}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{doubt.replies}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{doubt.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New Doubt Modal */}
      {showNewDoubtForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h2>
            
            <form onSubmit={handleSubmitDoubt} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  value={newDoubt.title}
                  onChange={(e) => setNewDoubt({...newDoubt, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter a clear, descriptive title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  value={newDoubt.subject}
                  onChange={(e) => setNewDoubt({...newDoubt, subject: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.slice(1).map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newDoubt.description}
                  onChange={(e) => setNewDoubt({...newDoubt, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Provide details about your question..."
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewDoubtForm(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Submit Question
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}