import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Book, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE = 'https://ajphchgh0i.execute-api.us-west-2.amazonaws.com/dev/api';

interface Chapter {
  chapter: number;
  id: string;
}

interface Book {
  id: string;
  name: string;
  order: number;
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}

interface Verse {
  id: string;
  cleanText: string;
  text: string;
  verseNumber: number;
}

export default function BibleReader() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showBookSelector, setShowBookSelector] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        if (data.length > 0) {
          setSelectedBook(data[0]);
        }
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron cargar los libros.');
      })
      .finally(() => setLoadingBooks(false));
  }, []);

  useEffect(() => {
    if (selectedBook) {
      setLoadingVerses(true);
      fetch(`${API_BASE}/books/${selectedBook.id}/verses/chapter/${selectedChapterNum}`)
        .then(res => res.json())
        .then(data => {
          setVerses(data);
        })
        .catch(err => {
          console.error(err);
          setError('No se pudieron cargar los versículos.');
        })
        .finally(() => setLoadingVerses(false));
    }
  }, [selectedBook, selectedChapterNum]);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setSelectedChapterNum(1);
    setShowBookSelector(false);
  };

  const handlePrevChapter = () => {
    if (selectedChapterNum > 1) {
      setSelectedChapterNum(prev => prev - 1);
    } else if (selectedBook) {
      const prevBookIndex = books.findIndex(b => b.id === selectedBook.id) - 1;
      if (prevBookIndex >= 0) {
        const prevBook = books[prevBookIndex];
        setSelectedBook(prevBook);
        setSelectedChapterNum(prevBook.chapters.length);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedBook) {
      if (selectedChapterNum < selectedBook.chapters.length) {
        setSelectedChapterNum(prev => prev + 1);
      } else {
        const nextBookIndex = books.findIndex(b => b.id === selectedBook.id) + 1;
        if (nextBookIndex < books.length) {
          const nextBook = books[nextBookIndex];
          setSelectedBook(nextBook);
          setSelectedChapterNum(1);
        }
      }
    }
  };

  if (loadingBooks) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
        <p className="text-stone-500 font-medium">Cargando textos bíblicos...</p>
      </div>
    );
  }

  const oldTestament = books.filter(b => b.testament === 'OT');
  const newTestament = books.filter(b => b.testament === 'NT');

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Reader Header */}
      <div className="sticky top-0 sm:top-4 z-30 flex items-center justify-between bg-stone-50/90 sm:bg-white/90 backdrop-blur-md sm:border border-stone-200 sm:rounded-2xl p-2 sm:p-3 mb-8 shadow-sm">
        <button 
          onClick={() => setShowBookSelector(!showBookSelector)}
          className="flex items-center space-x-2 px-4 py-2 hover:bg-stone-100 rounded-xl transition-colors"
        >
          <Book className="w-5 h-5 text-stone-600" />
          <span className="font-serif font-semibold text-stone-900 sm:text-lg">
            {selectedBook?.name} {selectedChapterNum}
          </span>
          <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${showBookSelector ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center space-x-1 pr-2">
          <button 
            onClick={handlePrevChapter}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextChapter}
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Selector Dropdown */}
      <AnimatePresence>
        {showBookSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-4 sm:left-auto right-4 sm:right-auto sm:w-[600px] bg-white border border-stone-200 rounded-2xl shadow-xl z-40 p-6 grid grid-cols-1 sm:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto"
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 border-b border-stone-100 pb-2">Antiguo Testamento</h3>
              <div className="grid grid-cols-2 gap-2">
                {oldTestament.map(book => (
                  <button
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className={`text-left text-sm py-1 px-2 rounded-md truncate transition-colors ${
                      selectedBook?.id === book.id ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 border-b border-stone-100 pb-2">Nuevo Testamento</h3>
              <div className="grid grid-cols-2 gap-2">
                {newTestament.map(book => (
                  <button
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className={`text-left text-sm py-1 px-2 rounded-md truncate transition-colors ${
                      selectedBook?.id === book.id ? 'bg-stone-900 text-white font-medium' : 'text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {book.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chapter Grid (if we wanted to show chapters, but currently just drops you at chapter 1 of selected book. Let's add a chapter selector inside the dropdown later if needed, but for now linear reading works, or we can add it below the book selector). */}

      {/* Reader Content */}
      <div className="px-4 sm:px-8 relative min-h-[50vh]">
        {loadingVerses && (
          <div className="absolute inset-0 bg-stone-50/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
          </div>
        )}
        
        {error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl">{error}</div>
        ) : (
          <motion.div 
            key={`${selectedBook?.id}-${selectedChapterNum}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bible-text space-y-1"
          >
            <h1 className="text-4xl font-serif font-medium text-stone-900 mb-8 mt-4 text-center">
              {selectedBook?.name} {selectedChapterNum}
            </h1>
            
            <div className="text-lg sm:text-xl text-stone-800 leading-loose font-serif">
              {verses.map(verse => (
                <span 
                  key={verse.id} 
                  className="inline"
                  dangerouslySetInnerHTML={{ __html: verse.text + ' ' }} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
