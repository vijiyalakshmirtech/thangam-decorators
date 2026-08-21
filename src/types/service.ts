import { ProjectCategory, ProjectImage } from './project';

export interface Service {
  id: string;
  slug: string;
  titleEnglish: string;
  titleTamil: string;
  shortDescription: string;
  description: string;
  features: string[];
  featuredImage: ProjectImage;
  relatedCategory: ProjectCategory;
  seoTitle: string;
  seoDescription: string;
}
