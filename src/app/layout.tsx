import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import { siteConfig } from '@/config/site';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  fallback: ['Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: siteConfig.fullName,
  description: siteConfig.description,
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%2302575f'/%3E%3Ctext x='6' y='24' font-family='sans-serif' font-size='24' fill='white'%3Ec%3C/text%3E%3C/svg%3E"
  }
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
