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
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  TF
                </span>
              </div>
              <span className="text-xl font-bold text-foreground">
                TalentFirst
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/employer/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/browse-talent">Browse More Talent</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Proposal Sent Successfully!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your proposal has been delivered to the talent. Here's what happens
            next:
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                1. Talent Reviews Your Proposal
              </CardTitle>
              <CardDescription>
                The talent will receive a notification and can view your
                detailed proposal, including your message, budget, and
                opportunity details.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                2. Response & Communication
              </CardTitle>
              <CardDescription>
                If interested, they'll respond to your proposal. You'll be
                notified via email and can continue the conversation directly
                through TalentFirst.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                3. Move Forward Together
              </CardTitle>
              <CardDescription>
                Once you both agree on the terms, you can move forward with
                interviews, contracts, and start working together.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">
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

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild className="flex-1">
            <Link href="/employer/dashboard">
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
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
