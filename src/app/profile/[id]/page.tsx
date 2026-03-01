import { Navbar } from "@/components/Navbar";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Github,
  Linkedin,
  Globe,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [profile, currentUser] = await Promise.all([
    prisma.talentProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
      include: { user: true },
    }),
    verifySession(),
  ]);

  if (!profile) notFound();

  const isEmployer = currentUser?.role === "EMPLOYER";
  const isOwnProfile = currentUser?.id === profile.userId;

  const similarTalent = await prisma.talentProfile.findMany({
    where: {
      id: { not: profile.id },
      skills: { hasSome: profile.skills.slice(0, 2) },
    },
    take: 2,
    select: { id: true, name: true, title: true, rate: true },
  });

  const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/10">
                    <AvatarImage src={profile.avatarUrl ?? ""} />
                    <AvatarFallback className="text-2xl bg-primary/5 text-primary font-bold">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">
                          {profile.name}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-2">
                          {profile.title}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {profile.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {profile.experience} experience
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {profile.rating} ({profile.reviewCount} reviews)
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${profile.rate}/hour
                        </div>
                        <Badge variant="default" className="text-xs">
                          {profile.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio}
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium">Remote Work</span>
                    <Badge
                      variant={profile.openToRemote ? "success" : "secondary"}
                    >
                      {profile.openToRemote ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium">Contract Work</span>
                    <Badge
                      variant={profile.openToContract ? "success" : "secondary"}
                    >
                      {profile.openToContract ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links & Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.portfolio && (
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-4 border border-border/60 rounded-xl hover:bg-muted/50 transition-all duration-200 hover:-translate-y-px"
                    >
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Portfolio</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-4 border border-border/60 rounded-xl hover:bg-muted/50 transition-all duration-200 hover:-translate-y-px"
                    >
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">LinkedIn</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-4 border border-border/60 rounded-xl hover:bg-muted/50 transition-all duration-200 hover:-translate-y-px"
                    >
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">GitHub</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-4 border border-border/60 rounded-xl hover:bg-muted/50 transition-all duration-200 hover:-translate-y-px"
                    >
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Website</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card — only visible to employers viewing someone else's profile */}
            {isEmployer && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact {profile.name.split(" ")[0]}</CardTitle>
                  <CardDescription>Send a proposal or message</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/send-proposal/${profile.userId}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Proposal
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/send-proposal/${profile.userId}`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Own profile edit card — visible to the talent who owns this profile */}
            {isOwnProfile && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>
                    Manage how employers see you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/create-profile">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">{joinedDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-medium text-sm">
                    Usually within 24 hours
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews</span>
                  <span className="font-medium">{profile.reviewCount}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium text-primary">
                    {profile.rating ?? "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Talent */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Talent</CardTitle>
                <CardDescription>
                  Other professionals you might like
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {similarTalent.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No similar talent found.
                  </p>
                ) : (
                  similarTalent.map((talent) => (
                    <Link
                      key={talent.id}
                      href={`/profile/${talent.id}`}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-sm">{talent.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {talent.title}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${talent.rate}/hr
                      </div>
                    </Link>
                  ))
                )}
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/browse-talent">View More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
