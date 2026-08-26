export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface SiteBrand {
  name: string;
  ownerName: string;
  tagline: string;
  logo: string;
  favicon: string;
}

export interface SiteContact {
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  whatsappNumber: string | null;
  googleReviewUrl: string | null;
}

export interface SiteSocial {
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

export interface SiteLocation {
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  landmarks: string | null;
  coordinates: GeoCoordinates | null;
}

export interface SiteSeo {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  defaultOgImage: string;
}

export interface SiteAnalytics {
  enabled: boolean;
  measurementId: string | null;
  anonymizeIp: boolean;
}

export interface SiteConfig {
  site: {
    name: string;
    url: string | null;
    description: string;
    locale: string;
  };
  brand: SiteBrand;
  contact: SiteContact;
  social: SiteSocial;
  location: SiteLocation;
  seo: SiteSeo;
  analytics: SiteAnalytics;
}

export const siteConfig: SiteConfig = {
  site: {
    name: "Thangam Decorators",
    url: null,
    description: "Premium wedding and stage decoration services in Erode.",
    locale: "en-IN"
  },
  brand: {
    name: "Thangam Decorators",
    ownerName: "P.T. Selvam",
    tagline: "Premium Wedding & Stage Decoration",
    logo: "/assets/brand/logo.jpg",
    favicon: "/assets/brand/logo.jpg"
  },
  contact: {
    phonePrimary: "+919842669882",
    phoneSecondary: "+919042069882",
    email: "Ptselvam4970@gmail.com",
    whatsappNumber: null,
    googleReviewUrl: null
  },
  social: {
    instagram: "https://www.instagram.com/selvampts/",
    facebook: "https://www.facebook.com/people/Thangam-Decorators/100065652632732/",
    youtube: null
  },
  location: {
    address: "7/11, Agathiyar Veethi",
    city: "Erode",
    postalCode: "638001",
    state: "Tamil Nadu",
    country: "India",
    landmarks: null,
    coordinates: null
  },
  seo: {
    defaultTitle: "Thangam Decorators — Premium Wedding & Stage Decoration in Erode",
    titleTemplate: "%s | Thangam Decorators",
    defaultDescription: "Bespoke wedding mandapam, reception stage, and floral decoration services by P.T. Selvam in Erode.",
    keywords: [
      "wedding decorators in Erode",
      "stage decoration Erode",
      "mandapam decoration Erode",
      "reception stage decorators Erode",
      "Thangam Decorators Erode",
      "P.T. Selvam decorators Erode",
      "Erode wedding flower decoration"
    ],
    // Development fallback image. Production should use a dedicated 1200×630 Open Graph image asset.
    defaultOgImage: "/assets/brand/logo.jpg"
  },
  analytics: {
    enabled: true,
    measurementId: "G-WPBYE3PMPQ",
    anonymizeIp: true
  }
};
