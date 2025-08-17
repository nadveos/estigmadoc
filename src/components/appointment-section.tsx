import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function AppointmentSection() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Agende una Consulta</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Dé el primer paso hacia su recuperación. Complete el formulario y nuestro equipo se pondrá en contacto con usted a la brevedad.
        </p>
      </div>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Formulario de Contacto</CardTitle>
          <CardDescription>Su salud es nuestra prioridad. Nos comunicaremos para coordinar una cita.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" placeholder="Ej: Juan Pérez" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="juan.perez@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" placeholder="11 2345 6789" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje (Opcional)</Label>
              <Textarea id="message" placeholder="Describa brevemente su consulta..." />
            </div>
            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Enviar Solicitud
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
