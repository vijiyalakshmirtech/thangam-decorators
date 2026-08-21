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
      className={`py-16 sm:py-20 md:py-24 bg-thangam-dark-950 relative ${className}`}
      aria-labelledby="portfolio-heading"
    >
      {/* Subtle background ambient lighting */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-thangam-gold-500/5 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <Container size="default" className="relative z-10">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Authentic Stage Portfolio"
          title="Master Stage Scenography & Mandapam Gallery"
          subtitle="Crafted by P.T. Selvam across Erode and Western Tamil Nadu"
          description="Explore our authentic stage decorations featuring traditional temple gopurams, luxury reception backdrops, scalloped silk drapery, and handcrafted ceremonial sets."
          className="mb-8 sm:mb-12"
        />

        {/* Category Filter Navigation */}
        <div 
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
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
                className={`group px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-thangam-gold-400 ${
                  isActive
                    ? 'bg-thangam-gold-500 text-thangam-dark-950 border-thangam-gold-400 font-semibold shadow-lg shadow-thangam-gold-500/20'
                    : 'bg-thangam-dark-900/90 text-thangam-ivory-100/75 border-white/10 hover:border-thangam-gold-500/40 hover:text-thangam-ivory-50'
                }`}
              >
                <span>{filter.labelEnglish}</span>
                {filter.labelTamil && (
                  <span className={`text-[10px] hidden md:inline font-serif italic ${
                    isActive ? 'text-thangam-dark-900/70' : 'text-thangam-gold-400/60 group-hover:text-thangam-gold-400'
                  }`}>
                    • {filter.labelTamil}
                  </span>
                )}
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-thangam-dark-950/20 text-thangam-dark-950 font-bold'
                      : 'bg-white/5 text-thangam-ivory-100/50'
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
        >
          {filteredProjects.length === 0 ? (
            <div className="col-span-full py-12">
              <EmptyState
                title="No Stage Designs Found in Category"
                description="We are regularly updating our verified stage catalog with new authentic photography."
                actionText="View All Collections"
                onAction={() => setActiveCategory('all')}
                icon={<Sparkles className="w-8 h-8 text-thangam-gold-400" />}
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
                  className="luxury-card group overflow-hidden flex flex-col justify-between border border-thangam-gold-500/20 hover:border-thangam-gold-500/50 transition-all duration-300 rounded-2xl bg-thangam-dark-900/80 shadow-xl"
                  aria-labelledby={`project-title-${project.id}`}
                >
                  {/* Image Container with Interactive Overlay */}
                  <div
                    className="relative cursor-pointer overflow-hidden rounded-t-2xl aspect-[16/9] bg-thangam-dark-950"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-thangam-dark-950/90 via-thangam-dark-950/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      {project.featured ? (
                        <Badge variant="gold" icon={<Sparkles className="w-3 h-3" />}>
                          Featured Design
                        </Badge>
                      ) : (
                        <Badge variant="dark">Verified Setup</Badge>
                      )}

                      <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-medium text-thangam-ivory-50 border border-white/10 flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-thangam-gold-400" />
                        <span>{galleryPhotoCount} Photos</span>
                      </span>
                    </div>

                    {/* Hover Action Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-thangam-dark-950/40 backdrop-blur-[2px] pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-thangam-gold-500 text-thangam-dark-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4" />
                        Explore Gallery ({galleryPhotoCount})
                      </span>
                    </div>

                    {/* Location & Event Tag in Bottom Corner */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-thangam-ivory-100/80 pointer-events-none">
                      <span className="flex items-center gap-1 font-medium text-thangam-gold-300">
                        <MapPin className="w-3 h-3 text-thangam-gold-400" />
                        {project.location}
                      </span>
                      {project.date && (
                        <span className="flex items-center gap-1 text-thangam-ivory-100/60 text-[11px]">
                          <Calendar className="w-3 h-3" />
                          {project.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-thangam-gold-400">
                          {project.eventType}
                        </span>
                      </div>

                      <h3
                        id={`project-title-${project.id}`}
                        className="text-xl sm:text-2xl font-serif font-bold text-thangam-ivory-50 group-hover:text-thangam-gold-300 transition-colors leading-snug mb-2"
                      >
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-thangam-ivory-100/75 leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Key Style Elements Chips */}
                      {project.style && project.style.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Decor features">
                          {project.style.map((item, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/10 text-thangam-ivory-100/70"
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
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenGallery(project, 0)}
                        leftIcon={<Eye className="w-4 h-4 text-thangam-gold-400" />}
                        className="text-xs sm:text-sm hover:bg-thangam-gold-500/10"
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
                          className="text-xs"
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
