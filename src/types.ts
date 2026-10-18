export interface ContactInfo {
  brandName: string;
  ownerName: string;
  whatsappDisplay: string;
  whatsappInternational: string;
  email: string;
  serviceHours: string;
  location: string;
}

export interface HeroData {
  headline: string;
  subtitle: string;
  profileImage: string;
  heroImage: string;
  badge: string;
}

export interface AboutData {
  title: string;
  ownerName: string;
  intro: string;
  description: string;
  skills: string[];
  education: string;
  ethicsStatement: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  examplePrice: string;
  iconName: string;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  published: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  objective: string;
  shortDescription: string;
  sampleHeadings: string[];
  sampleExcerpt: string;
  formattingHighlights: string[];
  published: boolean;
  citationStyle?: string;
  wordCountSample?: string;
}

export interface PricingCard {
  id: string;
  title: string;
  startingPricePKR: number;
  description: string;
  features: string[];
  popular?: boolean;
  published: boolean;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  needsReview?: boolean;
  published: boolean;
}

export interface SiteData {
  contact: ContactInfo;
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  gallery: GalleryItem[];
  projects: PortfolioProject[];
  pricing: PricingCard[];
  processSteps: ProcessStep[];
  faqs: FaqItem[];
  lastUpdated: string;
}
