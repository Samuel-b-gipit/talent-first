"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  talentsApi,
  companiesApi,
  proposalsApi,
  type TalentProfile,
} from "@/lib/api";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send, DollarSign, MapPin, Star } from "lucide-react";
import Link from "next/link";

// Mock talent data removed — fetched from API

export default function SendProposalPage({
  params,
}: {
  readonly params: Promise<{ readonly talentId: string }>;
}) {
  const { talentId } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [talent, setTalent] = useState<TalentProfile | null>(null);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    projectType: "full-time",
    budget: "",
    budgetType: "hourly",
    startDate: "",
    duration: "",
    location: "",
    remote: "hybrid",
    message: "",
    requirements: "",
    benefits: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    // Fetch talent profile
    talentsApi.getById(talentId).then(({ data }) => {
      if (data) setTalent(data);
    });
    // Fetch employer profile to pre-fill company name
    companiesApi.getById(user.id).then(({ data }) => {
      if (data) {
        setFormData((prev) => ({
          ...prev,
          company: data.companyName,
          location: data.location,
        }));
      }
    });
  }, [user, talentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error: apiError } = await proposalsApi.create({
      talentId: talent?.userId ?? talentId,
      position: formData.position,
      budget: formData.budget,
      budgetType: formData.budgetType,
      message: formData.message,
      remote: formData.remote,
      requirements: formData.requirements || null,
      benefits: formData.benefits || null,
      duration: formData.duration || null,
      startDate: formData.startDate || null,
      location: formData.location,
    });

    if (apiError) {
      setError(apiError);
      setIsLoading(false);
      return;
    }

    router.push("/proposal-success");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href={talent ? `/profile/${talent.userId}` : "/browse-talent"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>

        {!talent ? (
          <div className="text-center py-20 text-muted-foreground">
            Loading talent profile...
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Talent Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                    Sending Proposal To
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={"/placeholder.svg"} />
                      <AvatarFallback className="text-xl">
                        {talent?.user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") ?? "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {talent?.user?.name}
                      </h3>
                      <p className="text-muted-foreground">{talent?.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm">
                          {talent?.rating} ({talent?.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {talent?.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />${talent?.rate}/hour
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <p className="text-sm font-medium mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {talent?.skills?.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <p className="text-sm text-muted-foreground">{talent?.bio}</p>
                </CardContent>
              </Card>
            </div>

            {/* Proposal Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Proposal
                  </CardTitle>
                  <CardDescription>
                    Create a compelling proposal to attract{" "}
                    {talent?.user?.name?.split(" ")[0] ?? "this talent"} to your
                    opportunity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Opportunity Details
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="position">Position Title</Label>
                          <Input
                            id="position"
                            placeholder="e.g., Senior React Developer"
                            value={formData.position}
                            onChange={(e) =>
                              handleInputChange("position", e.target.value)
                            }
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="projectType">Project Type</Label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) =>
                              handleInputChange("projectType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full-time">
                                Full-time Position
                              </SelectItem>
                              <SelectItem value="part-time">
                                Part-time Position
                              </SelectItem>
                              <SelectItem value="contract">
                                Contract Work
                              </SelectItem>
                              <SelectItem value="freelance">
                                Freelance Project
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="remote">Work Arrangement</Label>
                          <Select
                            value={formData.remote}
                            onValueChange={(value) =>
                              handleInputChange("remote", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="remote">
                                Fully Remote
                              </SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="e.g., San Francisco, CA"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Budget & Timeline */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Budget & Timeline
                      </h3>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="budgetType">Budget Type</Label>
                          <Select
                            value={formData.budgetType}
                            onValueChange={(value) =>
                              handleInputChange("budgetType", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">
                                Hourly Rate
                              </SelectItem>
                              <SelectItem value="fixed">Fixed Price</SelectItem>
                              <SelectItem value="salary">
                                Annual Salary
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">
                            Budget (
                            {formData.budgetType === "hourly"
                              ? "$/hour"
                              : formData.budgetType === "salary"
                                ? "$/year"
                                : "$"}
                            )
                          </Label>
                          <Input
                            id="budget"
                            placeholder={
                              formData.budgetType === "hourly"
                                ? "120"
                                : formData.budgetType === "salary"
                                  ? "150000"
                                  : "5000"
                            }
                            value={formData.budget}
                            onChange={(e) =>
                              handleInputChange("budget", e.target.value)
                            }
                            type="number"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration</Label>
                          <Input
                            id="duration"
                            placeholder="e.g., 3 months, Ongoing"
                            value={formData.duration}
                            onChange={(e) =>
                              handleInputChange("duration", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startDate">Preferred Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            handleInputChange("startDate", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Message */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        Proposal Message
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="message">Personal Message</Label>
                        <Textarea
                          id="message"
                          placeholder={`Hi ${talent?.user?.name?.split(" ")[0] ?? ""},\n\nI came across your profile and was impressed by your experience with ${(talent?.skills ?? []).slice(0, 2).join(" and ")}. We have an exciting opportunity that I think would be a great fit for your skills...\n\nLooking forward to hearing from you!`}
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          rows={6}
                          required
                          className="border-ring ring-[3px] ring-ring/50"
                        />
                        <p className="text-sm text-muted-foreground">
                          Write a personalized message explaining why you're
                          interested in working with{" "}
                          {talent?.user?.name?.split(" ")[0] ?? "them"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requirements">Key Requirements</Label>
                        <Textarea
                          id="requirements"
                          placeholder="• 5+ years of React experience&#10;• Experience with Node.js and TypeScript&#10;• Strong problem-solving skills&#10;• Excellent communication"
                          value={formData.requirements}
                          onChange={(e) =>
                            handleInputChange("requirements", e.target.value)
                          }
                          rows={4}
                          className="border-ring ring-[3px] ring-ring/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="benefits">What We Offer</Label>
                        <Textarea
                          id="benefits"
                          placeholder="• Competitive salary and equity&#10;• Health, dental, and vision insurance&#10;• Flexible work arrangements&#10;• Professional development budget"
                          value={formData.benefits}
                          onChange={(e) =>
                            handleInputChange("benefits", e.target.value)
                          }
                          rows={4}
                          className="border-ring ring-[3px] ring-ring/50"
                        />
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading || !talent}
                        className="flex-1"
                      >
                        {isLoading ? "Sending Proposal..." : "Send Proposal"}
                      </Button>
                      <Button type="button" variant="outline" size="lg" asChild>
                        <Link
                          href={
                            talent
                              ? `/profile/${talent.userId}`
                              : "/browse-talent"
                          }
                        >
                          Cancel
                        </Link>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
