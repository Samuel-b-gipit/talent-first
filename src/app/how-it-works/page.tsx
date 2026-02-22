import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Building2,
  Star,
  Search,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
            How TalentFirst Works
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            A revolutionary approach to hiring that puts talented professionals
            in control. No more endless applications—let opportunities come to
            you.
          </p>
        </div>
      </section>

      {/* For Talent Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Users className="h-5 w-5" />
              <span className="font-semibold">For Talent</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get Discovered by Top Employers
            </h2>
            <p className="text-muted-foreground text-lg">
              Create your profile once and let opportunities come to you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Create Your Profile</CardTitle>
                <CardDescription>
                  Build a comprehensive profile showcasing your skills,
                  experience, and career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Add your work experience and portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>List your skills and expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Set your availability and preferences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>2. Get Discovered</CardTitle>
                <CardDescription>
                  Employers search for talent and find your profile based on
                  their needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Your profile appears in relevant searches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Employers review your experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Get matched with the right opportunities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Review Proposals</CardTitle>
                <CardDescription>
                  Receive personalized job proposals directly from interested
                  employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Get detailed job descriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>See compensation and benefits upfront</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Choose the opportunities you want</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/create-profile">
                Create Your Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
              <Building2 className="h-5 w-5" />
              <span className="font-semibold">For Employers</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Find and Hire Top Talent Faster
            </h2>
            <p className="text-muted-foreground text-lg">
              Access a curated pool of qualified professionals actively seeking
              opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Search Talent</CardTitle>
                <CardDescription>
                  Browse profiles of qualified professionals with the skills you
                  need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Filter by skills, experience, and location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>View detailed profiles and portfolios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>See availability and preferences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>2. Send Proposals</CardTitle>
                <CardDescription>
                  Reach out directly with personalized job proposals to
                  candidates you like
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Craft compelling job offers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Include compensation and benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Stand out from other employers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Hire Great Talent</CardTitle>
                <CardDescription>
                  Connect with interested candidates and make your next great
                  hire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Chat with interested candidates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Schedule interviews quickly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Close deals faster</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/for-employers">
                Start Hiring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose TalentFirst?
            </h2>
            <p className="text-muted-foreground text-lg">
              A better way to connect talent with opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  No More Cold Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Talent doesn't waste time applying to jobs. Employers come to
                  them with real opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Quality Over Quantity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Employers send targeted proposals to qualified candidates,
                  leading to better matches.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Transparent Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See compensation, benefits, and job details upfront. No
                  surprises or hidden information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Faster Hiring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Direct communication between employers and talent speeds up
                  the entire hiring process.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join TalentFirst today and experience a better way to find
            opportunities or hire talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create-profile">
                <Users className="mr-2 h-5 w-5" />
                I'm Looking for Work
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/for-employers">
                <Building2 className="mr-2 h-5 w-5" />
                I'm Hiring
              </Link>
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
                    href="/proposals"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Proposals
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
                    href="/for-employers"
                    className="hover:text-foreground transition-colors"
                  >
                    Post Opportunities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 TalentFirst. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
