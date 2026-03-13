"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Props {
  profileUserId: string;
  ownerFirstName: string;
}

// Reads auth state from the client-side AuthContext (already loaded for every
// page via the root layout provider). This keeps the parent Server Component
// free of any cookies() / headers() call so Next.js can fully cache it via ISR.
export function ProfileSidebarActions({ profileUserId, ownerFirstName }: Props) {
  const { user } = useAuth();

  const isEmployer = user?.role === "EMPLOYER";
  const isOwnProfile = user?.id === profileUserId;

  if (!user || (!isEmployer && !isOwnProfile)) return null;

  return (
    <>
      {isEmployer && (
        <Card>
          <CardHeader>
            <CardTitle>Contact {ownerFirstName}</CardTitle>
            <CardDescription>Send a proposal or message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" size="lg" asChild>
              <Link href={`/send-proposal/${profileUserId}`}>
                <Mail className="mr-2 h-4 w-4" />
                Send Proposal
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/send-proposal/${profileUserId}`}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {isOwnProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage how employers see you</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/create-profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
