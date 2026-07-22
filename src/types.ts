export type SectionId = 'dashboard' | 'bible' | 'tools' | 'commentaries' | 'dictionaries' | 'library';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ElementType;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type?: string;
  author?: string;
}
