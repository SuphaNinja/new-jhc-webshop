import React from 'react'
import Container from '../components/Container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertTriangle, Building, CheckCircle, ChevronLeft, Shield } from 'lucide-react'
import Image from 'next/image'

export default function WarrantyPage() {
  return (
    <Container>
      <div className='mt-16 items-center flex gap-6'>
        <Button asChild variant="outline" size="icon">
          <Link href={`/`}>
            <ChevronLeft className='size-4' />
          </Link>
        </Button>
        <p>Tillbaka till hemsidan</p>
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">KATEPAL TOTALGARANTI TG</h1>
          <p className="text-xl text-muted-foreground">GARANTI FÖR TÄTT TAK</p>
        </header>

        <section className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 text-primary" />
            Garantiöversikt
          </h2>
          <p className="mb-4">Vi på JHC Plåt & Bygg AB lämnar 15 års garanti på våra tak. Totalgarantin gäller för både nybyggnation och renovering – tillsammans med Katepal är vi auktoriserad entreprenörer.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>15 års garanti på våra tak</li>
            <li>Gäller för både nybyggnation och renovering</li>
            <li>Totalgaranti tillsammans med Katepal som auktoriserade entreprenör</li>
            <li>10 års garanti för utfört arbete</li>
            <li>15 års materialgaranti</li>
            <li>Garantin följer fastigheten även vid ägarbyte</li>
          </ul>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Building className="mr-2 text-primary" />
            Entreprenörens ansvar
          </h2>
          <p className="mb-4">Entreprenören ansvarar för att tätskiktskonstruktionen uppfyller gällande normer och direktiv.</p>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <CheckCircle className="mr-2 text-primary" />
            Försäkringsinformation
          </h2>
          <p className="mb-4">Våra tak och vårt arbete är försäkrade av försäkringsbolaget LokalTapiola.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Försäkring mot läckageskador på grund av materialfel i levererade tätskikt</li>
            <li>Gäller person- och egendomsskador i objektet (inredning, maskinpark, utrustning, varor, lösöre)</li>
            <li>Täcker skador till följd av verksamhetsavbrott på grund av läckage</li>
          </ul>
        </section>

        <section className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-primary" />
            Ersättningsvillkor
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maximalt ersättningsbelopp vid skadefall: 3 miljoner euro</li>
            <li>Högsta totala ersättning under en försäkringsperiod (1 år): 6 miljoner euro</li>
            <li>Självrisk: 10% av skadebeloppet (minst 2 000 euro)</li>
          </ul>
        </section>

        <footer className="text-sm text-muted-foreground">
          <p className="mb-2">Ansvarsutfästelsen gäller de tio första åren för utfört arbete även om takentreprenören går i konkurs och/eller likviderar företaget.</p>
        </footer>
      </div>

      <Image alt="" src={"https://i.gyazo.com/c1409a7b6394565eaaebf1540161c945.png"} width={600} height={400} sizes="100vw" className='w-full h-full' />
    </Container>
  )
}
