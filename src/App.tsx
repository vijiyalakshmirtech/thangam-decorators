import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileStickyBar } from './components/layout/MobileStickyBar';
import { Modal } from './components/common/Modal';
import { CustomCursor } from './components/common/CustomCursor';
import { ContactForm } from './components/ui/ContactForm';

// Sections in Luxury Flow
import { Hero } from './sections/Hero';
import { BrandIntro } from './sections/BrandIntro';
import { TransformationExperience } from './sections/TransformationExperience';
import { SignatureDecorations } from './sections/SignatureDecorations';
import { StageShowroom } from './sections/StageShowroom';
import { Portfolio } from './sections/Portfolio';
import { WhyThangam } from './sections/WhyThangam';
import { Process } from './sections/Process';
import { BrandStatement } from './sections/BrandStatement';
import { Services } from './sections/Services';
import { Faqs } from './sections/Faqs';
import { Contact } from './sections/Contact';

// Analytics
import { initAnalytics } from './lib/analytics';

// Smooth Scroll & Animations
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics 4 (non-blocking)
    initAnalytics();

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F0E4] text-[#1F161A] font-sans antialiased selection:bg-[#6E1830] selection:text-[#FFFDF8]">
      {/* 0. Custom Magnetic Luxury Cursor (Desktop) */}
      <CustomCursor />

      {/* 1. Header Layout */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* 2. Main Content Foundation Flow */}
      <main id="home" className="flex-grow">
        {/* Cinematic 3D Hero */}
        <Hero onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Section 01: Brand Heritage & Pillars */}
        <BrandIntro id="brand-intro" />

        {/* Section 02: Transformation Experience */}
        <TransformationExperience id="experience" />

        {/* Section 03: Signature Decor Categories */}
        <SignatureDecorations id="decorations" onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Section 04: Interactive Stage Showroom */}
        <StageShowroom id="showroom" onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Section 05: Master Stage Scenography Portfolio */}
        <Portfolio id="portfolio" />

        {/* Section 06: Why Thangam & Founder Pillars */}
        <WhyThangam id="why-thangam" />

        {/* Section 07: 4-Step Process */}
        <Process id="process" />

        {/* Section 08: Full-width Burgundy Brand Statement */}
        <BrandStatement id="statement" onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Supporting Services Grid */}
        <Services id="services" />

        {/* FAQs */}
        <Faqs id="faqs" />

        {/* Contact / Consultation Suite */}
        <Contact id="contact" />
      </main>

      {/* 3. Reusable Consultation Modal */}
      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title="Book Your Event Decor"
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
