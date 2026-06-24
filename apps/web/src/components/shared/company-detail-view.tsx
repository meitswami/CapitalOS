'use client';

import type { Company } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/shared/status-badge';

function formatCurrency(value?: number) {
  if (!value) return '—';
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(1)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
  return `₹${value.toLocaleString('en-IN')}`;
}

export function CompanyDetailView({ company }: { company: Company }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{company.legalName}</h2>
          {company.tradeName && (
            <p className="text-muted-foreground mt-1">Trade name: {company.tradeName}</p>
          )}
        </div>
        <StatusBadge status={company.status} />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Industry</CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-medium">
            {company.industry?.name || '—'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sub-sector</CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-medium">
            {company.subSector?.name || '—'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Employees</CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-medium">
            {company.employeeCount?.toLocaleString() || '—'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annual Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-sm font-medium">
            {formatCurrency(company.annualRevenue)}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
          <TabsTrigger value="promoters">Promoters</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">CIN:</span> <span className="ml-2 font-mono">{company.cin || '—'}</span></div>
              <div><span className="text-muted-foreground">PAN:</span> <span className="ml-2 font-mono">{company.pan || '—'}</span></div>
              <div><span className="text-muted-foreground">GSTIN:</span> <span className="ml-2 font-mono">{company.gstin || '—'}</span></div>
              <div><span className="text-muted-foreground">Organization:</span> <span className="ml-2">{company.organization?.name || '—'}</span></div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Registered Address:</span>
                <span className="ml-2">{company.registeredAddress || '—'}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6 space-y-4 text-sm">
              {company.profile ? (
                <>
                  <div>
                    <div className="text-muted-foreground mb-1">Business Description</div>
                    <p>{company.profile.businessDescription || '—'}</p>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Products & Services</div>
                    <p>{company.profile.productsServices || '—'}</p>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Target Market</div>
                    <p>{company.profile.targetMarket || '—'}</p>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Competitive Position</div>
                    <p>{company.profile.competitivePosition || '—'}</p>
                  </div>
                  {company.profile.website && (
                    <div>
                      <div className="text-muted-foreground mb-1">Website</div>
                      <a href={company.profile.website} className="text-accent hover:underline" target="_blank" rel="noreferrer">
                        {company.profile.website}
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No business profile on file.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promoters">
          <Card>
            <CardContent className="pt-6">
              {company.promoters && company.promoters.length > 0 ? (
                <div className="space-y-3">
                  {company.promoters.map((p) => (
                    <div key={p.id} className="flex justify-between items-center border-b border-border pb-3 last:border-0">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {p.experienceYears ? `${p.experienceYears} years experience` : '—'}
                          {p.isKeyPromoter && ' · Key promoter'}
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <div>{p.shareholdingPct ? `${p.shareholdingPct}%` : '—'}</div>
                        {p.pan && <div className="text-muted-foreground font-mono text-xs">{p.pan}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No promoters listed.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardContent className="pt-6">
              {company.contacts && company.contacts.length > 0 ? (
                <div className="space-y-3">
                  {company.contacts.map((c) => (
                    <div key={c.id} className="border-b border-border pb-3 last:border-0">
                      <div className="font-medium">
                        {c.name}
                        {c.isPrimary && <span className="ml-2 text-xs text-accent">Primary</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">{c.designation || '—'}</div>
                      <div className="text-sm mt-1">{c.email} {c.phone && `· ${c.phone}`}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No contacts listed.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
