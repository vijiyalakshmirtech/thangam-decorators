export type ProjectCategory =
  | "traditional-mandapam"
  | "reception-stage"
  | "pre-wedding"
  | "temple-cultural";

export interface ProjectImage {
  url: string;
  altText: string;
  width?: number;
  height?: number;
  caption?: string;
  isCover?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  eventType: string;
  location: string;
  date?: string;
  coverImage: ProjectImage;
  images: ProjectImage[];
  shortDescription: string;
  description: string;
  style: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  // Future Expansion Slots (Optional)
  panoramaUrl?: string;
  model3dUrl?: string;
  // Development Mock Flag (for non-production demo records)
  isDevelopmentMock?: boolean;
}
