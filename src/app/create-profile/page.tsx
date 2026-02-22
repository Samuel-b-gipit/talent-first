"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { talentsApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Plus, X, MapPin, DollarSign, Clock, User } from "lucide-react"
import Link from "next/link"

export default function CreateProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    location: "",
    hourlyRate: "",
    availability: "full-time",
    experience: "",
    skills: [] as string[],
    portfolio: "",
    linkedin: "",
    github: "",
    website: "",
    openToRemote: true,
    openToContract: true,
  })
  const [newSkill, setNewSkill] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.skills.length === 0) {
      setError("Please add at least one skill.")
      setIsLoading(false)
      return
    }

    const { data, error: apiError } = await talentsApi.create({
      name: user?.name ?? "",
      title: formData.title,
      bio: formData.bio,
      location: formData.location,
      rate: parseFloat(formData.hourlyRate),
      availability: formData.availability,
      experience: formData.experience,
      skills: formData.skills,
      portfolio: formData.portfolio || null,
      linkedin: formData.linkedin || null,
      github: formData.github || null,
      website: formData.website || null,
      openToRemote: formData.openToRemote,
      openToContract: formData.openToContract,
    })

    if (apiError) {
      setError(apiError)
      setIsLoading(false)
      return
    }

    router.push("/proposals")
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Talent Profile</h1>
          <p className="text-muted-foreground text-lg">
            Showcase your skills and experience to attract the right opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Tell employers who you are and what you do</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Full-Stack Developer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Write a compelling bio that highlights your experience, skills, and what makes you unique..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-5">4-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9-12">9-12 years</SelectItem>
                      <SelectItem value="13+">13+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Add your key skills and technologies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., React, Python, Design)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Work Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Work Preferences
              </CardTitle>
              <CardDescription>Let employers know your availability and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select
                    value={formData.availability}
                    onValueChange={(value) => handleInputChange("availability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="hourlyRate"
                      placeholder="e.g., 75"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                      className="pl-10"
                      type="number"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="openToRemote">Open to Remote Work</Label>
                    <p className="text-sm text-muted-foreground">Available for remote opportunities</p>
                  </div>
                  <Switch
                    id="openToRemote"
                    checked={formData.openToRemote}
                    onCheckedChange={(checked) => handleInputChange("openToRemote", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="openToContract">Open to Contract Work</Label>
                    <p className="text-sm text-muted-foreground">Available for contract and freelance projects</p>
                  </div>
                  <Switch
                    id="openToContract"
                    checked={formData.openToContract}
                    onCheckedChange={(checked) => handleInputChange("openToContract", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links & Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle>Links & Portfolio</CardTitle>
              <CardDescription>Share your work and professional profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input
                  id="portfolio"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange("portfolio", e.target.value)}
                  type="url"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={(e) => handleInputChange("github", e.target.value)}
                    type="url"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Personal Website</Label>
                <Input
                  id="website"
                  placeholder="https://yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  type="url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Error */}
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" disabled={isLoading} className="flex-1">
              {isLoading ? "Creating Profile..." : "Create Profile"}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
