"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { talentsApi, type TalentProfile } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Clock, Star, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data removed — fetched from API

export default function BrowseTalentPage() {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("allSkills")
  const [selectedLocation, setSelectedLocation] = useState("allLocations")
  const [selectedExperience, setSelectedExperience] = useState("allExperience")

  useEffect(() => {
    talentsApi.getAll().then(({ data }) => {
      if (data) setTalents(data)
      setIsLoading(false)
    })
  }, [])

  const filteredTalent = talents.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSkill =
      selectedSkill === "allSkills" ||
      talent.skills.some((skill) => skill.toLowerCase().includes(selectedSkill.toLowerCase()))

    const matchesLocation = selectedLocation === "allLocations" || talent.location.includes(selectedLocation)
    const matchesExperience = selectedExperience === "allExperience" || talent.experience.includes(selectedExperience)

    return matchesSearch && matchesSkill && matchesLocation && matchesExperience
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Talent</h1>
          <p className="text-muted-foreground text-lg">
            Discover exceptional professionals ready for their next opportunity
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, title, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allSkills">All Skills</SelectItem>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="node">Node.js</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allLocations">All Locations</SelectItem>
                    <SelectItem value="San Francisco">San Francisco</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                    <SelectItem value="Boston">Boston</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="allExperience">All Experience</SelectItem>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-5">4-5 years</SelectItem>
                    <SelectItem value="6-8">6-8 years</SelectItem>
                    <SelectItem value="9+">9+ years</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-muted-foreground">
          Showing {filteredTalent.length} of {isLoading ? "..." : talents.length} professionals
          </p>
        </div>

        {/* Talent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 text-center py-20 text-muted-foreground">Loading talent...</div>
        ) : filteredTalent.length === 0 ? (
          <div className="col-span-3 text-center py-20 text-muted-foreground">No talent found matching your filters.</div>
        ) : filteredTalent.map((talent) => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?key=95808&height=48&width=48&query=${talent.name} headshot`}
                    />
                    <AvatarFallback>
                      {talent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{talent.name}</CardTitle>
                    <CardDescription className="text-base">{talent.title}</CardDescription>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-medium">{talent.rating}</span>
                      <span className="text-sm text-muted-foreground">({talent.reviewCount})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{talent.bio}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {talent.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {talent.experience} experience
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {talent.skills.slice(0, 3).map((skill, skillIndex) => (
                      <Badge key={skill + skillIndex} variant="secondary" className="text-xs">
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
                      <span className="font-semibold text-primary">${talent.rate}/hr</span>
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
                      <Link href={`/send-proposal/${talent.id}`}>Send Proposal</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredTalent.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Talent
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredTalent.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No talent found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedSkill("allSkills")
                setSelectedLocation("allLocations")
                setSelectedExperience("allExperience")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
