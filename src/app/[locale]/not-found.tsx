import Link from 'next/link';
import { Palette } from '@/components/icons';
export default function NotFound() { return <section className="page-width page-intro"><p className="eyebrow">404 · MAIMIARTE</p><h1>Uma página por descobrir.</h1><p>This page could not be found.</p><Link className="text-link" href="/pt">Voltar ao início / Back to home<Palette/></Link></section>; }
