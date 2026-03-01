"use client";

import type React from "react";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, AlertCircle, UserCircle, Building2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "TALENT" as "TALENT" | "EMPLOYER",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { error: regError, user } = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.role,
    );
    if (regError || !user) {
      setError(regError ?? "Registration failed");
      setIsLoading(false);
      return;
    }
    if (user.role === "EMPLOYER") {
      router.push("/employer/profile");
    } else {
      router.push("/create-profile");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav Header */}
      <Navbar />

      <div className="flex items-center justify-center p-4 py-20 min-h-[calc(100vh-57px)]">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Join TalentFirst and start your journey
            </p>
          </div>

          <Card className="shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Choose your account type and enter your details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {/* Account Type Selection */}
                <div className="space-y-2">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, role: "TALENT" })
                      }
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                        formData.role === "TALENT"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <UserCircle className="h-8 w-8" />
                      <span className="font-medium">Talent</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Looking for opportunities
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, role: "EMPLOYER" })
                      }
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg transition-colors ${
                        formData.role === "EMPLOYER"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Building2 className="h-8 w-8" />
                      <span className="font-medium">Employer</span>
                      <span className="text-xs text-muted-foreground text-center">
                        Hiring talent
                      </span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password (min. 8 characters)"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
