import React, { useState, useMemo } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ImageWrapper } from '../components/common/ImageWrapper';
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
  Calendar
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

  // Filter projects dynamically
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

  // Get gallery images for the active lightbox project
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
      className={`py-24 sm:py-32 bg-[#F7F0E4] relative overflow-hidden border-t border-[#6E1830]/15 ${className}`}
      aria-labelledby="portfolio-heading"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B3A4E]/5 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Curated Portfolio Gallery"
          title="MASTER STAGE SCENOGRAPHY."
          subtitle="கலைநயம் மிக்க திருமண மற்றும் வரவேற்பு மேடை காட்சியகம்"
          description="Explore our authentic stage decorations featuring traditional temple gopurams, luxury reception backdrops, scalloped silk drapery, and handcrafted ceremonial sets crafted by P.T. Selvam."
          theme="light"
          className="mb-8 sm:mb-12"
        />

        {/* Category Filter Navigation */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
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
                className={`group px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E1830] ${
                  isActive
                    ? 'bg-[#6E1830] text-[#FFF8ED] border-[#6E1830] font-semibold shadow-md scale-105'
                    : 'bg-[#FFF8ED] text-[#6E1830] border-[#6E1830]/20 hover:border-[#6E1830] hover:bg-[#F7F0E4]'
                }`}
              >
                <span>{filter.labelEnglish}</span>
                {filter.labelTamil && (
                  <span className={`text-[10px] hidden md:inline font-serif italic ${
                    isActive ? 'text-[#FFF8ED]/80' : 'text-[#6E1830]/70'
                  }`}>
                    • {filter.labelTamil}
                  </span>
                )}
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#FFF8ED]/20 text-[#FFF8ED] font-bold'
                      : 'bg-[#6E1830]/10 text-[#6E1830]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Projects Grid */}
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
                icon={<Sparkles className="w-8 h-8 text-[#6E1830]" />}
              />
            </div>
          ) : (
            filteredProjects.map((project, idx) => {
              const galleryPhotoCount = project.images.length || 1;
              const whatsAppUrl = generateWhatsAppUrl(
                `Hello P.T. Selvam, I would like to inquire about stage design: "${project.title}".`
              );

              return (
                <article
                  key={project.id}
                  className="group overflow-hidden flex flex-col justify-between border border-[#6E1830]/15 hover:border-[#6E1830] transition-all duration-500 rounded-2xl bg-[#FFF8ED] shadow-[0_8px_30px_rgba(74,14,27,0.04)] hover:shadow-[0_15px_45px_rgba(74,14,27,0.12)]"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  {/* Image Container with Interactive Overlay */}
                  <div
                    className="relative cursor-pointer overflow-hidden rounded-t-2xl aspect-[16/9] bg-[#F7F0E4]"
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
                    <ImageWrapper
                      src={project.coverImage.url}
                      alt={project.coverImage.altText}
                      aspectRatio="16/9"
                      priority={idx < 2}
                      className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E1B]/85 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                      {project.featured ? (
                        <Badge variant="gold" icon={<Sparkles className="w-3 h-3 text-[#6E1830]" />}>
                          Featured Design
                        </Badge>
                      ) : (
                        <Badge variant="dark">Verified Setup</Badge>
                      )}

                      <span className="px-2.5 py-1 rounded-full bg-[#5A1426]/90 backdrop-blur-md text-[11px] font-medium text-[#FFF8ED] border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <Images className="w-3.5 h-3.5 text-[#FFF8ED]" />
                        <span>{galleryPhotoCount} Photos</span>
                      </span>
                    </div>

                    {/* Hover Action Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#4A0E1B]/40 backdrop-blur-[2px] pointer-events-none">
                      <span className="px-5 py-2.5 rounded-full bg-[#6E1830] text-[#FFF8ED] border border-white/30 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4 text-[#FFF8ED]" />
                        Explore Gallery ({galleryPhotoCount})
                      </span>
                    </div>

                    {/* Location & Event Tag in Bottom Corner */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FFF8ED] pointer-events-none">
                      <span className="flex items-center gap-1 font-medium text-[#FFF8ED]">
                        <MapPin className="w-3.5 h-3.5 text-[#FFF8ED]" />
                        {project.location}
                      </span>
                      {project.date && (
                        <span className="flex items-center gap-1 text-[#F7F0E4]/80 text-[11px]">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-7 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E1830]">
                          {project.eventType}
                        </span>
                      </div>

                      <h3
                        id={`project-title-${project.id}`}
                        className="text-xl sm:text-2xl font-serif font-bold text-[#6E1830] group-hover:text-[#4A0E1B] transition-colors leading-snug mb-2"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#1F161A]/80 leading-relaxed mb-4 font-light">
                        {project.shortDescription}
                      </p>

                      {/* Key Style Elements Chips */}
                      {project.style && project.style.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Decor features">
                          {project.style.map((item, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2.5 py-0.5 rounded text-[11px] bg-[#F7F0E4] border border-[#6E1830]/15 text-[#6E1830] font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-[#6E1830]/15 flex flex-wrap items-center justify-between gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenGallery(project, 0)}
                        leftIcon={<Eye className="w-4 h-4 text-[#6E1830]" />}
                        className="text-xs sm:text-sm font-semibold"
                      >
                        View Photos ({galleryPhotoCount})
                      </Button>

                      {whatsAppUrl && (
                        <Button
                          variant="whatsapp"
                          size="sm"
                          href={whatsAppUrl}
                          target="_blank"
                          leftIcon={<MessageCircle className="w-3.5 h-3.5" />}
                          className="text-xs font-semibold"
                          onClick={() =>
                            trackEvent('whatsapp_click', {
                              sourceLocation: 'portfolio_card',
                              projectId: project.id,
                            })
                          }
                        >
                          Inquire
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </Container>

      {/* Interactive Lightbox Viewer */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={currentGalleryImages}
        currentIndex={lightboxIndex}
        projectTitle={selectedProject?.title}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
};
