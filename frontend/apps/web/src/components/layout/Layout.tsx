import { Header } from './Header';
import { Footer } from './Footer';
import React from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex flex-col">
      <Header />
      {}
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}