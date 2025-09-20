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
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  TrendingUp,
  Users,
  Target,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Zap,
  Heart,
  BookmarkPlus,
} from "lucide-react";
import Link from "next/link";

// Mock recommendation data
const mockRecommendations = {
  forYou: [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior Full-Stack Developer",
      location: "San Francisco, CA",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      rate: 120,
      rating: 4.9,
      reviewCount: 23,
      matchScore: 95,
      matchReasons: [
        "Skills match your requirements",
        "Located in your preferred area",
        "Available for full-time work",
      ],
      bio: "Passionate full-stack developer with 6+ years of experience building scalable web applications.",
      avatar: "/professional-headshot.png",
      availability: "Available",
      responseTime: "2 hours",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      title: "Product Designer",
      location: "New York, NY",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      rate: 95,
      rating: 5.0,
      reviewCount: 18,
      matchScore: 88,
      matchReasons: [
        "High rating matches your standards",
        "Experience in your industry",
        "Strong portfolio",
      ],
      bio: "Creative product designer focused on user-centered design and innovative solutions.",
      avatar: "/professional-headshot.png",
      availability: "Available",
      responseTime: "4 hours",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      title: "Marketing Strategist",
      location: "Austin, TX",
      skills: ["Growth Marketing", "Analytics", "Content Strategy", "SEO"],
      rate: 85,
      rating: 4.8,
      reviewCount: 31,
      matchScore: 82,
      matchReasons: [
        "Budget fits your range",
        "Growth marketing expertise",
        "Fast response time",
      ],
      bio: "Data-driven marketing strategist with expertise in growth and digital marketing.",
      avatar: "/professional-headshot.png",
      availability: "Available",
      responseTime: "1 hour",
    },
  ],
  trending: [
    {
      id: "4",
      name: "David Kim",
      title: "DevOps Engineer",
      location: "Seattle, WA",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
      rate: 110,
      rating: 4.9,
      reviewCount: 15,
      trendingReason: "High demand in cloud infrastructure",
      bio: "DevOps engineer specializing in cloud infrastructure and automation.",
      avatar: "/professional-headshot.png",
      availability: "Available",
    },
    {
      id: "5",
      name: "Lisa Wang",
      title: "Data Scientist",
      location: "Boston, MA",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      rate: 100,
      rating: 4.7,
      reviewCount: 22,
      trendingReason: "AI/ML skills in high demand",
      bio: "Data scientist with expertise in machine learning and predictive analytics.",
      avatar: "/professional-headshot.png",
      availability: "Available",
    },
  ],
  similar: [
    {
      id: "6",
      name: "Alex Thompson",
      title: "Mobile Developer",
      location: "Los Angeles, CA",
      skills: ["React Native", "Swift", "Kotlin", "Flutter"],
      rate: 105,
      rating: 4.8,
      reviewCount: 19,
      similarTo: "Companies like yours often hire",
      bio: "Mobile developer creating beautiful and performant iOS and Android applications.",
      avatar: "/professional-headshot.png",
      availability: "Available",
    },
  ],
};

const mockInsights = {
  marketTrends: [
    {
      skill: "React",
      demand: 95,
      avgRate: 115,
      growth: "+12%",
    },
    {
      skill: "Python",
      demand: 88,
      avgRate: 105,
      growth: "+8%",
    },
    {
      skill: "DevOps",
      demand: 82,
      avgRate: 125,
      growth: "+15%",
    },
    {
      skill: "UI/UX Design",
      demand: 78,
      avgRate: 95,
      growth: "+6%",
    },
  ],
  yourActivity: {
    profileViews: 1247,
    proposalsSent: 23,
    responseRate: 78,
    avgResponseTime: "2.3 days",
  },
};

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [savedTalent, setSavedTalent] = useState<string[]>([]);

  const saveTalent = (talentId: string) => {
    setSavedTalent((prev) => [...prev, talentId]);
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
                <Link href="/employer/dashboard">Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/search">Advanced Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Smart Recommendations
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            AI-powered talent recommendations based on your preferences and
            hiring patterns
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="for-you"
                  className="flex items-center gap-2"
                >
                  <Target className="h-4 w-4" />
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="similar"
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Similar Hires
                </TabsTrigger>
              </TabsList>

              {/* For You Tab */}
              <TabsContent value="for-you" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Personalized for TechCorp Solutions
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/search">Refine Preferences</Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockRecommendations.forYou.map((talent) => (
                    <Card
                      key={talent.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={talent.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback className="text-xl">
                              {talent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {talent.name}
                                </h3>
                                <p className="text-muted-foreground">
                                  {talent.title}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                                  <span className="text-sm font-medium">
                                    {talent.rating}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    ({talent.reviewCount})
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2 mb-2">
                                  <Zap className="h-4 w-4 text-primary" />
                                  <span className="font-semibold text-primary">
                                    {talent.matchScore}% match
                                  </span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {talent.availability}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {talent.bio}
                            </p>

                            <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{talent.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>${talent.rate}/hour</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Responds in {talent.responseTime}</span>
                              </div>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm font-medium mb-2">
                                Why this is a great match:
                              </p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {talent.matchReasons.map((reason, index) => (
                                  <li
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
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

                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1" asChild>
                                <Link href={`/profile/${talent.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/send-proposal/${talent.id}`}>
                                  Send Proposal
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => saveTalent(talent.id)}
                                disabled={savedTalent.includes(talent.id)}
                              >
                                <BookmarkPlus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Trending Tab */}
              <TabsContent value="trending" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Trending Talent</h2>
                  <p className="text-sm text-muted-foreground">
                    High-demand professionals this week
                  </p>
                </div>

                <div className="space-y-4">
                  {mockRecommendations.trending.map((talent) => (
                    <Card
                      key={talent.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={talent.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {talent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">{talent.name}</h3>
                                <p className="text-muted-foreground">
                                  {talent.title}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-secondary" />
                                <Badge variant="secondary" className="text-xs">
                                  Trending
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {talent.bio}
                            </p>

                            <div className="flex items-center gap-4 mb-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-secondary text-secondary" />
                                <span>
                                  {talent.rating} ({talent.reviewCount})
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <span>${talent.rate}/hr</span>
                              </div>
                            </div>

                            <p className="text-sm text-primary mb-3">
                              🔥 {talent.trendingReason}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
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

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/profile/${talent.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/send-proposal/${talent.id}`}>
                                  Send Proposal
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Similar Hires Tab */}
              <TabsContent value="similar" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Similar to Your Previous Hires
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Based on companies like yours
                  </p>
                </div>

                <div className="space-y-4">
                  {mockRecommendations.similar.map((talent) => (
                    <Card
                      key={talent.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={talent.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {talent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">{talent.name}</h3>
                                <p className="text-muted-foreground">
                                  {talent.title}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                Similar Hire
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3">
                              {talent.bio}
                            </p>

                            <p className="text-sm text-primary mb-3">
                              👥 {talent.similarTo}
                            </p>

                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link href={`/profile/${talent.id}`}>
                                  View Profile
                                </Link>
                              </Button>
                              <Button size="sm" asChild>
                                <Link href={`/send-proposal/${talent.id}`}>
                                  Send Proposal
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Insights
                </CardTitle>
                <CardDescription>Current demand and rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockInsights.marketTrends.map((trend, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{trend.skill}</span>
                      <Badge variant="outline" className="text-xs">
                        {trend.growth}
                      </Badge>
                    </div>
                    <Progress value={trend.demand} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Demand: {trend.demand}%</span>
                      <span>Avg: ${trend.avgRate}/hr</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
                <CardDescription>How you're performing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Profile Views
                  </span>
                  <span className="font-medium">
                    {mockInsights.yourActivity.profileViews.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Proposals Sent
                  </span>
                  <span className="font-medium">
                    {mockInsights.yourActivity.proposalsSent}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Response Rate
                  </span>
                  <span className="font-medium text-green-500">
                    {mockInsights.yourActivity.responseRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Avg Response Time
                  </span>
                  <span className="font-medium">
                    {mockInsights.yourActivity.avgResponseTime}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/search">
                    <Target className="mr-2 h-4 w-4" />
                    Advanced Search
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/employer/dashboard">
                    <Users className="mr-2 h-4 w-4" />
                    View Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/employer/profile">
                    <Heart className="mr-2 h-4 w-4" />
                    Update Preferences
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
