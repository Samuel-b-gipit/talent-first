"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { proposalsApi } from "@/lib/api";
import type { Proposal } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  DollarSign,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";

interface NormalizedProposal extends Omit<Proposal, "status" | "sentDate"> {
  status: string;
  receivedDate: string;
  company: {
    name: string;
    logo: string | null;
    industry: string;
  };
  companyDescription: string;
}

export default function ProposalsPage() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<NormalizedProposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");
  const [selectedProposal, setSelectedProposal] =
    useState<NormalizedProposal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    proposalsApi
      .getByTalent(user.id)
      .then(({ data }: { data: Proposal[] | null }) => {
        if (data) {
          setProposals(
            data.map((p) => ({
              ...p,
              status: p.status.toLowerCase(),
              receivedDate: p.createdAt,
              company: {
                name:
                  p.employer?.employerProfile?.companyName ??
                  p.employer?.name ??
                  "Unknown",
                logo: p.employer?.employerProfile?.logo ?? null,
                industry: p.employer?.employerProfile?.industry ?? "Unknown",
              },
              companyDescription:
                p.employer?.employerProfile?.description ?? "",
            })),
          );
        }
        setIsLoading(false);
      });
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-secondary" />;
      case "viewed":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Mail className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "viewed":
        return "default";
      case "accepted":
        return "success";
      case "declined":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleResponse = async (
    proposalId: string,
    response: "accept" | "decline",
  ) => {
    const status = response === "accept" ? "accepted" : "declined";
    const { error } = await proposalsApi.update(proposalId, {
      status,
      responseMessage: responseMessage || undefined,
    });
    if (!error) {
      setProposals((prev) =>
        prev.map((p) => (p.id === proposalId ? { ...p, status } : p)),
      );
    }
    setIsDetailOpen(false);
    setSelectedProposal(null);
    setResponseMessage("");
  };

  const pendingProposals = proposals.filter((p) => p.status === "pending");
  const viewedProposals = proposals.filter((p) => p.status === "viewed");
  const acceptedProposals = proposals.filter((p) => p.status === "accepted");
  const declinedProposals = proposals.filter((p) => p.status === "declined");
  const respondedProposals = [...acceptedProposals, ...declinedProposals];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Inbox
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
            My Proposals
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage proposals from companies interested in working with you
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Received
                  </p>
                  <p className="text-2xl font-bold">{proposals.length}</p>
                </div>
                <Mail className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending
                  </p>
                  <p className="text-2xl font-bold">
                    {pendingProposals.length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-amber-500/60" />
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
                  <p className="text-2xl font-bold">85%</p>
                </div>
                <MessageSquare className="h-8 w-8 text-emerald-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. Rate
                  </p>
                  <p className="text-2xl font-bold">$123/hr</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="received">
              All Proposals ({proposals.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingProposals.length})
            </TabsTrigger>
            <TabsTrigger value="responded">
              Responded ({respondedProposals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {isLoading && (
              <p className="text-muted-foreground py-8 text-center">
                Loading proposals...
              </p>
            )}
            {!isLoading && proposals.length === 0 && (
              <p className="text-muted-foreground py-8 text-center">
                No proposals yet.
              </p>
            )}
            {!isLoading &&
              proposals.length > 0 &&
              proposals.map((proposal) => (
                <Card key={proposal.id} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={proposal.company.logo || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {proposal.company.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {proposal.company.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {proposal.company.industry}
                              </Badge>
                            </div>
                            <p className="text-lg font-medium text-primary">
                              {proposal.position}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(proposal.status)}
                            <Badge variant={getStatusColor(proposal.status)}>
                              {proposal.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.remote}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(
                                proposal.receivedDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {proposal.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Start:{" "}
                            {proposal.startDate
                              ? new Date(
                                  proposal.startDate,
                                ).toLocaleDateString()
                              : "TBD"}
                          </p>
                          <div className="flex gap-2">
                            <Dialog
                              open={
                                isDetailOpen &&
                                selectedProposal?.id === proposal.id
                              }
                              onOpenChange={(open) => {
                                setIsDetailOpen(open);
                                if (!open) setSelectedProposal(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedProposal(proposal);
                                    setIsDetailOpen(true);
                                  }}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5" />
                                    {selectedProposal?.position} at{" "}
                                    {selectedProposal?.company.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Proposal received on{" "}
                                    {selectedProposal &&
                                      new Date(
                                        selectedProposal.receivedDate,
                                      ).toLocaleDateString()}
                                  </DialogDescription>
                                </DialogHeader>

                                {selectedProposal && (
                                  <div className="space-y-6">
                                    {/* Company Info */}
                                    <div className="flex items-center gap-4">
                                      <Avatar className="h-16 w-16">
                                        <AvatarImage
                                          src={
                                            selectedProposal.company.logo ||
                                            "/placeholder.svg"
                                          }
                                        />
                                        <AvatarFallback className="text-xl">
                                          {selectedProposal.company.name
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="font-semibold text-lg">
                                          {selectedProposal.company.name}
                                        </h3>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.company.industry}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {selectedProposal.companyDescription}
                                        </p>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Opportunity Details */}
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        Opportunity Details
                                      </h4>
                                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="font-medium">
                                            Position:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {selectedProposal.position}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Budget:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {selectedProposal.budget}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Location:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {selectedProposal.location}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Work Style:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {selectedProposal.remote}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Duration:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {selectedProposal.duration}
                                          </p>
                                        </div>
                                        <div>
                                          <span className="font-medium">
                                            Start Date:
                                          </span>
                                          <p className="text-muted-foreground">
                                            {new Date(
                                              selectedProposal.startDate ??
                                                selectedProposal.receivedDate,
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    {/* Message */}
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        Message
                                      </h4>
                                      <p className="text-muted-foreground whitespace-pre-line">
                                        {selectedProposal.message}
                                      </p>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        Requirements
                                      </h4>
                                      <p className="text-muted-foreground whitespace-pre-line">
                                        {selectedProposal.requirements}
                                      </p>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        What They Offer
                                      </h4>
                                      <p className="text-muted-foreground whitespace-pre-line">
                                        {selectedProposal.benefits}
                                      </p>
                                    </div>

                                    {/* Response Section */}
                                    {selectedProposal.status === "pending" && (
                                      <>
                                        <Separator />
                                        <div>
                                          <Label htmlFor="response">
                                            Your Response (Optional)
                                          </Label>
                                          <Textarea
                                            id="response"
                                            placeholder="Add a personal message with your response..."
                                            value={responseMessage}
                                            onChange={(e) =>
                                              setResponseMessage(e.target.value)
                                            }
                                            rows={3}
                                            className="mt-2"
                                          />
                                        </div>

                                        <div className="flex gap-3">
                                          <Button
                                            onClick={() =>
                                              handleResponse(
                                                selectedProposal.id,
                                                "accept",
                                              )
                                            }
                                            className="flex-1"
                                          >
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Accept Proposal
                                          </Button>
                                          <Button
                                            variant="outline"
                                            onClick={() =>
                                              handleResponse(
                                                selectedProposal.id,
                                                "decline",
                                              )
                                            }
                                            className="flex-1"
                                          >
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Decline
                                          </Button>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {proposal.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProposal(proposal);
                                    handleResponse(proposal.id, "accept");
                                  }}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedProposal(proposal);
                                    handleResponse(proposal.id, "decline");
                                  }}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Decline
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingProposals.map((proposal) => (
              <Card
                key={proposal.id}
                className="card-hover border-l-4 border-l-amber-400"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={proposal.company.logo || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {proposal.company.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">
                            {proposal.company.name}
                          </h3>
                          <p className="text-lg font-medium text-primary">
                            {proposal.position}
                          </p>
                        </div>
                        <Badge variant="secondary">Needs Response</Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{proposal.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{proposal.remote}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{proposal.duration}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {proposal.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Received{" "}
                          {new Date(proposal.receivedDate).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="mr-2 h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="responded" className="space-y-4">
            {respondedProposals.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No responded proposals yet
                </h3>
                <p className="text-muted-foreground">
                  Proposals you've accepted or declined will appear here
                </p>
              </div>
            ) : (
              respondedProposals.map((proposal) => (
                <Card
                  key={proposal.id}
                  className={`card-hover border-l-4 ${
                    proposal.status === "accepted"
                      ? "border-l-emerald-500"
                      : "border-l-red-500"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={proposal.company.logo || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {proposal.company.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {proposal.company.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {proposal.company.industry}
                              </Badge>
                            </div>
                            <p className="text-lg font-medium text-primary">
                              {proposal.position}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(proposal.status)}
                            <Badge
                              variant={
                                proposal.status === "accepted"
                                  ? "success"
                                  : "destructive"
                              }
                            >
                              {proposal.status.charAt(0).toUpperCase() +
                                proposal.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.remote}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{proposal.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {new Date(
                                proposal.receivedDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {proposal.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            Start:{" "}
                            {proposal.startDate
                              ? new Date(
                                  proposal.startDate,
                                ).toLocaleDateString()
                              : "TBD"}
                          </p>
                          <Dialog
                            open={
                              isDetailOpen &&
                              selectedProposal?.id === proposal.id
                            }
                            onOpenChange={(open) => {
                              setIsDetailOpen(open);
                              if (!open) setSelectedProposal(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedProposal(proposal);
                                  setIsDetailOpen(true);
                                }}
                              >
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Building2 className="h-5 w-5" />
                                  {selectedProposal?.position} at{" "}
                                  {selectedProposal?.company.name}
                                </DialogTitle>
                                <DialogDescription>
                                  Proposal received on{" "}
                                  {selectedProposal &&
                                    new Date(
                                      selectedProposal.receivedDate,
                                    ).toLocaleDateString()}
                                </DialogDescription>
                              </DialogHeader>

                              {selectedProposal && (
                                <div className="space-y-6">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                      <AvatarImage
                                        src={
                                          selectedProposal.company.logo ||
                                          "/placeholder.svg"
                                        }
                                      />
                                      <AvatarFallback className="text-xl">
                                        {selectedProposal.company.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-semibold text-lg">
                                        {selectedProposal.company.name}
                                      </h3>
                                      <p className="text-muted-foreground">
                                        {selectedProposal.company.industry}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedProposal.companyDescription}
                                      </p>
                                    </div>
                                  </div>

                                  <Separator />

                                  <div>
                                    <h4 className="font-semibold mb-3">
                                      Opportunity Details
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <span className="font-medium">
                                          Position:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.position}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Budget:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.budget}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Location:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.location}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Work Style:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.remote}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Duration:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {selectedProposal.duration}
                                        </p>
                                      </div>
                                      <div>
                                        <span className="font-medium">
                                          Start Date:
                                        </span>
                                        <p className="text-muted-foreground">
                                          {new Date(
                                            selectedProposal.startDate ??
                                              selectedProposal.receivedDate,
                                          ).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <Separator />

                                  <div>
                                    <h4 className="font-semibold mb-3">
                                      Message
                                    </h4>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                      {selectedProposal.message}
                                    </p>
                                  </div>

                                  {selectedProposal.requirements && (
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        Requirements
                                      </h4>
                                      <p className="text-muted-foreground whitespace-pre-line">
                                        {selectedProposal.requirements}
                                      </p>
                                    </div>
                                  )}

                                  {selectedProposal.benefits && (
                                    <div>
                                      <h4 className="font-semibold mb-3">
                                        What They Offer
                                      </h4>
                                      <p className="text-muted-foreground whitespace-pre-line">
                                        {selectedProposal.benefits}
                                      </p>
                                    </div>
                                  )}

                                  <Separator />

                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(selectedProposal.status)}
                                    <span className="font-medium capitalize">
                                      {selectedProposal.status}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
