import { Home, PenTool, MessageSquare, BookOpen, BookA, Library } from 'lucide-react';
import { NavItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Inicio', icon: Home },
  { id: 'bible', label: 'Biblia', icon: BookOpen },
  { id: 'tools', label: 'Herramientas', icon: PenTool },
  { id: 'commentaries', label: 'Comentarios', icon: MessageSquare },
  { id: 'dictionaries', label: 'Diccionarios', icon: BookA },
  { id: 'library', label: 'Biblioteca', icon: Library },
];
