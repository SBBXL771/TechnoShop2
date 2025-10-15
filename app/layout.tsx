// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/hooks/layout/Header';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';

export const metadata: Metadata = {
  title: 'Cyber Store',
  description: 'Modern online shop built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
