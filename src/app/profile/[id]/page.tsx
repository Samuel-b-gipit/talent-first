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

// Mock data - in a real app, this would come from your database
const mockProfile = {
  id: "1",
  name: "Sarah Chen",
  title: "Senior Full-Stack Developer",
  bio: "Passionate full-stack developer with 6+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture. I love solving complex problems and creating user-friendly solutions that make a real impact.",
  location: "San Francisco, CA",
  hourlyRate: 120,
  availability: "Full-time",
  experience: "6-8 years",
  rating: 4.9,
  reviewCount: 23,
  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "AWS",
    "PostgreSQL",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "Next.js",
    "Express.js",
    "MongoDB",
  ],
  openToRemote: true,
  openToContract: true,
  portfolio: "https://sarahchen.dev",
  linkedin: "https://linkedin.com/in/sarahchen",
  github: "https://github.com/sarahchen",
  website: "https://sarahchen.dev",
  joinedDate: "March 2024",
  responseTime: "Usually responds within 2 hours",
  completedProjects: 15,
  successRate: 98,
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = mockProfile; // In real app: fetch profile by params.id

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
                <Link href="/browse-talent">Browse More Talent</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/professional-headshot.png" />
                    <AvatarFallback className="text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground">
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
                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                            {profile.rating} ({profile.reviewCount} reviews)
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${profile.hourlyRate}/hour
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {profile.availability}
                        </div>
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
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Remote Work</span>
                    <Badge
                      variant={profile.openToRemote ? "default" : "secondary"}
                    >
                      {profile.openToRemote ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium">Contract Work</span>
                    <Badge
                      variant={profile.openToContract ? "default" : "secondary"}
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
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Contact {profile.name.split(" ")[0]}</CardTitle>
                <CardDescription>Send a proposal or message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Proposal
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">{profile.joinedDate}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-medium text-sm">
                    {profile.responseTime}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Projects completed
                  </span>
                  <span className="font-medium">
                    {profile.completedProjects}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success rate</span>
                  <span className="font-medium text-primary">
                    {profile.successRate}%
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
                {[
                  {
                    name: "Marcus Johnson",
                    title: "Product Designer",
                    rate: 95,
                  },
                  {
                    name: "Elena Rodriguez",
                    title: "Marketing Strategist",
                    rate: 85,
                  },
                ].map((talent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="font-medium text-sm">{talent.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {talent.title}
                      </div>
                    </div>
                    <div className="text-sm font-medium">${talent.rate}/hr</div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
