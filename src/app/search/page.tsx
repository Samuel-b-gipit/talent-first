"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  DollarSign,
  X,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Extended mock data with more search-friendly properties
const mockTalent = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "GraphQL"],
    experience: "6-8 years",
    experienceYears: 7,
    rate: 120,
    rating: 4.9,
    reviewCount: 23,
    availability: "Available",
    remote: true,
    contract: true,
    bio: "Passionate full-stack developer with 6+ years of experience building scalable web applications.",
    lastActive: "2024-01-15",
    responseTime: "2 hours",
    successRate: 98,
    languages: ["English", "Mandarin"],
    timezone: "PST",
    industries: ["Fintech", "E-commerce", "SaaS"],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Product Designer",
    location: "New York, NY",
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Adobe Creative Suite",
    ],
    experience: "7+ years",
    experienceYears: 8,
    rate: 95,
    rating: 5.0,
    reviewCount: 18,
    availability: "Available",
    remote: true,
    contract: false,
    bio: "Creative product designer focused on user-centered design and innovative solutions.",
    lastActive: "2024-01-14",
    responseTime: "4 hours",
    successRate: 100,
    languages: ["English", "Spanish"],
    timezone: "EST",
    industries: ["Healthcare", "Education", "Consumer Apps"],
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    title: "Marketing Strategist",
    location: "Austin, TX",
    skills: [
      "Growth Marketing",
      "Analytics",
      "Content Strategy",
      "SEO",
      "PPC",
      "Social Media",
    ],
    experience: "4+ years",
    experienceYears: 5,
    rate: 85,
    rating: 4.8,
    reviewCount: 31,
    availability: "Available",
    remote: true,
    contract: true,
    bio: "Data-driven marketing strategist with expertise in growth and digital marketing.",
    lastActive: "2024-01-16",
    responseTime: "1 hour",
    successRate: 95,
    languages: ["English", "Spanish"],
    timezone: "CST",
    industries: ["SaaS", "E-commerce", "Startups"],
  },
  {
    id: "4",
    name: "David Kim",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Python"],
    experience: "5+ years",
    experienceYears: 6,
    rate: 110,
    rating: 4.9,
    reviewCount: 15,
    availability: "Available",
    remote: true,
    contract: true,
    bio: "DevOps engineer specializing in cloud infrastructure and automation.",
    lastActive: "2024-01-13",
    responseTime: "3 hours",
    successRate: 97,
    languages: ["English", "Korean"],
    timezone: "PST",
    industries: ["Cloud Services", "Fintech", "Gaming"],
  },
  {
    id: "5",
    name: "Lisa Wang",
    title: "Data Scientist",
    location: "Boston, MA",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "R", "Tableau"],
    experience: "4+ years",
    experienceYears: 4,
    rate: 100,
    rating: 4.7,
    reviewCount: 22,
    availability: "Available",
    remote: false,
    contract: true,
    bio: "Data scientist with expertise in machine learning and predictive analytics.",
    lastActive: "2024-01-12",
    responseTime: "6 hours",
    successRate: 92,
    languages: ["English", "Mandarin"],
    timezone: "EST",
    industries: ["Healthcare", "Finance", "Research"],
  },
  {
    id: "6",
    name: "Alex Thompson",
    title: "Mobile Developer",
    location: "Los Angeles, CA",
    skills: ["React Native", "Swift", "Kotlin", "Flutter", "Firebase", "iOS"],
    experience: "5+ years",
    experienceYears: 5,
    rate: 105,
    rating: 4.8,
    reviewCount: 19,
    availability: "Available",
    remote: true,
    contract: true,
    bio: "Mobile developer creating beautiful and performant iOS and Android applications.",
    lastActive: "2024-01-15",
    responseTime: "2 hours",
    successRate: 96,
    languages: ["English"],
    timezone: "PST",
    industries: ["Consumer Apps", "E-commerce", "Entertainment"],
  },
];

const skillSuggestions = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "AWS",
  "Figma",
  "Machine Learning",
  "Docker",
  "GraphQL",
  "PostgreSQL",
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    skills: [] as string[],
    location: "",
    experienceMin: 0,
    experienceMax: 15,
    rateMin: 50,
    rateMax: 200,
    availability: "all",
    remote: false,
    contract: false,
    rating: 0,
    responseTime: "all",
    industries: [] as string[],
    languages: [] as string[],
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  // Simulate search suggestions
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = skillSuggestions.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(suggestions.slice(0, 5));
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  // Advanced filtering logic
  const filteredTalent = mockTalent.filter((talent) => {
    // Text search
    const matchesSearch =
      searchQuery === "" ||
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      talent.bio.toLowerCase().includes(searchQuery.toLowerCase());

    // Skills filter
    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.some((filterSkill) =>
        talent.skills.some((talentSkill) =>
          talentSkill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );

    // Location filter
    const matchesLocation =
      filters.location === "" || talent.location.includes(filters.location);

    // Experience filter
    const matchesExperience =
      talent.experienceYears >= filters.experienceMin &&
      talent.experienceYears <= filters.experienceMax;

    // Rate filter
    const matchesRate =
      talent.rate >= filters.rateMin && talent.rate <= filters.rateMax;

    // Availability filter
    const matchesAvailability =
      filters.availability === "all" ||
      talent.availability === filters.availability;

    // Remote work filter
    const matchesRemote = !filters.remote || talent.remote;

    // Contract work filter
    const matchesContract = !filters.contract || talent.contract;

    // Rating filter
    const matchesRating =
      filters.rating === 0 || talent.rating >= filters.rating;

    // Response time filter
    const matchesResponseTime =
      filters.responseTime === "all" ||
      (filters.responseTime === "fast" &&
        Number.parseInt(talent.responseTime) <= 2) ||
      (filters.responseTime === "medium" &&
        Number.parseInt(talent.responseTime) <= 6) ||
      (filters.responseTime === "slow" &&
        Number.parseInt(talent.responseTime) > 6);

    return (
      matchesSearch &&
      matchesSkills &&
      matchesLocation &&
      matchesExperience &&
      matchesRate &&
      matchesAvailability &&
      matchesRemote &&
      matchesContract &&
      matchesRating &&
      matchesResponseTime
    );
  });

  // Sorting logic
  const sortedTalent = [...filteredTalent].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "rate-low":
        return a.rate - b.rate;
      case "rate-high":
        return b.rate - a.rate;
      case "experience":
        return b.experienceYears - a.experienceYears;
      case "recent":
        return (
          new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        );
      default:
        return 0; // relevance - would be more complex in real app
    }
  });

  const addSkillFilter = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      setFilters((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    }
    setSearchQuery("");
    setSearchSuggestions([]);
  };

  const removeSkillFilter = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      location: "",
      experienceMin: 0,
      experienceMax: 15,
      rateMin: 50,
      rateMax: 200,
      availability: "all",
      remote: false,
      contract: false,
      rating: 0,
      responseTime: "all",
      industries: [],
      languages: [],
    });
    setSearchQuery("");
  };

  const saveSearch = () => {
    const searchName = `${searchQuery || "All talent"} - ${
      filteredTalent.length
    } results`;
    setSavedSearches((prev) => [...prev, searchName]);
    alert("Search saved!");
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
                <Link href="/browse-talent">Browse All</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Advanced Talent Search
          </h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect talent with powerful search and filters
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, title, skills, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-12"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}

                {/* Search Suggestions */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg z-10 mt-1">
                    {searchSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
                        onClick={() => addSkillFilter(suggestion)}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Add "{suggestion}" as skill filter
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Skill Filters */}
              {filters.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkillFilter(skill)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  {showFilters ? "Hide" : "Show"} Advanced Filters
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={saveSearch}>
                    Save Search
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="rate-low">Lowest Rate</SelectItem>
                      <SelectItem value="rate-high">Highest Rate</SelectItem>
                      <SelectItem value="experience">
                        Most Experience
                      </SelectItem>
                      <SelectItem value="recent">Recently Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </CardTitle>
              <CardDescription>
                Refine your search with detailed criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location & Availability */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select
                    value={filters.location}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, location: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any location</SelectItem>
                      <SelectItem value="San Francisco">
                        San Francisco, CA
                      </SelectItem>
                      <SelectItem value="New York">New York, NY</SelectItem>
                      <SelectItem value="Austin">Austin, TX</SelectItem>
                      <SelectItem value="Seattle">Seattle, WA</SelectItem>
                      <SelectItem value="Boston">Boston, MA</SelectItem>
                      <SelectItem value="Los Angeles">
                        Los Angeles, CA
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select
                    value={filters.availability}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, availability: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any availability</SelectItem>
                      <SelectItem value="Available">Available now</SelectItem>
                      <SelectItem value="Soon">Available soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Experience Range */}
              <div className="space-y-3">
                <Label>
                  Years of Experience: {filters.experienceMin} -{" "}
                  {filters.experienceMax} years
                </Label>
                <div className="px-2">
                  <Slider
                    value={[filters.experienceMin, filters.experienceMax]}
                    onValueChange={([min, max]) =>
                      setFilters((prev) => ({
                        ...prev,
                        experienceMin: min,
                        experienceMax: max,
                      }))
                    }
                    max={15}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rate Range */}
              <div className="space-y-3">
                <Label>
                  Hourly Rate: ${filters.rateMin} - ${filters.rateMax}/hour
                </Label>
                <div className="px-2">
                  <Slider
                    value={[filters.rateMin, filters.rateMax]}
                    onValueChange={([min, max]) =>
                      setFilters((prev) => ({
                        ...prev,
                        rateMin: min,
                        rateMax: max,
                      }))
                    }
                    max={300}
                    min={25}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Work Preferences */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Work Preferences
                </Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="remote">Open to Remote Work</Label>
                    <Switch
                      id="remote"
                      checked={filters.remote}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, remote: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contract">Open to Contract Work</Label>
                    <Switch
                      id="contract"
                      checked={filters.contract}
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, contract: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Rating & Response Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Minimum Rating</Label>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        rating: Number.parseFloat(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.8">4.8+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Response Time</Label>
                  <Select
                    value={filters.responseTime}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, responseTime: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any response time</SelectItem>
                      <SelectItem value="fast">Within 2 hours</SelectItem>
                      <SelectItem value="medium">Within 6 hours</SelectItem>
                      <SelectItem value="slow">Within 24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground">
              Showing {sortedTalent.length} of {mockTalent.length} professionals
              {searchQuery && (
                <span>
                  {" "}
                  for "<strong>{searchQuery}</strong>"
                </span>
              )}
            </p>
          </div>
          {sortedTalent.length > 0 && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Avg. rate: $
                {Math.round(
                  sortedTalent.reduce((sum, t) => sum + t.rate, 0) /
                    sortedTalent.length
                )}
                /hr
              </span>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {sortedTalent.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTalent.map((talent) => (
              <Card
                key={talent.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`/professional-headshot.png?height=48&width=48&query=${talent.name} headshot`}
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
                      <CardDescription className="text-base">
                        {talent.title}
                      </CardDescription>
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
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {talent.bio}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {talent.location}
                        {talent.remote && (
                          <Badge variant="outline" className="text-xs">
                            Remote OK
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {talent.experience} experience • Responds in{" "}
                        {talent.responseTime}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
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
                          +{talent.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
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
                        <Link href={`/profile/${talent.id}`}>View Profile</Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/send-proposal/${talent.id}`}>
                          Send Proposal
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No talent found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more results
            </p>
            <Button onClick={clearAllFilters}>Clear All Filters</Button>
          </div>
        )}

        {/* Load More */}
        {sortedTalent.length > 0 && sortedTalent.length >= 6 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>
                Your recently saved search queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedSearches.slice(-3).map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span className="text-sm">{search}</span>
                    <Button size="sm" variant="ghost">
                      Run Search
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
