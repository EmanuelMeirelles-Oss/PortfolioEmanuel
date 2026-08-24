import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import ClickSpark from './components/ClickSpark';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <ClickSpark
      sparkColor="#ffffff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="min-h-screen min-h-dvh bg-[#0C0C0C] text-[#D7E2EA] font-sans overflow-x-hidden selection:bg-[#B600A8]/30 selection:text-white">
        {/* Hero Section */}
        <HeroSection onOpenContact={handleOpenContact} />

        {/* Interactive Infinite Marquee Preview */}
        <MarqueeSection />

        {/* About Section */}
        <AboutSection onOpenContact={handleOpenContact} />

        {/* Services Section */}
        <ServicesSection onOpenContact={handleOpenContact} />

        {/* Projects Section */}
        <ProjectsSection onOpenContact={handleOpenContact} />

        {/* Footer Section */}
        <Footer onOpenContact={handleOpenContact} />

        {/* Contact Modal Dialog */}
        <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      </div>
    </ClickSpark>
  );
}

export default App;
