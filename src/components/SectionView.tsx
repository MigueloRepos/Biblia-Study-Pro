import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { ContentItem } from '../types';

interface SectionViewProps {
  title: string;
  description: string;
  items: ContentItem[];
}

export default function SectionView({ title, description, items }: SectionViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3"
      >
        <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900">{title}</h2>
        <p className="text-stone-600 text-lg leading-relaxed">{description}</p>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900 focus:ring-1 focus:ring-stone-900 transition-all"
          />
        </div>
        <button className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filtros</span>
        </button>
      </motion.div>

      {/* Content List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              key={item.id}
              className="group p-5 sm:p-6 bg-white border border-stone-200 rounded-2xl hover:border-stone-400 hover:shadow-sm transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                    {item.title}
                  </h3>
                  {item.type && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-500">
                      {item.type}
                    </span>
                  )}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                {item.author && (
                  <p className="text-stone-400 text-xs font-medium pt-2">
                    Por {item.author}
                  </p>
                )}
              </div>
              <div className="shrink-0">
                <button className="w-full sm:w-auto px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
                  Abrir
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 px-4 border border-dashed border-stone-300 rounded-2xl">
            <p className="text-stone-500 font-medium">No se encontraron resultados para "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 text-stone-900 font-semibold text-sm hover:underline"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
