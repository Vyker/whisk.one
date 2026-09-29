import { CurrencyConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', rate: 3.67 },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR ', rate: 3.75 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.38 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.52 },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.65 },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.5, isZeroDecimal: true },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.34 },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 150.2, isZeroDecimal: true },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R ', rate: 18.1 },
  BRL: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$ ', rate: 5.4 },
  MXN: { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$ ', rate: 18.2 },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF ', rate: 0.88 },
};

export const BASE_PRICES = {
  build: 299,
  care: 190,
};

export function formatPrice(baseAmountUSD: number, currencyCode: string): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const amount = baseAmountUSD * currency.rate;

  if (currency.isZeroDecimal || currencyCode === 'JPY' || currencyCode === 'INR') {
    return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
  }

  return `${currency.symbol}${Math.round(amount).toLocaleString()}`;
}
