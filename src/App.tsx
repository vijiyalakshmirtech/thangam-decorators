import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { Container } from './components/common/Container';
import { SectionHeading } from './components/common/SectionHeading';
import { Modal } from './components/common/Modal';
import { ContactForm } from './components/ui/ContactForm';
import { EmptyState } from './components/ui/EmptyState';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Portfolio } from './sections/Portfolio';
import { About } from './sections/About';
import { Faqs } from './sections/Faqs';
import { Contact } from './sections/Contact';
import { siteConfig } from './config/site';
import { TESTIMONIALS_DATA } from './data/testimonials';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-thangam-dark-950 text-thangam-ivory-50 antialiased selection:bg-thangam-gold-500 selection:text-thangam-dark-950">
      {/* 1. Header Layout */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* 2. Main Content Foundation Area */}
      <main id="home" className="flex-grow pt-24 sm:pt-28 pb-16">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Portfolio Showcase Section */}
        <Portfolio />

        {/* About / Heritage & Trust Section */}
        <About />

        {/* FAQs Section */}
        <Faqs />

        {/* Testimonials Empty State Handling */}
        <section id="testimonials" className="py-16 border-b border-white/5">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Zero-Fabrication Policy"
              title="Client Testimonials Module"
              description="The UI handles empty testimonial datasets gracefully without broken layouts."
            />

            {TESTIMONIALS_DATA.length === 0 ? (
              <EmptyState
                title="Client Testimonials Under Review"
                description={`Verified reviews from ${siteConfig.brand.ownerName}'s past weddings and events will be published upon client confirmation.`}
                actionText="Request Direct Consultation"
                onAction={() => setIsQuoteModalOpen(true)}
                icon={<Sparkles className="w-8 h-8 text-thangam-gold-400" />}
              />
            ) : null}
          </Container>
        </section>

        {/* Contact / Consultation Section */}
        <Contact />
      </main>

      {/* 3. Reusable Quote Consultation Modal */}
      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="Request Event Stage Consultation"
        maxWidth="lg"
      >
        <ContactForm onSuccess={() => setIsQuoteModalOpen(false)} />
      </Modal>

      {/* 4. Footer Layout */}
      <Footer />

      {/* 5. Mobile Sticky Quick Action Bar */}
      <MobileStickyBar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
    </div>
  );
};
