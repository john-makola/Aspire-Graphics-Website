
export type Category = 'All' | 'Print' | 'Branding' | 'Creative Design' | 'Signage' | 'Apparel';

export type View = 'home' | 'products' | 'creative-designs' | 'contact' | 'services' | 'legal';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  minQuantity: number;
  deliveryTime: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DesignSuggestion {
  title: string;
  description: string;
  colorPalette: string[];
  fonts: string[];
  concept: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'Logos' | 'Posters' | 'Flyers' | 'Cards' | 'Web Apps' | 'Branding';
  image: string;
  fullDescription: string;
  client: string;
  tools: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
