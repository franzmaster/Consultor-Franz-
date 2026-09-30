export interface AgeBracket {
  id: string;
  label: string;
  minAge: number;
  maxAge: number;
  basePriceIndividualEnf: number;
  basePriceIndividualApto: number;
  basePriceCorporateEnf: number;
  basePriceCorporateApto: number;
}

export interface PlanOption {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  corporateDiscount?: string;
  startingPrice: number;
  coverage: string;
  segmentation: string;
  accommodationOptions: string[];
  copayOptions: string[];
  keyFeatures: string[];
  idealFor: string;
  color: string;
}

export interface NetworkFacility {
  id: string;
  name: string;
  type: 'hospital' | 'pronto-atendimento' | 'hapclinica' | 'vida-imagem' | 'telemedicina';
  city: string;
  state: string;
  address: string;
  services: string[];
  highlight: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  plan: string;
  rating: number;
  comment: string;
  savings?: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'contratacao' | 'carencias' | 'mei' | 'coparticipacao' | 'rede';
}

export interface SimulationState {
  planType: 'individual' | 'corporate' | 'odonto';
  accommodation: 'enfermaria' | 'apartamento';
  copay: 'com' | 'sem';
  includeOdonto: boolean;
  counts: Record<string, number>;
  clientName: string;
  clientPhone: string;
  clientCity: string;
}
