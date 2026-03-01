import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function ForEmployersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 px-4 hero-grid overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto text-center max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-sm font-medium text-primary mb-8 animate-fade-in">
            <Building2 className="h-3.5 w-3.5" />
            For Employers
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up tracking-tight">
            Find Top Talent Who Want to{" "}
            <span className="gradient-text">Work With You</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            Skip the endless resume screening. Browse profiles of pre-qualified
            professionals and send personalized proposals to the talent you want
            to hire.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14 animate-fade-in-up stagger-2">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link href="/browse-talent">
                <Users className="mr-2 h-5 w-5" />
                Browse Talent Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12"
              asChild
            >
              <Link href="/signup">
                <Building2 className="mr-2 h-5 w-5" />
                Create Company Profile
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              No job posting required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Direct contact with talent
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              Pre-screened professionals
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How TalentFirst Works for Employers
            </h2>
            <p className="text-muted-foreground text-lg">
              A streamlined process that puts you in direct contact with top
              talent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up stagger-1">
              <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Browse Talent Profiles
              </h3>
              <p className="text-muted-foreground">
                Search through detailed profiles of pre-qualified professionals
                with verified skills and experience.
              </p>
            </div>

            <div className="text-center animate-fade-in-up stagger-2">
              <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Send Personalized Proposals
              </h3>
              <p className="text-muted-foreground">
                Reach out directly with customized proposals that showcase your
                opportunity and company culture.
              </p>
            </div>

            <div className="text-center animate-fade-in-up stagger-3">
              <div className="relative w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hire the Best Fit</h3>
              <p className="text-muted-foreground">
                Connect with interested candidates, conduct interviews, and hire
                the perfect addition to your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Benefits
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Employers Choose TalentFirst
            </h2>
            <p className="text-muted-foreground text-lg">
              Get better results with less effort
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Higher Response Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Talent on TalentFirst are actively looking for opportunities,
                  leading to 3x higher response rates than traditional job
                  boards.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Pre-Qualified Talent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every profile is verified and includes detailed information
                  about skills, experience, and work preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Direct Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Skip the middleman and communicate directly with talent to
                  build relationships and assess fit.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle>No Job Posting Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find talent without writing job descriptions or waiting for
                  applications. Browse and reach out directly.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <CardTitle>Quality Over Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Focus on a curated pool of high-quality professionals instead
                  of sifting through hundreds of resumes.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-2">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Company Branding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Showcase your company culture and values to attract talent who
                  align with your mission and values.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              See how companies are finding great talent on TalentFirst
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">StartupXYZ</h3>
                    <p className="text-sm text-muted-foreground">
                      Series A Startup
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "We hired 3 amazing developers in just 2 weeks. The quality of
                  talent on TalentFirst is incredible, and the direct
                  communication made the process so much smoother."
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Hired 3 developers</Badge>
                  <Badge variant="outline">2 weeks</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GrowthCorp</h3>
                    <p className="text-sm text-muted-foreground">
                      Scale-up Company
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "TalentFirst helped us find a senior designer who perfectly
                  matched our culture and technical needs. The proposal system
                  made it easy to showcase our opportunity."
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Senior Designer</Badge>
                  <Badge variant="outline">Perfect fit</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Ready to Find Your Next Great Hire?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Join hundreds of companies already using TalentFirst to build
            amazing teams
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link href="/browse-talent">Start Browsing Talent</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 h-12"
              asChild
            >
              <Link href="/signup">Create Free Account</Link>
            </Button>
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
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                For Employers
              </h4>
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
                    href="/for-employers"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-foreground transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                For Talent
              </h4>
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
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-foreground transition-colors"
                  >
                    Join Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
                Company
              </h4>
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
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 TalentFirst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
