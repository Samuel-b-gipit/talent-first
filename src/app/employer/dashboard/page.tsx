"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  MessageSquare,
  TrendingUp,
  Eye,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockCompany = {
  name: "TechCorp Solutions",
  logo: "/placeholder.svg?height=64&width=64",
  industry: "Technology",
  size: "50-200 employees",
  location: "San Francisco, CA",
  description:
    "Leading technology company focused on innovative software solutions.",
};

const mockStats = {
  profileViews: 1247,
  proposalsSent: 23,
  responseRate: 78,
  activeProposals: 8,
};

const mockProposals = [
  {
    id: "1",
    talent: {
      name: "Sarah Chen",
      title: "Senior Full-Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    position: "Senior React Developer",
    budget: "$120/hour",
    status: "pending",
    sentDate: "2024-01-15",
    message:
      "Hi Sarah, we're impressed by your React expertise and would love to discuss a senior developer role...",
  },
  {
    id: "2",
    talent: {
      name: "Marcus Johnson",
      title: "Product Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
    },
    position: "Lead Product Designer",
    budget: "$95/hour",
    status: "accepted",
    sentDate: "2024-01-12",
    message:
      "Hello Marcus, your portfolio is outstanding. We have an exciting lead designer opportunity...",
  },
  {
    id: "3",
    talent: {
      name: "Elena Rodriguez",
      title: "Marketing Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    position: "Growth Marketing Manager",
    budget: "$85/hour",
    status: "declined",
    sentDate: "2024-01-10",
    message:
      "Hi Elena, we're looking for a growth marketing expert to join our team...",
  },
];

const mockSavedTalent = [
  {
    id: "1",
    name: "David Kim",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    skills: ["AWS", "Docker", "Kubernetes"],
    rate: 110,
    rating: 4.9,
    availability: "Available",
  },
  {
    id: "2",
    name: "Lisa Wang",
    title: "Data Scientist",
    location: "Boston, MA",
    skills: ["Python", "ML", "SQL"],
    rate: 100,
    rating: 4.7,
    availability: "Available",
  },
];

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-secondary" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "accepted":
        return "default";
      case "declined":
        return "destructive";
      default:
        return "secondary";
    }
  };

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
                <Link href="/browse-talent">Browse Talent</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/employer/profile">Company Profile</Link>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockCompany.logo || "/placeholder.svg"} />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockCompany.logo || "/placeholder.svg"} />
              <AvatarFallback className="text-xl">TC</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {mockCompany.name}
              </h1>
              <p className="text-muted-foreground">
                {mockCompany.industry} • {mockCompany.size}
              </p>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="saved">Saved Talent</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Profile Views
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.profileViews.toLocaleString()}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Proposals Sent
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.proposalsSent}
                      </p>
                    </div>
                    <Send className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Response Rate
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.responseRate}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Active Proposals
                      </p>
                      <p className="text-2xl font-bold">
                        {mockStats.activeProposals}
                      </p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to help you find and hire talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col gap-2" asChild>
                    <Link href="/browse-talent">
                      <Users className="h-6 w-6" />
                      Browse Talent
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/employer/post-job">
                      <Building2 className="h-6 w-6" />
                      Post Job Opening
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    asChild
                  >
                    <Link href="/employer/profile">
                      <Building2 className="h-6 w-6" />
                      Update Company Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest proposals and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProposals.slice(0, 3).map((proposal) => (
                    <div
                      key={proposal.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={proposal.talent.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {proposal.talent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {proposal.talent.name}
                          </span>
                          <Badge
                            variant={getStatusColor(proposal.status) as any}
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Proposal for {proposal.position} • {proposal.budget}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(proposal.sentDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Proposals</h2>
              <Button asChild>
                <Link href="/browse-talent">Send New Proposal</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {mockProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={proposal.talent.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {proposal.talent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {proposal.talent.name}
                              </h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-secondary text-secondary" />
                                <span className="text-sm">
                                  {proposal.talent.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {proposal.talent.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(proposal.status)}
                            <Badge
                              variant={getStatusColor(proposal.status) as any}
                            >
                              {proposal.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium">Position</p>
                            <p className="text-sm text-muted-foreground">
                              {proposal.position}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Budget</p>
                            <p className="text-sm text-muted-foreground">
                              {proposal.budget}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Message</p>
                          <p className="text-sm text-muted-foreground">
                            {proposal.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Sent on{" "}
                            {new Date(proposal.sentDate).toLocaleDateString()}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link
                                href={`/profile/${proposal.talent.name
                                  .toLowerCase()
                                  .replace(" ", "-")}`}
                              >
                                View Profile
                              </Link>
                            </Button>
                            {proposal.status === "pending" && (
                              <Button size="sm" variant="outline">
                                Follow Up
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Talent Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Talent</h2>
              <Button asChild>
                <Link href="/browse-talent">Find More Talent</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSavedTalent.map((talent) => (
                <Card
                  key={talent.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={`/abstract-geometric-shapes.png?height=48&width=48&query=${talent.name} headshot`}
                        />
                        <AvatarFallback>
                          {talent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {talent.name}
                        </CardTitle>
                        <CardDescription>{talent.title}</CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="text-sm font-medium">
                            {talent.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {talent.location}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {talent.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-primary">
                            ${talent.rate}/hr
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {talent.availability}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/profile/${talent.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          Send Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Proposal Performance</CardTitle>
                  <CardDescription>
                    Your proposal success metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Sent</span>
                      <span className="font-medium">
                        {mockStats.proposalsSent}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Rate
                      </span>
                      <span className="font-medium text-green-500">
                        {mockStats.responseRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Acceptance Rate
                      </span>
                      <span className="font-medium text-primary">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Average Response Time
                      </span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Insights</CardTitle>
                  <CardDescription>
                    How talent discovers your company
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Profile Views
                      </span>
                      <span className="font-medium">
                        {mockStats.profileViews.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Search Appearances
                      </span>
                      <span className="font-medium">3,421</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Click-through Rate
                      </span>
                      <span className="font-medium text-primary">12.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Profile Completeness
                      </span>
                      <span className="font-medium text-secondary">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Tips to improve your hiring success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Improve response rates</p>
                      <p className="text-sm text-muted-foreground">
                        Personalize your proposals by mentioning specific skills
                        from talent profiles
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Building2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <p className="font-medium">
                        Complete your company profile
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Add company culture photos and detailed job descriptions
                        to attract top talent
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
