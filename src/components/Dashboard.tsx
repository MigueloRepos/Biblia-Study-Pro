import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Bookmark } from 'lucide-react';
import { SectionId } from '../types';

interface DashboardProps {
  onNavigate: (section: SectionId) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-stone-800">
          Explora la palabra con <br className="hidden sm:block" />
          <span className="italic text-stone-950 font-bold">profundidad y claridad.</span>
        </h2>
        <p className="text-stone-600 text-lg max-w-2xl leading-relaxed">
          Un espacio diseñado para minimizar las distracciones y maximizar tu enfoque en el texto sagrado.
        </p>
      </motion.section>

      {/* Verse of the Day (Clean, typographic focus) */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BookOpen className="w-32 h-32" />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 border border-stone-200 bg-stone-50 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-stone-500">
            <span>Versículo del día</span>
          </div>
          <blockquote className="space-y-4">
            <p className="text-2xl sm:text-3xl font-serif text-stone-900 leading-snug">
              "Lámpara es a mis pies tu palabra, <br className="hidden sm:block" />
              Y lumbrera a mi camino."
            </p>
            <footer className="text-stone-500 font-medium">
              — Salmos 119:105
            </footer>
          </blockquote>
          <div className="pt-4">
            <button 
              onClick={() => onNavigate('bible')}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors group-hover:underline decoration-stone-300 underline-offset-4"
            >
              <span>Leer Biblia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Quick Access Grid */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Recent Studies */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-medium text-stone-900">Estudios Recientes</h3>
            <button className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">Ver todos</button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Epístola a los Romanos', subtitle: 'Capítulo 8 • Contexto histórico', icon: Clock },
              { title: 'Sermón del Monte', subtitle: 'Mateo 5-7 • Análisis exegético', icon: Bookmark },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-300 transition-colors cursor-pointer group">
                <div className="p-2 bg-stone-50 rounded-lg text-stone-400 group-hover:text-stone-900 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">{item.title}</h4>
                  <p className="text-sm text-stone-500 mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Tools */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-medium text-stone-900">Explorar</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'commentaries', label: 'Comentarios Bíblicos', desc: 'Análisis detallados' },
              { id: 'dictionaries', label: 'Diccionarios', desc: 'Términos y raíces' },
              { id: 'tools', label: 'Herramientas', desc: 'Interlineal y mapas' },
              { id: 'library', label: 'Biblioteca', desc: 'Tus libros guardados' },
            ].map((module) => (
              <button 
                key={module.id}
                onClick={() => onNavigate(module.id as SectionId)}
                className="text-left p-4 rounded-xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-sm transition-all group"
              >
                <h4 className="font-medium text-stone-900 group-hover:text-stone-950">{module.label}</h4>
                <p className="text-xs text-stone-500 mt-1">{module.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
