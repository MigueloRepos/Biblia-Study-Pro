import React from 'react';
import { SectionId } from '../types';
import { navItems } from '../data';
import { motion } from 'motion/react';

interface LayoutProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  children: React.ReactNode;
}

export default function Layout({ activeSection, onNavigate, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-stone-50 selection:bg-stone-200">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-stone-200 bg-stone-50/50 backdrop-blur-md sticky top-0 h-screen p-6 shrink-0 z-10">
        <div className="mb-12">
          <h1 className="text-2xl font-bold italic tracking-tight">Biblia Study Pro</h1>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-900 text-stone-50 shadow-sm'
                    : 'text-stone-600 hover:bg-stone-200/50 hover:text-stone-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'opacity-100' : 'opacity-70'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="pt-6 border-t border-stone-200">
          <div className="flex items-center space-x-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 font-serif italic text-sm">
              M
            </div>
            <div className="text-sm font-medium text-stone-700">Mi Perfil</div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 md:pb-0 relative min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md sticky top-0 z-20">
          <h1 className="text-xl font-bold italic tracking-tight">Biblia Study Pro</h1>
          <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 font-serif italic text-sm">
            M
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-stone-200 bg-stone-50/90 backdrop-blur-lg pb-safe z-30">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
                  isActive ? 'text-stone-900' : 'text-stone-500'
                }`}
              >
                <motion.div
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
