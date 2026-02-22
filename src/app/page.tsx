import { Navbar } from "@/components/Navbar";
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
import { Search, Users, Building2, Star, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const featuredTalent = await prisma.talentProfile.findMany({
    take: 3,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Where Top Talent Gets{" "}
            <span className="text-primary">Discovered</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            The reverse job board where talented professionals showcase their
            skills and employers compete for their attention with personalized
            proposals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/create-profile">
                <Users className="mr-2 h-5 w-5" />
                I'm Looking for Opportunities
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
              asChild
            >
              <Link href="/for-employers">
                <Building2 className="mr-2 h-5 w-5" />
                I'm Hiring Talent
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for developers, designers, marketers..."
                className="pl-12 py-6 text-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search Talent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talent Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Featured Talent
            </h2>
            <p className="text-muted-foreground text-lg">
              Discover exceptional professionals ready for their next
              opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredTalent.map((talent) => (
              <Card
                key={talent.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{talent.name}</CardTitle>
                      <CardDescription className="text-base">
                        {talent.title}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-medium">
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
                    <div className="flex flex-wrap gap-2">
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
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-semibold text-primary">
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

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/browse-talent">View All Talent</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How TalentFirst Works
            </h2>
            <p className="text-muted-foreground text-lg">
              A simple process that puts talent in control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                1. Create Your Profile
              </h3>
              <p className="text-muted-foreground">
                Showcase your skills, experience, and what you're looking for in
                your next role.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                2. Receive Proposals
              </h3>
              <p className="text-muted-foreground">
                Employers browse profiles and send personalized proposals
                directly to you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                3. Choose Your Next Role
              </h3>
              <p className="text-muted-foreground">
                Review proposals, chat with employers, and select the
                opportunity that's right for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    TF
                  </span>
                </div>
                <span className="text-xl font-bold">TalentFirst</span>
              </div>
              <p className="text-muted-foreground">
                The reverse job board where talent comes first.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Talent</h4>
              <ul className="space-y-2 text-muted-foreground">
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
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-muted-foreground">
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
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
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

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TalentFirst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
