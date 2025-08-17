"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  { name: "Inicio", href: "#home" },
  { name: "Artículos", href: "#articles" },
  { name: "Casos de Éxito", href: "#cases" },
  { name: "Agendar Cita", href: "#appointment" },
];

export function AppHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-accent" />
            <span className="font-bold text-lg font-headline">
              Estigma Doc
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={(e) => handleLinkClick(e, route.href)}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button className="hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="#appointment" onClick={(e) => handleLinkClick(e, "#appointment")}>
              Contactar
            </Link>
          </Button>
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] pt-10">
                <div className="flex flex-col space-y-6">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={(e) => handleLinkClick(e, route.href)}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground text-center"
                    >
                      {route.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
