
export function AppFooter() {
  return (
    <footer className="border-t">
      <div className="container py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Estigma Doc. Todos los derechos reservados.
        </p>
      </div>
      <div className='text-center text-sm text-muted-foreground'>
        <a href="https://milonguita.com.ar" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
          Desarrollado por Milonguita
        </a>
      </div>
    </footer>
  );
}
