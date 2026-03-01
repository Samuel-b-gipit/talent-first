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
    <header className="sticky top-0 z-50 border-b border-border/40 glass">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 bg-primary rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(79,70,229,0.25)] group-hover:shadow-[0_2px_12px_rgba(79,70,229,0.35)] transition-shadow duration-200">
              <span className="text-primary-foreground font-bold text-sm">
                TF
              </span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              TalentFirst
            </span>
          </Link>

          {/* Right side — only render once auth state is known */}
          {!isLoading && (
            <div className="flex items-center gap-2">
              {/* Unauthenticated */}
              {!user && (
                <>
                  <nav className="hidden md:flex items-center gap-1 mr-3">
                    <Link
                      href="/browse-talent"
                      className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                    >
                      Browse Talent
                    </Link>
                    <Link
                      href="/for-employers"
                      className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                    >
                      For Employers
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                    >
                      How It Works
                    </Link>
                  </nav>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
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
