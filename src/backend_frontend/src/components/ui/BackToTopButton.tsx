import React, { useEffect, useState } from 'react';
import { Button } from './button';
import { ChevronUp } from 'lucide-react';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg p-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
      aria-label="Back to top"
      size="icon"
    >
      <ChevronUp className="w-6 h-6" />
    </Button>
  );
};

export default BackToTopButton; 