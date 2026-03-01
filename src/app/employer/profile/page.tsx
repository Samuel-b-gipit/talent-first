"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { companiesApi, type EmployerProfile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Building2, MapPin, Globe, Plus, X, Camera } from "lucide-react";
import Link from "next/link";

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "technology",
    companySize: "51-200",
    location: "",
    website: "",
    description: "",
    culture: "",
    benefits: [] as string[],
    techStack: [] as string[],
    remotePolicy: "hybrid",
    isHiring: true,
    foundedYear: "",
    linkedin: "",
    twitter: "",
    logo: "",
  });

  const [newBenefit, setNewBenefit] = useState("");
  const [newTech, setNewTech] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  // Load existing profile
  useEffect(() => {
    if (!user) return;
    companiesApi.getById(user.id).then(({ data }) => {
      if (data) {
        setProfileId(data.id);
        setFormData({
          companyName: data.companyName,
          industry: data.industry,
          companySize: data.size,
          location: data.location,
          website: data.website ?? "",
          description: data.description,
          culture: data.culture ?? "",
          benefits: data.benefits,
          techStack: data.techStack,
          remotePolicy: data.remotePolicy,
          isHiring: data.isHiring,
          foundedYear: data.foundedYear ?? "",
          linkedin: data.linkedin ?? "",
          twitter: data.twitter ?? "",
          logo: data.logo ?? "",
        });
      }
      setIsFetching(false);
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      companyName: formData.companyName,
      industry: formData.industry || undefined,
      size: formData.companySize,
      location: formData.location,
      website: formData.website || undefined,
      description: formData.description,
      culture: formData.culture || undefined,
      benefits: formData.benefits,
      techStack: formData.techStack,
      remotePolicy: formData.remotePolicy,
      isHiring: formData.isHiring,
      foundedYear: formData.foundedYear || undefined,
      linkedin: formData.linkedin || undefined,
      twitter: formData.twitter || undefined,
      logo: formData.logo || undefined,
    };

    const { error: apiError } = profileId
      ? await companiesApi.update(profileId, payload)
      : await companiesApi.create(payload);

    if (apiError) {
      setError(apiError);
    } else {
      setSuccess("Company profile saved successfully!");
    }
    setIsLoading(false);
  };

  const addBenefit = () => {
    if (newBenefit.trim() && !formData.benefits.includes(newBenefit.trim())) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((benefit) => benefit !== benefitToRemove),
    }));
  };

  const addTech = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()],
      }));
      setNewTech("");
    }
  };

  const removeTech = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
      credentials: "include",
    });
    const json = await res.json();
    if (json.url) setFormData((prev) => ({ ...prev, logo: json.url }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <div className="mb-10 animate-fade-in">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Company
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Company Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Create a compelling company profile to attract top talent
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Tell talent about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={logoPreview || formData.logo || ""} />
                  <AvatarFallback className="text-2xl">
                    {formData.companyName?.[0]?.toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                  >
                    <Camera className="h-4 w-4" />
                    Upload Logo
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or WebP. Max 5MB.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      handleInputChange("companySize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">
                        501-1000 employees
                      </SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foundedYear">Founded</Label>
                  <Input
                    id="foundedYear"
                    placeholder="e.g., 2018"
                    value={formData.foundedYear}
                    onChange={(e) =>
                      handleInputChange("foundedYear", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="website"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="pl-10"
                    type="url"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Description */}
          <Card>
            <CardHeader>
              <CardTitle>About Your Company</CardTitle>
              <CardDescription>
                Help talent understand what makes your company special
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your company, mission, and what you do..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="culture">Company Culture</Label>
                <Textarea
                  id="culture"
                  placeholder="Describe your company culture, values, and work environment..."
                  value={formData.culture}
                  onChange={(e) => handleInputChange("culture", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Benefits & Perks */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
              <CardDescription>
                Highlight what you offer employees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a benefit (e.g., Health Insurance, Remote Work)"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addBenefit())
                  }
                />
                <Button type="button" onClick={addBenefit} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.benefits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit, index) => (
                    <Badge
                      key={benefit + index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {benefit}
                      <button
                        type="button"
                        onClick={() => removeBenefit(benefit)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>
                Technologies and tools your team uses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology (e.g., React, Python, AWS)"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                />
                <Button type="button" onClick={addTech} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="ml-1 hover:text-destructive"
                      >
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
              <CardTitle>Work Preferences</CardTitle>
              <CardDescription>
                Your company's work policies and hiring status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="remotePolicy">Remote Work Policy</Label>
                <Select
                  value={formData.remotePolicy}
                  onValueChange={(value) =>
                    handleInputChange("remotePolicy", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Fully Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isHiring">Currently Hiring</Label>
                  <p className="text-sm text-muted-foreground">
                    Show that you're actively looking for talent
                  </p>
                </div>
                <Switch
                  id="isHiring"
                  checked={formData.isHiring}
                  onCheckedChange={(checked) =>
                    handleInputChange("isHiring", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>
                Connect your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/yourcompany"
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourcompany"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  type="url"
                />
              </div>
            </CardContent>
          </Card>

          {/* Error / Success */}
          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || isFetching}
              className="flex-1"
            >
              {isLoading
                ? "Saving..."
                : profileId
                  ? "Update Profile"
                  : "Create Profile"}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/employer/dashboard">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
