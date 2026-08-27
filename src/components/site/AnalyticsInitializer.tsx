'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';

export function AnalyticsInitializer() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
