import React from 'react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Home, Phone } from 'lucide-react';
import { generateTelUrl } from '../../utils/urlHelpers';
import { siteConfig } from '../../config/site';

export const NotFoundView: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container size="narrow" className="text-center">
        <span className="text-6xl sm:text-8xl font-serif font-bold text-thangam-gold-500/40 select-none">
          404
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-thangam-ivory-50 mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-thangam-ivory-100/70 max-w-md mx-auto mb-8">
          The stage or page you are looking for does not exist or has been moved. Explore our signature wedding stage collections or call P.T. Selvam directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            size="md"
            href="/"
            leftIcon={<Home className="w-4 h-4" />}
          >
            Return to Home
          </Button>

          <Button
            variant="secondary"
            size="md"
            href={generateTelUrl()}
            leftIcon={<Phone className="w-4 h-4" />}
          >
            Call {siteConfig.brand.ownerName}
          </Button>
        </div>
      </Container>
    </div>
  );
};
