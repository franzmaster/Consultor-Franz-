import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PriceSimulator } from './components/PriceSimulator';
import { PlansList } from './components/PlansList';
import { NetworkExplorer } from './components/NetworkExplorer';
import { CarenciasTable } from './components/CarenciasTable';
import { WhyFranze } from './components/WhyFranze';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { QuickContactModal } from './components/QuickContactModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Footer } from './components/Footer';

export default function App() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'call' | 'pdf';
  }>({
    isOpen: false,
    type: 'call',
  });

  const handleOpenQuickModal = (type: 'call' | 'pdf') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseQuickModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      {/* Top Navbar with quick alert & contact */}
      <Navbar onOpenQuickModal={handleOpenQuickModal} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Banner with Value Proposition & Fast Quote Card */}
        <Hero onOpenQuickModal={handleOpenQuickModal} />

        {/* Live Interactive Plan Pricing Calculator */}
        <PriceSimulator />

        {/* Comprehensive Plans Portfolio (Nosso Plano, Mix, Pleno, PME/MEI, +Odonto) */}
        <PlansList />

        {/* Verticalized Network Explorer (Hospitals, Clinics, Emergency 24h, Imaging, Telemedicine) */}
        <NetworkExplorer />

        {/* Transparent Waiting Periods Comparison Table */}
        <CarenciasTable />

        {/* Consultant Franzé Credibility & Advantages */}
        <WhyFranze />

        {/* Authentic Customer Testimonials */}
        <Testimonials />

        {/* Interactive FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Footer with Compliance, Disclaimers, and Contacts */}
      <Footer />

      {/* Modals & Floating Tools */}
      <QuickContactModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={handleCloseQuickModal}
      />

      <WhatsAppFloat />
    </div>
  );
}
