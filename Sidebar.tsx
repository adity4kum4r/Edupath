import React from 'react';
import { 
  BookOpen, 
  PenTool, 
  MessageCircle, 
  Camera, 
  Trophy, 
  Upload,
  Users,
  BarChart3,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isMobileMenuOpen, onClose }: SidebarProps) {
  const { currentUser } = useAuth();

  const studentMenuItems = [
    { id: 'lessons', icon: BookOpen, label: 'Video Lessons', color: 'text-primary-600' },
    { id: 'quizzes', icon: PenTool, label: 'Practice Tests', color: 'text-secondary-600' },
    { id: 'doubts', icon: MessageCircle, label: 'Ask Doubts', color: 'text-accent-600' },
    { id: 'camera', icon: Camera, label: 'Scan Questions', color: 'text-warning-600' },
    { id: 'progress', icon: Trophy, label: 'My Progress', color: 'text-success' },
  ];

  const teacherMenuItems = [
    { id: 'lessons', icon: BookOpen, label: 'Manage Lessons', color: 'text-primary-600' },
    { id: 'upload', icon: Upload, label: 'Upload Content', color: 'text-secondary-600' },
    { id: 'doubts', icon: MessageCircle, label: 'Answer Doubts', color: 'text-accent-600' },
    { id: 'students', icon: Users, label: 'Students', color: 'text-warning-600' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-success' },
  ];

  const menuItems = currentUser?.role === 'teacher' ? teacherMenuItems : studentMenuItems;

  const handleItemClick = (itemId: string) => {
    setActiveTab(itemId);
    onClose(); // Close mobile menu after selection
  };

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 bg-primary-600 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="h-5 w-5" />
            <span className="font-semibold">Keep Learning!</span>
          </div>
          <p className="text-sm opacity-90">
            {currentUser?.role === 'student' 
              ? "Complete today's lessons to earn new badges!"
              : "Help students achieve their learning goals!"
            }
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-full border-r border-gray-200">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 shadow-xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}