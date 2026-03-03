"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast, Toaster } from "sonner";
import {
  recommendationsApi,
  analyticsApi,
  savedTalentsApi,
  type TalentProfile,
  type MarketInsight,
  type EmployerStats,
} from "@/lib/api";
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
  Heart,
  BookmarkPlus,
} from "lucide-react";
import Link from "next/link";

export default function RecommendationsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("for-you");
  const [savedTalentIds, setSavedTalentIds] = useState<string[]>([]);

  const [forYou, setForYou] = useState<TalentProfile[]>([]);
  const [trending, setTrending] = useState<TalentProfile[]>([]);
  const [similar, setSimilar] = useState<TalentProfile[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [employerStats, setEmployerStats] = useState<EmployerStats | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const employerId = user.id;
    setIsLoading(true);
    Promise.all([
      recommendationsApi.getForYou(employerId),
      recommendationsApi.getTrending(),
      recommendationsApi.getSimilar(employerId),
      analyticsApi.getMarketInsights(),
      analyticsApi.getEmployerStats(employerId),
    ]).then(([fyRes, tRes, simRes, miRes, statsRes]) => {
      if (fyRes.data) setForYou(fyRes.data);
      if (tRes.data) setTrending(tRes.data);
      if (simRes.data) setSimilar(simRes.data);
      if (miRes.data) setMarketInsights(miRes.data.slice(0, 4));
      if (statsRes.data) setEmployerStats(statsRes.data);
      setIsLoading(false);
    });
  }, [user]);

  const saveTalent = async (talentProfileId: string, talentName?: string) => {
    setSavedTalentIds((prev) => [...prev, talentProfileId]);
    const { error } = await savedTalentsApi.save(user!.id, talentProfileId);
    if (error) {
      setSavedTalentIds((prev) => prev.filter((id) => id !== talentProfileId));
      if (error.includes("already saved")) {
        toast.info("Already saved", {
          description: `${talentName ?? "This talent"} is already in your saved list.`,
        });
      } else {
        toast.error("Failed to save talent", { description: error });
      }
    } else {
      toast.success("Talent saved!", {
        description: `${talentName ?? "Talent"} has been added to your saved list.`,
      });
    }
  };

  // Normalise insight count to a 0–100 progress value
  const maxCount = marketInsights.reduce((m, i) => Math.max(m, i.count), 1);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              AI-Powered
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Smart Recommendations
          </h1>
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
                    Personalized Matches
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/search">Refine Preferences</Link>
                  </Button>
                </div>

                {isLoading ? (
                  <p className="text-muted-foreground">
                    Loading recommendations…
                  </p>
                ) : forYou.length === 0 ? (
                  <p className="text-muted-foreground">
                    No recommendations yet. Browse talent to get started.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {forYou.map((talent) => (
                      <Card key={talent.id} className="card-hover">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="/professional-headshot.png" />
                              <AvatarFallback className="text-xl">
                                {(talent.user?.name ?? "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {talent.user?.name}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {talent.title}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-medium">
                                      {talent.rating?.toFixed(1) ?? "N/A"}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      ({talent.reviewCount})
                                    </span>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {talent.availability}
                                </Badge>
                              </div>

                              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {talent.bio}
                              </p>

                              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{talent.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                                  <span>${talent.rate}/hour</span>
                                </div>
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
                                  onClick={() =>
                                    saveTalent(
                                      talent.id,
                                      talent.user?.name ?? "",
                                    )
                                  }
                                  disabled={savedTalentIds.includes(talent.id)}
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
                )}
              </TabsContent>

              {/* Trending Tab */}
              <TabsContent value="trending" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Trending Talent</h2>
                  <p className="text-sm text-muted-foreground">
                    High-demand professionals this week
                  </p>
                </div>

                {isLoading ? (
                  <p className="text-muted-foreground">
                    Loading trending talent…
                  </p>
                ) : trending.length === 0 ? (
                  <p className="text-muted-foreground">
                    No trending talent found.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {trending.map((talent) => (
                      <Card key={talent.id} className="card-hover">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/professional-headshot.png" />
                              <AvatarFallback>
                                {(talent.user?.name ?? "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">
                                    {talent.user?.name}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {talent.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-secondary" />
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Trending
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {talent.bio}
                              </p>

                              <div className="flex items-center gap-4 mb-3 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  <span>
                                    {talent.rating?.toFixed(1) ?? "N/A"} (
                                    {talent.reviewCount})
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4 text-primary" />
                                  <span>${talent.rate}/hr</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{talent.location}</span>
                                </div>
                              </div>

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
                )}
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

                {isLoading ? (
                  <p className="text-muted-foreground">
                    Loading similar talent…
                  </p>
                ) : similar.length === 0 ? (
                  <p className="text-muted-foreground">
                    Save or contact talent to get similar hire recommendations.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {similar.map((talent) => (
                      <Card key={talent.id} className="card-hover">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src="/professional-headshot.png" />
                              <AvatarFallback>
                                {(talent.user?.name ?? "")
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">
                                    {talent.user?.name}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    {talent.title}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Similar Hire
                                </Badge>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {talent.bio}
                              </p>

                              <p className="text-sm text-primary mb-3">
                                👥 Skills overlap with your saved talent
                              </p>

                              <div className="flex items-center gap-4 mb-3 text-sm">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <span>{talent.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4 text-primary" />
                                  <span>${talent.rate}/hr</span>
                                </div>
                              </div>

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
                )}
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
                {marketInsights.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : (
                  marketInsights.map((insight, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {insight.skill}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {insight.count} talent{insight.count !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <Progress
                        value={Math.round((insight.count / maxCount) * 100)}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Demand: {Math.round((insight.count / maxCount) * 100)}
                          %
                        </span>
                        <span>Avg: ${Math.round(insight.avgRate)}/hr</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Your Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
                <CardDescription>How you're performing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {employerStats ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Proposals Sent
                      </span>
                      <span className="font-medium">{employerStats.sent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Accepted
                      </span>
                      <span className="font-medium">
                        {employerStats.accepted}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Response Rate
                      </span>
                      <span className="font-medium text-emerald-600">
                        {Math.round(employerStats.responseRate * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Avg Response Time
                      </span>
                      <span className="font-medium">
                        {employerStats.avgResponseTime != null
                          ? `${employerStats.avgResponseTime.toFixed(1)}h`
                          : "—"}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                )}
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
                  className="w-full justify-start"
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
                  className="w-full justify-start"
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
                  className="w-full justify-start"
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
