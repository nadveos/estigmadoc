import React from 'react';

export function AppFooter() {
  return (
    <footer className="border-t">
      <div className="container py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UlcerAid. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
