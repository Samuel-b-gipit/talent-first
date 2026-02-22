// Auto-generated from prisma/schema.prisma

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "TALENT" | "EMPLOYER";
  createdAt: string;
  updatedAt: string;
  talentProfile?: TalentProfile | null;
  employerProfile?: EmployerProfile | null;
  sentProposals?: Proposal[];
  receivedProposals?: Proposal[];
  sentMessages?: Message[];
  receivedMessages?: Message[];
  savedTalents?: SavedTalent[];
  sessions?: Session[];
}

export interface TalentProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: string;
  rate: number;
  availability: string;
  bio: string;
  portfolio?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  openToRemote: boolean;
  openToContract: boolean;
  rating?: number | null;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  savedBy?: SavedTalent[];
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  size: string;
  logo?: string | null;
  website?: string | null;
  location: string;
  description: string;
  culture?: string | null;
  benefits: string[];
  techStack: string[];
  remotePolicy: string;
  isHiring: boolean;
  foundedYear?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface Proposal {
  id: string;
  employerId: string;
  talentId: string;
  position: string;
  budget: string;
  budgetType: string;
  location: string;
  remote: string;
  duration?: string | null;
  startDate?: string | null;
  status: "PENDING" | "VIEWED" | "ACCEPTED" | "DECLINED";
  message: string;
  requirements?: string | null;
  benefits?: string | null;
  createdAt: string;
  updatedAt: string;
  employer?: User;
  talent?: User;
  messages?: Message[];
}

export interface SavedTalent {
  id: string;
  employerId: string;
  talentId: string;
  notes?: string | null;
  savedDate: string;
  employer?: User;
  talent?: TalentProfile;
}

export interface Message {
  id: string;
  proposalId: string;
  senderId: string;
  receiverId: string;
  content: string;
  readAt?: string | null;
  createdAt: string;
  proposal?: Proposal;
  sender?: User;
  receiver?: User;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  user?: User;
}
