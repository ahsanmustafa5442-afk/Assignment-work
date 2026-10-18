import React, { useState } from 'react';
import { Eye, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { PortfolioProject, ContactInfo } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';
import { ProjectSampleModal } from './ProjectSampleModal.tsx';

interface PortfolioSectionProps {
  projects: PortfolioProject[];
  contact: ContactInfo;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects, contact }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300 inline-block mb-3">
            Academic Project Demonstrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Portfolio & Sample Assignments
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Review detailed demonstration samples illustrating structure, academic argument development, methodology synthesis, and citation formatting.
          </p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (8 demonstration projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group"
            >
              {/* Cover Image & Badges */}
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
                  <SafeImage
                    src={project.coverImage}
                    alt={project.title}
                    fallbackType="assignment"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/90 text-amber-300 border border-amber-300/30 backdrop-blur-xs">
                      DEMONSTRATION SAMPLE
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/90 text-slate-800 shadow-xs backdrop-blur-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-base font-serif font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-800 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Highlights Pill */}
                  <div className="space-y-1 mb-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">Style: {project.citationStyle || 'Harvard'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">Scope: {project.wordCountSample || '3,000 words'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: View Sample */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-amber-600 text-white font-medium text-xs transition-colors shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Demonstration Sample</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed inspection */}
        {activeProject && (
          <ProjectSampleModal
            project={activeProject}
            contact={contact}
            onClose={() => setActiveProject(null)}
          />
        )}

      </div>
    </section>
  );
};
