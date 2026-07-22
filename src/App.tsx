import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import SectionView from './components/SectionView';
import BibleReader from './components/BibleReader';
import { SectionId, ContentItem } from './types';

// Sample data for the different sections to showcase the UI design
const toolsData: ContentItem[] = [
  { id: 't1', title: 'Biblia Interlineal', description: 'Examina los textos originales en hebreo y griego con traducción literal palabra por palabra.', type: 'Análisis' },
  { id: 't2', title: 'Concordancia Exhaustiva', description: 'Busca referencias de palabras exactas en toda la escritura para un estudio temático profundo.', type: 'Búsqueda' },
  { id: 't3', title: 'Mapas Bíblicos Históricos', description: 'Contextualiza geográficamente los eventos bíblicos con mapas de alta resolución.', type: 'Visual' },
];

const commentariesData: ContentItem[] = [
  { id: 'c1', title: 'Comentario de Matthew Henry', description: 'Exposición exhaustiva y devocional de toda la Biblia.', author: 'Matthew Henry' },
  { id: 'c2', title: 'Comentario Exegético Práctico', description: 'Análisis versículo por versículo enfocado en la aplicación pastoral.', author: 'Jamieson, Fausset, Brown' },
];

const dictionariesData: ContentItem[] = [
  { id: 'd1', title: 'Diccionario Bíblico Vine', description: 'Significado de palabras del Nuevo y Antiguo Testamento con referencias a textos originales.', type: 'Lexicografía' },
  { id: 'd2', title: 'Diccionario de Geografía Bíblica', description: 'Información detallada sobre ciudades, regiones y topografía mencionada en las Escrituras.', type: 'Geografía' },
];

const libraryData: ContentItem[] = [
  { id: 'l1', title: 'Institución de la Religión Cristiana', description: 'Obra magna de la teología reformada.', author: 'Juan Calvino' },
  { id: 'l2', title: 'El Progreso del Peregrino', description: 'Alegoría clásica de la vida cristiana.', author: 'John Bunyan' },
  { id: 'l3', title: 'Confesión de Fe de Westminster', description: 'Documento histórico doctrinal detallado del siglo XVII.', author: 'Asamblea de Westminster' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveSection} />;
      case 'bible':
        return <BibleReader />;
      case 'tools':
        return (
          <SectionView 
            title="Herramientas de Estudio" 
            description="Recursos analíticos diseñados para profundizar en el texto original, contexto y referencias cruzadas."
            items={toolsData}
          />
        );
      case 'commentaries':
        return (
          <SectionView 
            title="Comentarios Bíblicos" 
            description="Perspectivas teológicas, exegéticas y devocionales de eruditos a lo largo de la historia."
            items={commentariesData}
          />
        );
      case 'dictionaries':
        return (
          <SectionView 
            title="Diccionarios" 
            description="Definiciones precisas de términos teológicos, históricos, culturales y geográficos."
            items={dictionariesData}
          />
        );
      case 'library':
        return (
          <SectionView 
            title="Biblioteca" 
            description="Tu colección personal de libros teológicos, documentos históricos y recursos de lectura."
            items={libraryData}
          />
        );
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onNavigate={setActiveSection}>
      {renderContent()}
    </Layout>
  );
}

