'use client';

import React, { useState, useMemo } from 'react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { TechLabel } from '../components/common/TechLabel';
import { SpatialFrame } from '../components/common/SpatialFrame';
import { GlowLine } from '../components/common/GlowLine';
import { Lightbox } from '../components/common/Lightbox';
import { EmptyState } from '../components/ui/EmptyState';
import { PROJECTS_DATA } from '../data/projects';
import { Project, ProjectCategory } from '../types/project';
import { generateWhatsAppUrl } from '../utils/urlHelpers';
import { trackEvent } from '../lib/analytics';
import {
  Sparkles,
  Images,
  Eye,
  MessageCircle,
  MapPin,
  Calendar,
  Layers,
  FolderOpen
} from 'lucide-react';

type FilterCategory = 'all' | ProjectCategory;

interface CategoryFilterOption {
  id: FilterCategory;
  labelEnglish: string;
  labelTamil?: string;
}

const CATEGORY_FILTERS: CategoryFilterOption[] = [
  { id: 'all', labelEnglish: 'All Collections', labelTamil: 'அனைத்தும்' },
  { id: 'traditional-mandapam', labelEnglish: 'Traditional Mandapams', labelTamil: 'முகூர்த்த மேடைகள்' },
  { id: 'reception-stage', labelEnglish: 'Reception Stages', labelTamil: 'வரவேற்பு மேடைகள்' },
  { id: 'pre-wedding', labelEnglish: 'Family & Pre-Wedding', labelTamil: 'இல்ல விழாக்கள்' },
  { id: 'temple-cultural', labelEnglish: 'Temple & Cultural', labelTamil: 'ஆன்மீக அலங்காரங்கள்' },
];

export interface PortfolioSectionProps {
  id?: string;
  className?: string;
}

export const Portfolio: React.FC<PortfolioSectionProps> = ({
  id = 'portfolio',
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Filter projects dynamically based on category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS_DATA.length };
    PROJECTS_DATA.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Primary featured project for the showcase hero moment
  const primaryFeaturedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];
  }, []);

  const handleOpenGallery = (project: Project, initialIndex = 0) => {
    setSelectedProject(project);
    setLightboxIndex(initialIndex);
    setIsLightboxOpen(true);
    trackEvent('gallery_open', {
      projectId: project.id,
      category: project.category,
      projectTitle: project.title,
    });
  };

  const handleFilterChange = (catId: FilterCategory) => {
    setActiveCategory(catId);
    trackEvent('portfolio_view', {
      sourceLocation: 'portfolio_filter',
      category: catId,
    });
  };

  // Extract gallery images for the active lightbox
  const currentGalleryImages = useMemo(() => {
    if (!selectedProject) return [];
    if (selectedProject.images && selectedProject.images.length > 0) {
      return selectedProject.images;
    }
    return [selectedProject.coverImage];
  }, [selectedProject]);

  return (
    <section
      id={id}
      className={`py-24 sm:py-32 bg-gradient-to-b from-[#3B0D18] via-[#4A0E1B] to-[#3B0D18] text-[#FFF8ED] relative overflow-hidden border-t border-[#C6A15B]/20 ${className}`}
      aria-labelledby="portfolio-heading"
    >
      {/* Studio Blueprint Grid Overlay */}
      <div className="absolute inset-0 studio-grid-overlay pointer-events-none opacity-30" aria-hidden="true" />
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#C6A15B]/10 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="mb-4 flex justify-center gap-2">
            <TechLabel variant="gold" icon={<FolderOpen className="w-3.5 h-3.5" />}>
              SCENOGRAPHY ARCHIVE • ERODE STUDIO LAB
            </TechLabel>
          </div>

          <h2
            id="portfolio-heading"
            className="text-3xl sm:text-5xl md:text-6xl font-serif font-medium text-[#FFF8ED] tracking-tight leading-tight mb-4"
          >
            MASTER SCENOGRAPHY ARCHIVE.
          </h2>

          <p className="font-tamil text-base sm:text-xl font-medium text-[#E0C078] mb-4">
            கலைநயம் மிக்க திருமண மற்றும் வரவேற்பு மேடை காட்சியகம்
          </p>

          <p className="text-base text-[#F7F0E4]/85 font-light max-w-2xl mx-auto">
            Explore authentic stage architectures, Vedic temple mandapams, and luxury reception backdrops crafted by P.T. Selvam across Erode, Coimbatore, and Western Tamil Nadu.
          </p>

          <GlowLine variant="gold" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* Category Filter Navigation */}
        <div
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16"
          role="tablist"
          aria-label="Filter portfolio by stage category"
        >
          {CATEGORY_FILTERS.map((filter) => {
            const isActive = activeCategory === filter.id;
            const count = categoryCounts[filter.id] || 0;

            return (
              <button
                key={filter.id}
                role="tab"
                id={`tab-${filter.id}`}
                aria-selected={isActive}
                aria-controls="portfolio-grid"
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleFilterChange(filter.id)}
                className={`group px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border min-h-[44px] backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0C078] ${
                  isActive
                    ? 'bg-[#C6A15B] text-[#3B0D18] border-[#F3E5AB] font-bold shadow-[0_0_20px_rgba(224,192,120,0.35)] scale-105'
                    : 'bg-[#3B0D18]/80 text-[#F7F0E4]/80 border-[#C6A15B]/25 hover:border-[#E0C078] hover:text-[#FFF8ED]'
                }`}
              >
                <span>{filter.labelEnglish}</span>
                {filter.labelTamil && (
                  <span className={`text-[10px] hidden md:inline font-tamil ${
                    isActive ? 'text-[#3B0D18]/80 font-semibold' : 'text-[#E0C078]'
                  }`}>
                    • {filter.labelTamil}
                  </span>
                )}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-[#3B0D18] text-[#E0C078] font-bold'
                      : 'bg-black/30 text-[#E0C078]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Project Archive Grid */}
        <div
          id="portfolio-grid"
          role="region"
          aria-live="polite"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10"
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12">
              <EmptyState
                title="No Stage Designs Found in Category"
                description="We are regularly updating our verified stage catalog with new authentic photography."
                actionText="View All Collections"
                onAction={() => setActiveCategory('all')}
                icon={<Sparkles className="w-8 h-8 text-[#E0C078]" />}
              />
            </div>
          ) : (
            filteredProjects.map((project, idx) => {
              const galleryPhotoCount = project.images.length || 1;
              const whatsAppUrl = generateWhatsAppUrl(
                `Hello P.T. Selvam, I would like to inquire about stage design: "${project.title}".`
              );

              return (
                <SpatialFrame
                  key={project.id}
                  label={`ARCHIVE // ${project.id.toUpperCase()}`}
                  theme="dark"
                  className="p-3 sm:p-4 group"
                >
                  <article
                    className="flex flex-col justify-between h-full"
                    aria-labelledby={`project-title-${project.id}`}
                  >
                    {/* Image Container with Interactive Overlay */}
                    <div
                      className="relative cursor-pointer overflow-hidden rounded-xl aspect-[16/10] bg-[#3B0D18] border border-[#C6A15B]/30"
                      onClick={() => handleOpenGallery(project, 0)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenGallery(project, 0);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open photo gallery for ${project.title} (${galleryPhotoCount} photographs)`}
                    >
                      <img
                        src={project.coverImage.url}
                        alt={project.coverImage.altText}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                      />

                      {/* Gradient Vignette for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3B0D18]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
                        {project.featured ? (
                          <TechLabel variant="gold" icon={<Sparkles className="w-3 h-3" />}>
                            FEATURED CASE STUDY
                          </TechLabel>
                        ) : (
                          <TechLabel variant="burgundy">
                            VERIFIED STAGE
                          </TechLabel>
                        )}

                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#E0C078] border border-white/15 flex items-center gap-1.5 shadow-sm">
                          <Images className="w-3 h-3 text-[#E0C078]" />
                          <span>{galleryPhotoCount} Photos</span>
                        </span>
                      </div>

                      {/* Hover Action Prompt */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#3B0D18]/50 backdrop-blur-[2px] pointer-events-none">
                        <span className="px-5 py-2.5 rounded-full bg-[#E0C078] text-[#3B0D18] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4 text-[#3B0D18]" />
                          Explore Case Study ({galleryPhotoCount})
                        </span>
                      </div>

                      {/* Location & Event Tag in Bottom Corner */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FFF8ED] pointer-events-none">
                        <span className="flex items-center gap-1 font-mono text-[11px] text-[#FFF8ED]">
                          <MapPin className="w-3.5 h-3.5 text-[#E0C078]" />
                          {project.location}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#E0C078]">
                          {project.eventType}
                        </span>
                      </div>
                    </div>

                    {/* Project Specifications & Metadata */}
                    <div className="pt-5 flex-grow flex flex-col justify-between">
                      <div>
                        <h3
                          id={`project-title-${project.id}`}
                          className="text-xl sm:text-2xl font-serif font-bold text-[#FFF8ED] group-hover:text-[#E0C078] transition-colors leading-snug mb-2"
                        >
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#F7F0E4]/80 leading-relaxed mb-4 font-light">
                          {project.shortDescription}
                        </p>

                        {/* Key Style Elements Chips */}
                        {project.style && project.style.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Decor features">
                            {project.style.map((item, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/30 border border-[#C6A15B]/20 text-[#E0C078]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenGallery(project, 0)}
                          leftIcon={<Eye className="w-4 h-4 text-[#E0C078]" />}
                          className="text-xs font-semibold border-[#C6A15B]/30 hover:border-[#E0C078]"
                        >
                          View Study ({galleryPhotoCount})
                        </Button>

                        {whatsAppUrl && (
                          <Button
                            variant="whatsapp"
                            size="sm"
                            href={whatsAppUrl ?? undefined}
                            target="_blank"
                            leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                            className="text-xs font-semibold uppercase tracking-wider"
                            onClick={() =>
                              trackEvent('whatsapp_click', {
                                sourceLocation: 'portfolio_card',
                                projectId: project.id,
                              })
                            }
                          >
                            Inquire Setup
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                </SpatialFrame>
              );
            })
          )}
        </div>
      </Container>

      {/* Interactive Digital Lightbox Viewer */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={currentGalleryImages}
        currentIndex={lightboxIndex}
        projectTitle={selectedProject?.title}
        category={selectedProject?.eventType}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
};

export default Portfolio;
