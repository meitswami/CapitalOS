import Link from 'next/link';
import { ArrowRight, BarChart3, GitBranch, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PORTALS = [
  { name: 'Company', href: '/company', description: 'Manage profile, documents, and capital readiness' },
  { name: 'Analyst', href: '/analyst', description: 'Score CHS, review data sheets, assess risk' },
  { name: 'Lender', href: '/lender', description: 'Evaluate debt opportunities and pipeline' },
  { name: 'Investor', href: '/investor', description: 'Review equity and startup deal flow' },
  { name: 'Committee', href: '/committee', description: 'Credit committee reviews and decisions' },
  { name: 'Admin', href: '/admin', description: 'Platform administration and configuration' },
];

const PILLARS = [
  'Strategic & Business',
  'Financial',
  'Liquidity',
  'Management',
  'Operational',
  'Industry',
  'ESG',
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">CapitalOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Capital Intelligence Operating System
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Assess capital readiness, route funding, and monitor portfolio health using the
            proprietary Capital Health Score framework — explainable, auditable, and
            industry-specific.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Launch Platform <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: 'Explainable CHS Scoring',
              desc: '7-pillar framework with industry-specific weights, manual overrides, and full audit trail.',
            },
            {
              icon: GitBranch,
              title: 'Capital Routing',
              desc: 'Debt, Equity, and Startup rails with intelligent eligibility and optimal route recommendations.',
            },
            {
              icon: Zap,
              title: 'AI-Assisted, Human-Controlled',
              desc: 'AI suggests qualitative scores with confidence and reasoning. Analysts always have final say.',
            },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-accent mb-2" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">CHS Framework — 7 Pillars</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Industry-specific weights across 23 industries and 300+ sub-sectors
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-20">
          {PILLARS.map((pillar) => (
            <span
              key={pillar}
              className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
            >
              {pillar}
            </span>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-10">Portals</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTALS.map((portal) => (
            <Link key={portal.name} href={portal.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle>{portal.name} Portal</CardTitle>
                  <CardDescription>{portal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-accent text-sm font-medium flex items-center gap-1">
                    Enter portal <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        CapitalOS v1.0 — Capital Intelligence Operating System
      </footer>
    </div>
  );
}
