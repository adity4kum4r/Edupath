import React, { useState } from 'react';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import VideoLessons from '../Features/VideoLessons';
import Quizzes from '../Features/Quizzes';
import Doubts from '../Features/Doubts';
import CameraScanner from '../Features/CameraScanner';
import Progress from '../Features/Progress';
import TeacherUpload from '../Features/TeacherUpload';
import StudentManagement from '../Features/StudentManagement';
import Analytics from '../Features/Analytics';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('lessons');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'lessons':
        return <VideoLessons />;
      case 'quizzes':
        return <Quizzes />;
      case 'doubts':
        return <Doubts />;
      case 'camera':
        return <CameraScanner />;
      case 'progress':
        return <Progress />;
      case 'upload':
        return <TeacherUpload />;
      case 'students':
        return <StudentManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <VideoLessons />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}