import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estigma Doc',
  description: 'Plataforma informativa y funcional para el tratamiento de heridas ulcerosas. Y demas cuidados',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
