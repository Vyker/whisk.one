export type ScreenTab = 'overview' | 'pipeline' | 'portal' | 'deliverables';

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  rate: number; // against USD
  isZeroDecimal?: boolean;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  profession: string;
  location: string;
  domain: string;
  details: string;
  submittedAt: string;
  status: 'received' | 'reviewing' | 'building' | 'live';
}

export interface TweakRequest {
  id: string;
  title: string;
  description: string;
  page: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: string;
  completedAt?: string;
}
