"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Right side — only render once auth state is known */}
          {!isLoading && (
            <div className="flex items-center gap-3">
              {/* Unauthenticated */}
              {!user && (
                <>
                  <nav className="hidden md:flex items-center gap-6 mr-2">
                    <Link
                      href="/browse-talent"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Browse Talent
                    </Link>
                    <Link
                      href="/for-employers"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      For Employers
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      How It Works
                    </Link>
                  </nav>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}

              {/* Employer */}
              {user?.role === "EMPLOYER" && (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/browse-talent">Browse Talent</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/recommendations">Recommendations</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/employer/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/employer/profile">Company Profile</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src={user.avatarUrl ?? ""} />
                        <AvatarFallback>
                          {user.name?.[0]?.toUpperCase() ?? "E"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel className="font-normal">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/employer/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}

              {/* Talent */}
              {user?.role === "TALENT" && (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/proposals">My Proposals</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/profile/${user.id}`}>My Profile</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        <AvatarImage src={user.avatarUrl ?? ""} />
                        <AvatarFallback>
                          {user.name?.[0]?.toUpperCase() ?? "T"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel className="font-normal">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/profile/${user.id}`}>
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={logout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
