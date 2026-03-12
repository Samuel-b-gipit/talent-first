export const revalidate = 3600; // Re-generate at most once per hour

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Building2,
  Star,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export default async function HomePage() {
  let featuredTalent: Prisma.TalentProfileGetPayload<{
    include: { user: true };
  }>[] = [];
  try {
    featuredTalent = await prisma.talentProfile.findMany({
      take: 3,
      orderBy: { rating: "desc" },
      include: { user: true },
    });
  } catch (err) {
    console.error("Failed to load featured talent:", err);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 hero-grid overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto text-center max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary mb-8 animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            The reverse job board
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up tracking-tight">
            Where Top Talent Gets{" "}
            <span className="gradient-text">Discovered</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            Talented professionals showcase their skills and employers compete
            for their attention with personalized proposals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 animate-fade-in-up stagger-2">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link href="/create-profile">
                <Users className="mr-2 h-5 w-5" />
                I&apos;m Looking for Opportunities
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12"
              asChild
            >
              <Link href="/for-employers">
                <Building2 className="mr-2 h-5 w-5" />
                I&apos;m Hiring Talent
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up stagger-3">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 transition-colors group-focus-within:text-primary" />
              <Input
                placeholder="Search for developers, designers, marketers..."
                className="pl-14 pr-36 py-7 text-base rounded-2xl border-border/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] focus-visible:shadow-[0_2px_16px_rgba(79,70,229,0.1)]"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl">
                Search Talent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talent Preview */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Featured Professionals
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Talent
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Discover exceptional professionals ready for their next
              opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredTalent.map((talent, index) => (
              <Card
                key={talent.id}
                className={`card-hover cursor-pointer animate-fade-in-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {talent.user?.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {talent.title}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span className="text-sm font-semibold text-accent-foreground">
                        {talent.rating ?? "—"}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {talent.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {talent.experience} experience
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {talent.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {talent.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{talent.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/40">
                      <span className="font-bold text-primary text-lg">
                        ${talent.rate}/hr
                      </span>
                      <Button size="sm" asChild>
                        <Link href="/login">Send Proposal</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link href="/browse-talent">View All Talent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How TalentFirst Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A simple process that puts talent in control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/12 transition-colors duration-200 relative">
                <Users className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Create Your Profile
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Showcase your skills, experience, and what you&apos;re looking
                for in your next role.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent/8 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/12 transition-colors duration-200 relative">
                <Building2 className="h-7 w-7 text-accent" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Receive Proposals</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Employers browse profiles and send personalized proposals
                directly to you.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/12 transition-colors duration-200 relative">
                <Star className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Choose Your Next Role
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Review proposals, chat with employers, and select the
                opportunity that&apos;s right for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/40 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.25)]">
                  <span className="text-primary-foreground font-bold text-sm">
                    TF
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  TalentFirst
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The reverse job board where talent comes first.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">
                For Talent
              </h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/create-profile"
                    className="hover:text-foreground transition-colors"
                  >
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse-proposals"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Proposals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/talent-resources"
                    className="hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">
                For Employers
              </h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/browse-talent"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Talent
                  </Link>
                </li>
                <li>
                  <Link
                    href="/post-job"
                    className="hover:text-foreground transition-colors"
                  >
                    Post Opportunities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/employer-resources"
                    className="hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">
                Company
              </h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-10 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2026 TalentFirst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
