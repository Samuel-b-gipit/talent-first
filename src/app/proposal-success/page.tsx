import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, MessageSquare, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProposalSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-20 max-w-2xl">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Proposal Sent Successfully!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your proposal has been delivered to the talent. Here's what happens
            next:
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                1. Talent Reviews Your Proposal
              </CardTitle>
              <CardDescription>
                The talent will receive a notification and can view your
                detailed proposal, including your message, budget, and
                opportunity details.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                2. Response & Communication
              </CardTitle>
              <CardDescription>
                If interested, they'll respond to your proposal. You'll be
                notified via email and can continue the conversation directly
                through TalentFirst.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </div>
                3. Move Forward Together
              </CardTitle>
              <CardDescription>
                Once you both agree on the terms, you can move forward with
                interviews, contracts, and start working together.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-muted/40 border-border/60">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-foreground">
              Tips for Better Response Rates:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • Personalize your message by mentioning specific skills from
                their profile
              </li>
              <li>
                • Be clear about the role, expectations, and what makes your
                opportunity unique
              </li>
              <li>
                • Offer competitive compensation that matches their stated rate
              </li>
              <li>• Follow up politely if you don't hear back within a week</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button asChild className="flex-1">
            <Link href="/employer/dashboard">
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/browse-talent">Send Another Proposal</Link>
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            You can track all your proposals and responses in your{" "}
            <Link
              href="/employer/dashboard"
              className="text-primary hover:underline"
            >
              employer dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
