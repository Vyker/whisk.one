import roasteryImg from '../assets/showcase/roastery.jpg';
import maisonImg from '../assets/showcase/maison.jpg';

export interface ShowcaseSample {
  id: string;
  name: string;
  type: string;
  location: string;
  tagline: string;
  image: string;
  heroHeadline: string;
  heroDescription: string;
  features: string[];
  palette: { primary: string; secondary: string; bg: string };
  hours: string;
  phone: string;
  domain: string;
}

export const SHOWCASE_SAMPLES: Record<string, ShowcaseSample> = {
  roastery: {
    id: 'roastery',
    name: 'The Roastery Co.',
    type: 'Artisan Coffee & Micro-Roasters',
    location: 'Shoreditch, London',
    tagline: 'Single origin beans, roasted fresh every Tuesday morning.',
    image: roasteryImg,
    heroHeadline: 'Ethically sourced. Small-batch roasted in East London.',
    heroDescription: 'From high-altitude Ethiopian micro-lots to silky smooth Colombian beans. Served with artisan sourdough pastries daily.',
    features: ['Espresso & Filter Flight Menu', 'Monthly Coffee Subscription Delivery', 'Barista Masterclasses on Saturdays'],
    palette: { primary: '#ab2f00', secondary: '#f8ebe4', bg: '#fff8f5' },
    hours: 'Mon-Fri 7:00am - 4:00pm, Sat-Sun 8:30am - 5:00pm',
    phone: '+44 20 7946 0912',
    domain: 'theroastery.co.uk',
  },
  maison: {
    id: 'maison',
    name: 'Maison Éclat',
    type: 'Boutique Facial & Wellness Atelier',
    location: 'Le Marais, Paris / Tribeca, New York',
    tagline: 'Holistic skin treatments and botanical sculpting.',
    image: maisonImg,
    heroHeadline: 'Timeless French skincare meets modern cellular renewal.',
    heroDescription: 'Individualized facial protocols blending lymphatic drainage massage, organic botanical active serums, and micro-current lifting.',
    features: ['Signature 75-Min Glow Facial', 'Cryo-Sculpting & Gua Sha Atelier', 'Curated European Clean Skincare apothecary'],
    palette: { primary: '#2a6653', secondary: '#ede0d9', bg: '#fff8f5' },
    hours: 'Tue-Sat 10:00am - 7:30pm (By Appointment Only)',
    phone: '+1 (212) 555-0184',
    domain: 'maisoneclat.com',
  },
};

export const INDUSTRY_CHIPS = [
  { label: 'Salons', slug: 'salons', headline: 'Hair stylists, lash technicians, and aesthetic clinics' },
  { label: 'Plumbers', slug: 'plumbers', headline: 'Emergency plumbing, boiler service, and bathroom fitters' },
  { label: 'Cafés', slug: 'cafes', headline: 'Artisan coffee bars, bakeries, and neighbourhood bistros' },
  { label: 'Coaches', slug: 'coaches', headline: 'Executive mentors, personal trainers, and life coaches' },
  { label: 'Photographers', slug: 'photographers', headline: 'Wedding, portrait, and commercial editorial studios' },
  { label: 'Tutors', slug: 'tutors', headline: 'Math, science, language, and test prep educators' },
  { label: 'Consultants', slug: 'consultants', headline: 'Financial advisors, marketing specialists, and recruiters' },
  { label: 'Traders', slug: 'traders', headline: 'Electricians, carpenters, roofers, and landscapers' },
];

export const INITIAL_TWEAKS = [
  {
    id: 'twk-1',
    title: 'Swap Sunday opening hours',
    description: 'Please change Sunday hours from 10am to 11am on the footer and contact page.',
    page: 'Footer & Contact',
    priority: 'low' as const,
    status: 'completed' as const,
    createdAt: '2026-09-27 14:15',
    completedAt: '2026-09-27 16:30',
  },
  {
    id: 'twk-2',
    title: 'Update Instagram handle link',
    description: 'Point the Instagram icon in footer to @sarahpilatesstudio instead of personal account.',
    page: 'All pages (Footer)',
    priority: 'medium' as const,
    status: 'completed' as const,
    createdAt: '2026-09-28 09:20',
    completedAt: '2026-09-28 11:05',
  },
];
